import { readdir } from "node:fs/promises";
import path from "node:path";

const folderPath = process.argv[2] || process.cwd();
const absolutePath = path.resolve(folderPath);
const folderName = path.basename(absolutePath);

let entries;

try {
  entries = await readdir(absolutePath, { withFileTypes: true });
} catch {
  console.error(`error: could not read folder: ${folderPath}`);
  process.exit(1);
}

const fileCount = entries.filter((e) => e.isFile()).length;
const folderCount = entries.filter((e) => e.isDirectory()).length;

console.log(`Folder: ${folderName}`);
console.log(`Path: ${absolutePath}`);
console.log(`Files: ${fileCount}`);
console.log(`Folders: ${folderCount}`);