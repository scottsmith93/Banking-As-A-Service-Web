import { readdir, readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const sourceRoot = new URL("../src/", import.meta.url);
const tokenDefinitionPaths = [
  new URL("../node_modules/@sage/design-tokens/css/base.css", import.meta.url),
  new URL("../node_modules/@sage/design-tokens-fusion/css/light.css", import.meta.url),
  new URL(
    "../node_modules/@sage/design-tokens-fusion/css/components/dataviz.css",
    import.meta.url,
  ),
];

const definitionPattern = /(--[A-Za-z0-9_-]+)\s*:/g;
const referencePattern = /var\(\s*(--[A-Za-z0-9_-]+)/g;

async function findCssFiles(directoryUrl) {
  const entries = await readdir(directoryUrl, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryUrl = new URL(entry.name, directoryUrl);
      if (entry.isDirectory()) return findCssFiles(new URL(`${entryUrl.href}/`));
      return extname(entry.name) === ".css" ? [entryUrl] : [];
    }),
  );
  return files.flat();
}

function matches(source, pattern) {
  return [...source.matchAll(pattern)].map((match) => match[1]);
}

const sourcePaths = await findCssFiles(sourceRoot);
const sourceFiles = await Promise.all(
  sourcePaths.map(async (path) => ({ path, source: await readFile(path, "utf8") })),
);
const tokenSources = await Promise.all(
  tokenDefinitionPaths.map((path) => readFile(path, "utf8")),
);

const definitions = new Set([
  ...sourceFiles.flatMap(({ source }) => matches(source, definitionPattern)),
  ...tokenSources.flatMap((source) => matches(source, definitionPattern)),
]);
const missingReferences = [];

for (const { path, source } of sourceFiles) {
  for (const variable of new Set(matches(source, referencePattern))) {
    if (!definitions.has(variable)) {
      missingReferences.push(`${join("src", path.pathname.split("/src/")[1])}: ${variable}`);
    }
  }
}

if (missingReferences.length > 0) {
  console.error(
    `Token validation failed with ${missingReferences.length} undefined CSS variable reference(s):`,
  );
  missingReferences.sort().forEach((reference) => console.error(`- ${reference}`));
  process.exitCode = 1;
} else {
  console.log(
    `Token validation passed (${definitions.size} available variables across ${sourceFiles.length} source stylesheets).`,
  );
}
