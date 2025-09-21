// #1
function deleteLastSymbol(array) {
  return array.map((string) => string.slice(0, -1));
}

console.log("task 1 answer:");
console.log(deleteLastSymbol(["one", "two", "three"]));
console.log("----------------------------------------");

// #2
function smallestSum(array) {
  let sortedArray = array.sort((a, b) => a - b);
  //   console.log(sortedArray);
  return sortedArray[0] + sortedArray[1];
}

console.log("task 2 answer:");
console.log(smallestSum([19, 5, 42, 2, 77]));
console.log("----------------------------------------");

// #3
const transactions = [
  { amount: 10, currency: "USD" },
  { amount: 20, currency: "EUR" },
  { amount: 5, currency: "USD" },
  { amount: 50, currency: "EUR" },
];

const groupedByCurrency = transactions.reduce((acc, item) => {
  const key = item.currency;
  if (!acc[key]) {
    acc[key] = [];
  }

  acc[key].push({ amount: item.amount });

  return acc;
}, {});

console.log("task 3 answer:");
console.log(groupedByCurrency);
console.log("----------------------------------------");

// #4
function countAndSum(array) {
  let positiveCount = 0;
  let negativeSum = 0;
  for (let num of array) {
    if (num > 0) {
      positiveCount++;
    } else if (num < 0) {
      negativeSum += num;
    }
  }
  return [positiveCount, negativeSum];
}

console.log("task 4 answer:");
console.log(
  countAndSum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, -10, -15, -20, -5, -15])
);
console.log("----------------------------------------");

// #5
function getSum(array) {
  let sum = 0;
  array.forEach((element) => {
    sum += element;
  });
  return sum;
}

console.log("task 5 answer:");
console.log(getSum([10, 12, 4, 2]));
console.log("----------------------------------------");

// #6
function filterString(array) {
  let filterStrings = array.filter((word) => word.length > 5);
  let upperCaseStrings = filterStrings.map((word) => word.toUpperCase());
  return upperCaseStrings.join("#");

  //   ან
  //   return array
  //     .filter((word) => word.length > 5)
  //     .map((word) => word.toUpperCase())
  //     .join("#");
}

console.log("task 6 answer:");
console.log(filterString(["cat", "parrot", "dog", "elephant"])); // => "PARROT#ELEPHANT"
console.log("----------------------------------------");

// #7
const data = [
  { name: "Ann", cls: "A", grade: 90 },
  { name: "Ben", cls: "B", grade: 75 },
  { name: "Cara", cls: "A", grade: 80 },
];

const meanGrade = data.reduce((acc, student) => {
  let key = student.cls;
  if (!acc[key]) {
    acc[key] = { sum: 0, count: 0 };
  }
  acc[key].sum += student.grade;
  acc[key].count++;

  return acc;
}, {});

for (let item in meanGrade) {
  meanGrade[item] = meanGrade[item].sum / meanGrade[item].count;
}

console.log("task 7 answer:");
console.log(meanGrade);
console.log("----------------------------------------");
