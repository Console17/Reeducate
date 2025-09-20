// #1
function getMean(array) {
  let sum = array.reduce((acc, val) => {
    return acc + val;
  }, 0);
  return sum / array.length;
}

console.log("task 1 answer:");
console.log(getMean([1, 2, 3, 4]));
console.log("----------------------------------------");

// #2
function getReverseNum(num) {
  return num
    .toString()
    .split("")
    .reverse()
    .map((digit) => Number(digit));
}

console.log("task 2 answer:");
console.log(getReverseNum(35231));
console.log(getReverseNum(0));
console.log("----------------------------------------");

// #3
function getUniqueDigits(arr1, arr2) {
  return arr1.filter((item) => !arr2.includes(item));
}

console.log("task 3 answer:");
console.log(getUniqueDigits([1, 2], [1]));
console.log(getUniqueDigits([1, 2, 2, 2, 3], [2]));
console.log("----------------------------------------");

// #4
function getSecondBiggestNum(arr) {
  sortedArray = arr.sort((a, b) => b - a);
  return sortedArray[1];
}

console.log("task 4 answer:");
console.log(getSecondBiggestNum([10, 40, 20, 5, 30]));
console.log("----------------------------------------");

// #5
function getPalindormes(arr) {
  return arr.filter(
    (element) => element === element.split("").reverse().join("")
  );
}

console.log("task 5 answer:");
console.log(getPalindormes(["mom", "car", "level", "dog"]));
console.log("----------------------------------------");

// #6
function getMode(arr) {
  let maxCount = 0;
  let mode = null;
  let frequency = {};

  for (const value of arr) {
    frequency[value] =
      frequency[value] === undefined ? 1 : frequency[value] + 1;
    if (frequency[value] > maxCount) {
      maxCount = frequency[value];
      mode = value;
    }
  }
  return mode;
}

console.log("task 6 answer:");
console.log(getMode([4, 5, 6, 5, 4, 5]));
console.log("----------------------------------------");
