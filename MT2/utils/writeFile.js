import fs from "fs/promises";

export default async function writeFile(filePath, data) {
  if (!filePath || !data) return;
  await fs.writeFile(
    filePath,
    typeof data === "string" ? data : JSON.stringify(data, null, 2)
  );
}
