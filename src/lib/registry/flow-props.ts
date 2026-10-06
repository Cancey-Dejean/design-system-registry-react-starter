import { existsSync } from "node:fs";
import path from "node:path";

import ts from "typescript";

import type {
  RegistryFlowApi,
  RegistryFlowApiSource,
  RegistryFlowProp,
  RegistryFlowVariant,
} from "./flow-data.ts";

const MAX_TYPE_LENGTH = 240;

const compilerOptions: ts.CompilerOptions = {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  jsx: ts.JsxEmit.ReactJSX,
  strict: true,
  skipLibCheck: true,
  noEmit: true,
  allowImportingTsExtensions: true,
  types: [],
};

// Library declarations never change during a build, so parse them once and
// share them across the per-item programs.
const librarySourceFiles = new Map<string, ts.SourceFile | undefined>();
const baseHost = ts.createCompilerHost(compilerOptions, true);
const host: ts.CompilerHost = {
  ...baseHost,
  getSourceFile(fileName, languageVersion, onError, shouldCreate) {
    if (!fileName.includes(`${path.sep}node_modules${path.sep}`) && !isLibraryFile(fileName)) {
      return baseHost.getSourceFile(fileName, languageVersion, onError, shouldCreate);
    }

    if (!librarySourceFiles.has(fileName)) {
      librarySourceFiles.set(
        fileName,
        baseHost.getSourceFile(fileName, languageVersion, onError, shouldCreate),
      );
    }

    return librarySourceFiles.get(fileName);
  },
};

/**
 * Reads the public API of a registry item: `cva` variants from its
 * `*.variants.ts` files, and the props its main component declares itself.
 * Inherited props such as HTML attributes are left out.
 */
export function getRegistryItemApi({
  path: sourcePath,
  files,
  name,
  title,
}: RegistryFlowApiSource): RegistryFlowApi {
  const directory = path.resolve(path.dirname(sourcePath));
  const sourceFiles = files
    .filter((file) => /\.tsx?$/u.test(file))
    .map((file) => path.resolve(directory, file))
    .filter((file) => existsSync(file));

  if (sourceFiles.length === 0) {
    return { variants: [], props: [] };
  }

  const program = ts.createProgram(sourceFiles, compilerOptions, host);
  const cvaVariants = dedupeByName(
    sourceFiles
      .filter((file) => file.endsWith(".variants.ts"))
      .flatMap((file) => {
        const sourceFile = program.getSourceFile(file);

        return sourceFile ? readVariants(sourceFile) : [];
      }),
  );

  const component = findMainComponent(program, sourceFiles, [
    toPascalCase(name),
    title.replaceAll(/\s+/gu, ""),
  ]);

  if (!component) {
    return { variants: cvaVariants, props: [] };
  }

  return {
    component: component.name,
    ...(component.parameter
      ? readComponentApi(program, component.parameter, directory, cvaVariants)
      : { variants: [], props: [] }),
  };
}

