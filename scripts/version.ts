#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';

// Get command line args
const [_node, _script, packageName, version] = process.argv;

// Validate inputs
if (!packageName || !version) {
  console.error('Usage: pnpm tsx scripts/version.ts <package-name> <version>');
  process.exit(1);
}

// Determine package.json path
const packagePath = `packages/${packageName}/package.json`;

const main = async () => {
  try {
    // Read and update package.json
    const content = await readFile(packagePath, 'utf-8');
    const pkg = JSON.parse(content);
    pkg.version = version;

    // Write back to file
    await writeFile(packagePath, JSON.stringify(pkg, null, 4) + '\n');

    console.log(`✅ Updated ${packageName} to version ${version}`);
  } catch (error) {
    console.error(`❌ Error: Could not update ${packagePath}`);
    console.error(error);
    process.exit(1);
  }
}

main();
