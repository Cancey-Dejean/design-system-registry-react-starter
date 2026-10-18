import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { compile } from "@tailwindcss/node";
const base = fileURLToPath(new URL(".", import.meta.url));
const source = await readFile(new URL("./source.css", import.meta.url), "utf8");
const compiler = await compile(source, { base, onDependency() {} });
const files = await Promise.all(
  ["index.html", "gallery.js"].map((name) => readFile(new URL(name, import.meta.url), "utf8")),
);
const candidates = files.join(" ").match(/[A-Za-z0-9_:[\]./%!-]+/g) ?? [];
await writeFile(new URL("./styles.css", import.meta.url), compiler.build(candidates));
console.log("Compiled standalone gallery styles.css");
