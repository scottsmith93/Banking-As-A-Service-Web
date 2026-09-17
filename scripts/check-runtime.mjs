#!/usr/bin/env node

import process from "node:process";

const [major, minor] = process.versions.node.split(".").map(Number);
const supportsVite =
  (major === 20 && minor >= 19) ||
  (major === 22 && minor >= 12) ||
  major === 23;

if (!supportsVite) {
  console.error(
    `[setup] Node ${process.versions.node} is not supported. This project requires Node 20.19+ or Node 22.12+ (below Node 24).`,
  );
  console.error("[setup] If you use nvm, run: nvm install && nvm use");
  process.exit(1);
}
