import { readFile } from "node:fs/promises";
import path from "node:path";

const filePath = process.argv[2];

function printError(message) {
  console.error(`error: ${message}`);
  process.exitCode = 1;
}

function getFileStats(text) {
  const normalized = text.replace(/\r\n/g, "\n");

  return {
    // one trailing newline ends the last line, it doesn't start a new one
    lines: text.length === 0 ? 0 : normalized.replace(/\n$/, "").split("\n").length,
    words: text.trim().split(/\s+/).filter(Boolean).length,
    characters: text.length,
  };
}

async function main() {
  if (!filePath) {
    printError("please provide a file path");
    return;
  }

  let text;
  try {
    text = await readFile(filePath, "utf8");
  } catch {
    printError(`could not read file: ${filePath}`);
    return;
  }

  const stats = getFileStats(text);

  console.log(`File: ${path.basename(filePath)}`);
  console.log(`Lines: ${stats.lines}`);
  console.log(`Words: ${stats.words}`);
  console.log(`Characters: ${stats.characters}`);
}

await main();