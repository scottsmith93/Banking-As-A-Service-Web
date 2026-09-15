import { readFile } from "node:fs/promises";

const catalogPaths = {
  "de-DE": new URL("../src/locales/de-DE.json", import.meta.url),
  "en-GB": new URL("../src/locales/en-GB.json", import.meta.url),
  "es-ES": new URL("../src/locales/es-ES.json", import.meta.url),
  "fr-FR": new URL("../src/locales/fr-FR.json", import.meta.url),
  "pt-PT": new URL("../src/locales/pt-PT.json", import.meta.url),
};

const placeholderPattern = /\{[A-Za-z][A-Za-z0-9_]*\}/g;

function collectLeaves(value, path = "", leaves = new Map()) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectLeaves(item, `${path}[${index}]`, leaves));
    return leaves;
  }

  if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      collectLeaves(child, path ? `${path}.${key}` : key, leaves);
    }
    return leaves;
  }

  leaves.set(path, value);
  return leaves;
}

function placeholders(value) {
  if (Array.isArray(value)) return value.flatMap(placeholders).sort();
  if (typeof value !== "string") return [];
  return [...value.matchAll(placeholderPattern)].map(([token]) => token).sort();
}

const catalogs = Object.fromEntries(
  await Promise.all(
    Object.entries(catalogPaths).map(async ([locale, path]) => {
      const source = await readFile(path, "utf8");
      return [locale, JSON.parse(source)];
    }),
  ),
);

const sourceLeaves = collectLeaves(catalogs["en-GB"]);
const errors = [];

for (const [locale, catalog] of Object.entries(catalogs)) {
  if (locale === "en-GB") continue;
  const translatedLeaves = collectLeaves(catalog);

  for (const key of sourceLeaves.keys()) {
    if (!translatedLeaves.has(key)) errors.push(`${locale} is missing: ${key}`);
  }

  for (const key of translatedLeaves.keys()) {
    if (!sourceLeaves.has(key)) errors.push(`${locale} has an extra key: ${key}`);
  }

  for (const [key, sourceValue] of sourceLeaves) {
    if (!translatedLeaves.has(key)) continue;
    const sourceTokens = placeholders(sourceValue);
    const translatedTokens = placeholders(translatedLeaves.get(key));
    if (sourceTokens.join("|") !== translatedTokens.join("|")) {
      errors.push(
        `Placeholder mismatch at ${key}: en-GB [${sourceTokens.join(", ")}] vs ${locale} [${translatedTokens.join(", ")}]`,
      );
    }
  }
}

if (errors.length > 0) {
  console.error(`Locale validation failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log(
    `Locale validation passed (${Object.keys(catalogs).length} catalogues, ${sourceLeaves.size} matching leaf values each).`,
  );
}
