export const docsMdxComponentNames = ["Callout", "InstallCommand"] as const;

export type DocsMdxComponentName = (typeof docsMdxComponentNames)[number];

export const docsMdxComponentNameSet: ReadonlySet<string> = new Set(docsMdxComponentNames);
