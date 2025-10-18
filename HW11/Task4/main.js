const fs = require("fs/promises");

async function main() {
  const text = await fs.readFile("random.txt", "utf-8");

  const words = text.trim().split(/\s+/).length;
  const vowels = text.match(/[aeiou]/gi).length;
  const chars = text.match(/[a-z]/gi).length;

  const result = {
    word: words,
    vowel: vowels,
    chars: chars,
  };

  console.log(result);
}

main();
