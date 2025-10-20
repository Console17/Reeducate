const fs = require("fs/promises");
const path = require("path"); //extname(__filename)

let totalWords = 0;
let totalVowels = 0;
async function main(filepath) {
  try {
    const dirs = await fs.readdir(filepath);
    // console.log(dirs);
    for (let dir of dirs) {
      //   console.log(dir);
      const fullPath = path.join(filepath, dir);
      //   console.log(fullPath);
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory()) {
        await main(fullPath);
      }
      const ext = path.extname(fullPath);
      if (ext === ".txt") {
        const text = await fs.readFile(fullPath, "utf-8");
        totalWords += text.trim().split(/\s+/).length;
        totalVowels += text.match(/[aeiou]/gi).length;
      }
    }
  } catch {
    console.log(e);
  }
}

main(__dirname).then(() =>
  console.log(`sityvebis jami: ${totalWords} \nxmovnebis jami ${totalVowels}`)
);
