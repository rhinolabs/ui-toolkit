#!/usr/bin/env bun
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference types="bun-types" />

export {};

// Get command line args
const [_bun, _script, packageName, version] = process.argv;

// Validate inputs
if (!packageName || !version) {
  console.error('Usage: bun run scripts/version.ts <package-name> <version>');
  process.exit(1);
}

// Determine package.json path
const packagePath = `packages/${packageName}/package.json`;

try {
  // Read and update package.json
  const pkg = await Bun.file(packagePath).json();
  pkg.version = version;

  // Write back to file
  await Bun.write(packagePath, JSON.stringify(pkg, null, 4) + '\n');

  console.log(`✅ Updated ${packageName} to version ${version}`);
} catch (error) {
  console.error(`❌ Error: Could not update ${packagePath}`);
  console.error(error);
  process.exit(1);
}
