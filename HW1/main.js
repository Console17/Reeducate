// #1
function convertToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

console.log("task 1 answer:");
console.log(convertToFahrenheit(6));
console.log("----------------------------------------");

// #2
function reverseString(string) {
  const splittedString = string.split("");
  return splittedString.reverse().join("");
}

console.log("task 2 answer:");
console.log(reverseString("Guga"));
console.log("----------------------------------------");

// #3
function countWords(sentence) {
  const splittedSentence = sentence.split(" ");
  return splittedSentence.length;
}

console.log("task 3 answer:");
console.log(countWords("ramdeni sityvaa winadadebashi"));
console.log("----------------------------------------");

// #4
function countVowels(string) {
  let count = 0;
  const vowels = "aeiouAEIOU";
  for (let i = 0; i < string.length; i++) {
    if (vowels.includes(string[i])) {
      count++;
    }
  }
  return count;
}

console.log("task 4 answer:");
console.log(countVowels("ramdeni xmovania"));
console.log("----------------------------------------");

// #5
function getFactorial(number) {
  if (number < 0) {
    return "gtxovt sheiyvanot mxolod 0+ ricxvebi";
  }
  let factorial = 1;
  for (let i = 1; i <= number; i++) {
    factorial *= i;
  }
  return factorial;
}

console.log("task 5 answer:");
console.log(getFactorial(4));
console.log("----------------------------------------");

// #6
function evenSum(number) {
  let sum = 0;
  for (let i = 0; i <= number; i++) {
    if (i % 2 === 0) {
      sum += i;
    }
  }
  return sum;
}

console.log("task 6 answer:");
console.log(evenSum(4));
console.log("----------------------------------------");

// #7
function getGrades(grade) {
  if (grade <= 60) {
    return "F";
  } else if (grade <= 70) {
    return "E";
  } else if (grade <= 80) {
    return "C";
  } else if (grade <= 90) {
    return "B";
  } else if (grade <= 100) {
    return "A";
  }
}
// დავალების პირობაში D გამოტოვებული იყო და F-ს და E-ს 10ით მეტი მნიშვნელობა აქვთ. წესით 60-70-ში უნდა ყოფილიყო D
console.log("task 7 answer:");
console.log(getGrades(84));
console.log("----------------------------------------");

// #8
function checkPassword(password) {
  let passwordLength = false;
  let passwordNumber = false;
  let hasUppercase = false;
  if (password.length > 8) {
    passwordLength = true;
  }

  for (let i = 0; i < password.length; i++) {
    if (!isNaN(password[i]) && password[i] !== " ") {
      passwordNumber = true;
    }
    if (password[i] === password[i].toUpperCase() && isNaN(password[i])) {
      hasUppercase = true;
    }
  }

  return passwordLength && passwordNumber && hasUppercase;
}

console.log("task 8 answer:");
console.log(checkPassword("Paroli123"));
console.log("----------------------------------------");
