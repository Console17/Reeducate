import fs from "fs/promises";

export default async function readFile(filePath, isParsed) {
  if (!filePath) return;
  const data = await fs.readFile(filePath, "utf-8");
  return isParsed ? JSON.parse(data) : data;
}
