#!/usr/bin/env node

import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join } from "node:path";
import process from "node:process";

const cwd = process.cwd();
const viteBin = join(cwd, "node_modules", ".bin", process.platform === "win32" ? "vite.cmd" : "vite");

if (existsSync(viteBin)) {
  process.exit(0);
}

const hasLockfile = existsSync(join(cwd, "package-lock.json"));
const installCmd = hasLockfile ? "ci" : "install";

console.log(`[setup] Local dependencies are missing. Running npm ${installCmd} before starting dev...`);

const install = spawnSync("npm", [installCmd], {
  cwd,
  stdio: "inherit",
  shell: process.platform === "win32",
});

if (install.error) {
  console.error("[setup] Failed to execute npm install.");
  console.error(install.error.message);
  process.exit(1);
}

if (typeof install.status === "number" && install.status !== 0) {
  console.error(`[setup] npm install failed with exit code ${install.status}.`);
  process.exit(install.status);
}

console.log("[setup] Dependencies installed. Continuing with dev startup.");
