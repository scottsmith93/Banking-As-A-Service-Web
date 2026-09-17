import { readdir, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const supportedFiles = [
  "frontend_en-GB.json",
  "frontend_es-ES.json",
  "frontend_fr-FR.json",
  "frontend_de-DE.json",
  "frontend_pt-PT.json",
];
const catalogueDirectory = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../references/catalogues",
);
const maximumReportedErrors = 100;

function escapePointerSegment(segment) {
  return String(segment).replaceAll("~", "~0").replaceAll("/", "~1");
}

function childPath(path, segment) {
  return `${path}/${escapePointerSegment(segment)}`;
}

function placeholders(value) {
  return [...value.matchAll(/\{\{[^{}]+\}\}|\{[^{}]+\}/g)]
    .map((match) => match[0])
    .sort();
}

function collectStructure(value, path = "", structure = new Map()) {
  if (Array.isArray(value)) {
    structure.set(path, { kind: "array", length: value.length });
    value.forEach((item, index) => {
      collectStructure(item, childPath(path, index), structure);
    });
    return structure;
  }

  if (value !== null && typeof value === "object") {
    structure.set(path, { kind: "object" });
    for (const [key, item] of Object.entries(value)) {
      collectStructure(item, childPath(path, key), structure);
    }
    return structure;
  }

  if (typeof value === "string") {
    structure.set(path, { kind: "string", placeholders: placeholders(value) });
    return structure;
  }

  structure.set(path, { kind: value === null ? "null" : typeof value, value });
  return structure;
}

function formatPath(path) {
  return path || "/";
}

const directoryEntries = await readdir(catalogueDirectory);
const referenceFiles = directoryEntries.filter(
  (name) => name.startsWith("frontend_") && name.endsWith(".json"),
);
const unexpectedFiles = referenceFiles.filter((name) => !supportedFiles.includes(name));

if (unexpectedFiles.length > 0) {
  console.error(
    `Unsupported reference catalogue name(s): ${unexpectedFiles.join(", ")}`,
  );
  process.exit(1);
}

const presentFiles = supportedFiles.filter((name) => referenceFiles.includes(name));
if (presentFiles.length === 0) {
  console.error(`No frontend reference catalogues found in ${catalogueDirectory}.`);
  process.exit(1);
}

const catalogues = new Map();
for (const fileName of presentFiles) {
  const fileContents = await readFile(resolve(catalogueDirectory, fileName), "utf8");
  try {
    catalogues.set(fileName, JSON.parse(fileContents));
  } catch (error) {
    console.error(`${fileName} is not valid JSON: ${error.message}`);
    process.exit(1);
  }
}

const baselineFile = presentFiles.includes("frontend_en-GB.json")
  ? "frontend_en-GB.json"
  : presentFiles.includes("frontend_fr-FR.json")
    ? "frontend_fr-FR.json"
    : presentFiles[0];
const baselineStructure = collectStructure(catalogues.get(baselineFile));
const errors = [];
let errorCount = 0;

function report(message) {
  errorCount += 1;
  if (errors.length < maximumReportedErrors) errors.push(message);
}

for (const [fileName, catalogue] of catalogues) {
  if (fileName === baselineFile) continue;
  const structure = collectStructure(catalogue);

  for (const [path, expected] of baselineStructure) {
    const actual = structure.get(path);
    if (!actual) {
      report(`${fileName} is missing ${formatPath(path)}`);
      continue;
    }
    if (actual.kind !== expected.kind) {
      report(
        `${fileName} has ${actual.kind} at ${formatPath(path)}; expected ${expected.kind}`,
      );
      continue;
    }
    if (expected.kind === "array" && actual.length !== expected.length) {
      report(
        `${fileName} has ${actual.length} items at ${formatPath(path)}; expected ${expected.length}`,
      );
    }
    if (
      expected.kind === "string" &&
      actual.placeholders.join("|") !== expected.placeholders.join("|")
    ) {
      report(
        `${fileName} has different placeholders at ${formatPath(path)}: ` +
          `[${actual.placeholders.join(", ")}] vs [${expected.placeholders.join(", ")}]`,
      );
    }
    if (
      expected.kind !== "object" &&
      expected.kind !== "array" &&
      expected.kind !== "string" &&
      !Object.is(actual.value, expected.value)
    ) {
      report(
        `${fileName} changes non-text value at ${formatPath(path)}: ` +
          `${String(actual.value)} vs ${String(expected.value)}`,
      );
    }
  }

  for (const path of structure.keys()) {
    if (!baselineStructure.has(path)) {
      report(`${fileName} has an extra path ${formatPath(path)}`);
    }
  }
}

if (errorCount > 0) {
  console.error(`Reference catalogue validation failed with ${errorCount} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  if (errorCount > errors.length) {
    console.error(`- …and ${errorCount - errors.length} more error(s)`);
  }
  process.exit(1);
}

const missingFiles = supportedFiles.filter((name) => !presentFiles.includes(name));
const scalarCount = [...baselineStructure.values()].filter(
  ({ kind }) => kind !== "object" && kind !== "array",
).length;

console.log(
  `Reference catalogue validation passed (${presentFiles.length}/${supportedFiles.length} locales, ` +
    `${scalarCount} scalar values; baseline ${baselineFile}).`,
);
if (missingFiles.length > 0) {
  console.log(`Reference catalogues not supplied yet: ${missingFiles.join(", ")}.`);
}