function readVariants(sourceFile: ts.SourceFile): RegistryFlowVariant[] {
  const variants: RegistryFlowVariant[] = [];

  function visit(node: ts.Node) {
    if (ts.isObjectLiteralExpression(node)) {
      const variantsObject = getObjectProperty(node, "variants");

      if (variantsObject) {
        const defaults = getObjectProperty(node, "defaultVariants");

        for (const property of variantsObject.properties) {
          if (!ts.isPropertyAssignment(property)) {
            continue;
          }

          const variantName = getPropertyName(property.name);
          const options = ts.isObjectLiteralExpression(property.initializer)
            ? property.initializer.properties.flatMap((option) => {
                const optionName = option.name ? getPropertyName(option.name) : undefined;

                return optionName ? [optionName] : [];
              })
            : [];
          const defaultValue = defaults ? getLiteralProperty(defaults, variantName) : undefined;

          if (variantName && options.length > 0) {
            variants.push({
              name: variantName,
              options,
              ...(defaultValue === undefined ? {} : { defaultValue }),
            });
          }
        }

        return;
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  return variants;
}

type MainComponent = {
  name: string;
  parameter?: ts.ParameterDeclaration;
};

function findMainComponent(
  program: ts.Program,
  sourceFiles: readonly string[],
  preferredNames: readonly string[],
): MainComponent | undefined {
  const checker = program.getTypeChecker();
  const candidates: MainComponent[] = [];

  for (const file of sourceFiles) {
    if (!file.endsWith(".tsx")) {
      continue;
    }

    const sourceFile = program.getSourceFile(file);
    const moduleSymbol = sourceFile ? checker.getSymbolAtLocation(sourceFile) : undefined;

    for (const exported of moduleSymbol ? checker.getExportsOfModule(moduleSymbol) : []) {
      const symbol =
        exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
      const declaration = symbol.declarations?.[0];
      const name =
        exported.name === "default" && declaration
          ? getDeclarationName(declaration)
          : exported.name;

      if (name && /^[A-Z]/u.test(name)) {
        candidates.push({
          name,
          parameter: symbol.declarations?.map(getFirstParameter).find(Boolean),
        });
      }
    }
  }

  return (
    preferredNames
      .map((name) => candidates.find((candidate) => candidate.name === name))
      .find(Boolean) ?? candidates.find((candidate) => candidate.parameter)
  );
}

function getDeclarationName(declaration: ts.Declaration): string | undefined {
  const name = ts.getNameOfDeclaration(declaration);

  return name && ts.isIdentifier(name) ? name.text : undefined;
}

function getFirstParameter(declaration: ts.Declaration): ts.ParameterDeclaration | undefined {
  if (ts.isFunctionDeclaration(declaration)) {
    return declaration.parameters[0];
  }

  if (
    ts.isVariableDeclaration(declaration) &&
    declaration.initializer &&
    (ts.isArrowFunction(declaration.initializer) ||
      ts.isFunctionExpression(declaration.initializer))
  ) {
    return declaration.initializer.parameters[0];
  }

  return undefined;
}

const IGNORED_PROPS = new Set(["className"]);

function readComponentApi(
  program: ts.Program,
  parameter: ts.ParameterDeclaration,
  directory: string,
  cvaVariants: readonly RegistryFlowVariant[],
): Pick<RegistryFlowApi, "variants" | "props"> {
  const checker = program.getTypeChecker();
  const type = checker.getTypeAtLocation(parameter);
  const defaults = getBindingDefaults(parameter);
  const itemsRoot = path.resolve(directory, "..", "..");
  const variants: RegistryFlowVariant[] = [];
  const props: RegistryFlowProp[] = [];

  for (const property of checker.getPropertiesOfType(type)) {
    const isOwnProp = property.declarations?.some((declaration) => {
      const fileName = path.resolve(declaration.getSourceFile().fileName);

      return fileName.startsWith(itemsRoot) && !fileName.includes(`${path.sep}node_modules`);
    });

    if (!isOwnProp || IGNORED_PROPS.has(property.name)) {
      continue;
    }

    let propertyType = checker.getNonNullableType(
      checker.getTypeOfSymbolAtLocation(property, parameter),
    );
    const isTypeParameter = (propertyType.flags & ts.TypeFlags.TypeParameter) !== 0;

    if (isTypeParameter) {
      propertyType = checker.getBaseConstraintOfType(propertyType) ?? propertyType;
    }

    const cvaVariant = cvaVariants.find((variant) => variant.name === property.name);
    const defaultValue = defaults.get(property.name) ?? cvaVariant?.defaultValue;
    const options = getStringLiteralOptions(propertyType);

    if (options) {
      variants.push({
        name: property.name,
        options: cvaVariant
          ? [
              ...cvaVariant.options.filter((option) => options.includes(option)),
              ...options.filter((option) => !cvaVariant.options.includes(option)),
            ]
          : options,
        ...(defaultValue === undefined ? {} : { defaultValue }),
      });
      continue;
    }

    props.push({
      name: property.name,
      type: formatType(
        (isTypeParameter ? undefined : getDeclaredTypeText(property)) ??
          checker.typeToString(propertyType, parameter, ts.TypeFormatFlags.NoTruncation),
      ),
      optional: (property.flags & ts.SymbolFlags.Optional) !== 0,
      ...(defaultValue === undefined ? {} : { defaultValue }),
    });
  }

  return {
    variants: variants.toSorted(
      (a, b) => getVariantOrder(a, cvaVariants) - getVariantOrder(b, cvaVariants),
    ),
    props: props.toSorted(
      (a, b) => Number(a.optional) - Number(b.optional) || a.name.localeCompare(b.name),
    ),
  };
}

function getDeclaredTypeText(property: ts.Symbol): string | undefined {
  const declaration = property.declarations?.find(
    (node): node is ts.PropertySignature => ts.isPropertySignature(node) && Boolean(node.type),
  );
  const text = declaration?.type?.getText().replaceAll(/\s+/gu, " ").trim();

  return text?.replace(/\s*\|\s*undefined$/u, "") || undefined;
}

function getStringLiteralOptions(type: ts.Type): string[] | undefined {
  const members = type.isUnion() ? type.types : [type];

  if (members.length < 2 || !members.every((member) => member.isStringLiteral())) {
    return undefined;
  }

  return members.map((member) => member.value);
}

function getVariantOrder(
  variant: RegistryFlowVariant,
  cvaVariants: readonly RegistryFlowVariant[],
): number {
  const index = cvaVariants.findIndex((cvaVariant) => cvaVariant.name === variant.name);

  return index === -1 ? cvaVariants.length : index;
}

function formatType(value: string): string {
  const formatted = value
    .replaceAll(/import\("[^"]*"\)\./gu, "")
    .replaceAll(
      /(?:React\.)?ElementType<any, keyof (?:React\.)?JSX\.IntrinsicElements>/gu,
      "ElementType",
    );

  return formatted.length > MAX_TYPE_LENGTH
    ? `${formatted.slice(0, MAX_TYPE_LENGTH - 1)}…`
    : formatted;
}

function getBindingDefaults(parameter: ts.ParameterDeclaration): Map<string, string> {
  const defaults = new Map<string, string>();

  if (ts.isObjectBindingPattern(parameter.name)) {
    for (const element of parameter.name.elements) {
      const propertyName = element.propertyName ?? element.name;

      if (element.initializer && ts.isIdentifier(propertyName)) {
        defaults.set(
          propertyName.text,
          ts.isStringLiteralLike(element.initializer)
            ? element.initializer.text
            : element.initializer.getText(),
        );
      }
    }
  }

  return defaults;
}

function getObjectProperty(
  node: ts.ObjectLiteralExpression,
  name: string,
): ts.ObjectLiteralExpression | undefined {
  for (const property of node.properties) {
    if (
      ts.isPropertyAssignment(property) &&
      getPropertyName(property.name) === name &&
      ts.isObjectLiteralExpression(property.initializer)
    ) {
      return property.initializer;
    }
  }

  return undefined;
}

function getLiteralProperty(node: ts.ObjectLiteralExpression, name: string): string | undefined {
  for (const property of node.properties) {
    if (!ts.isPropertyAssignment(property) || getPropertyName(property.name) !== name) {
      continue;
    }

    const { initializer } = property;

    if (ts.isStringLiteralLike(initializer) || ts.isNumericLiteral(initializer)) {
      return initializer.text;
    }

    if (initializer.kind === ts.SyntaxKind.TrueKeyword) {
      return "true";
    }

    if (initializer.kind === ts.SyntaxKind.FalseKeyword) {
      return "false";
    }
  }

  return undefined;
}

function getPropertyName(name: ts.PropertyName): string {
  return ts.isIdentifier(name) || ts.isStringLiteralLike(name) || ts.isNumericLiteral(name)
    ? name.text
    : name.getText();
}

function dedupeByName<T extends { name: string }>(entries: readonly T[]): T[] {
  const seen = new Set<string>();

  return entries.filter((entry) => !seen.has(entry.name) && seen.add(entry.name));
}

function toPascalCase(value: string): string {
  return value
    .split(/[-_\s]+/u)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function isLibraryFile(fileName: string): boolean {
  return path.basename(fileName).startsWith("lib.") && fileName.endsWith(".d.ts");
}
