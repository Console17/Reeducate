// #1
function getAbbr(string) {
  let splittedString = string.split(" ");
  let abbr = "";
  //   console.log(splittedString.length);

  splittedString.forEach((word) => {
    abbr += word[0].toUpperCase() + ".";
  });

  abbr = abbr.slice(0, -1);
  return abbr;
}

console.log("task 1 answer:");
console.log(getAbbr("John Doe"));
console.log("----------------------------------------");

// #2
function getSumOfDigit(number) {
  let sum = 0;
  let string = number.toString();

  for (let i = 0; i < string.length; i++) {
    sum += parseInt(string[i]);
  }
  return sum;
}

console.log("task 2 answer:");
console.log(getSumOfDigit(123));
console.log("----------------------------------------");

// #3
function removeDuplicates(string) {
  let newString = "";
  for (let i = 0; i < string.length; i++) {
    if (!newString.includes(string[i])) {
      newString += string[i];
    }
  }
  return newString;
}

console.log("task 3 answer:");
console.log(removeDuplicates("banana"));
console.log("----------------------------------------");

// #4
function removeSpaces(string) {
  let newString = "";
  for (let i = 0; i < string.length; i++) {
    if (string[i] != " ") {
      newString += string[i];
    }
  }
  return newString;
}

console.log("task 4 answer:");
console.log(removeSpaces("1 2 aab"));
console.log("----------------------------------------");

// #5
function reverseEachWord(string) {
  let splittedString = string.split(" ");
  let reversedWords = [];
  console.log(splittedString);

  for (let i = 0; i < splittedString.length; i++) {
    let reverseWord = splittedString[i].split("").reverse().join("");
    reversedWords.push(reverseWord);
  }
  return reversedWords.join(" ");
}

console.log("task 5 answer:");
console.log(reverseEachWord("Hello World"));
console.log("----------------------------------------");
