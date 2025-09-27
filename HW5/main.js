// #1
const myObj = {
  name: "guga",
  uni: "ilia",
  program: "cs eng",
  grade: "75",
};

function deleteProperty(obj, property) {
  delete obj[property];
  return obj;
}

console.log("task 1 answer:");
console.log(deleteProperty(myObj, "grade"));
console.log("----------------------------------------");

// #2
const students = [
  { name: "Ana", score: 50 },
  { name: "Nika", score: 80 },
  { name: "Luka", score: 70 },
];

function studentRanking(array) {
  return array
    .sort((a, b) => b.score - a.score)
    .map((student, index) => ({
      ...student,
      rank: index + 1,
    }));
}

console.log("task 2 answer:");
console.log(studentRanking(students));
console.log("----------------------------------------");

// #3
const titles = [
  { title: "Up", year: 2009 },
  { title: "The Lord of the Rings", year: 2001 },
];

function longestTtile(array) {
  return array.reduce((longest, current) => {
    return current.title.length > longest.title.length ? current : longest;
  });
}

console.log("task 3 answer:");
console.log(longestTtile(titles));
console.log("----------------------------------------");

// #4
const departaments = [
  { name: "Ana", dept: "HR", age: 25 },
  { name: "Nika", dept: "IT", age: 30 },
  { name: "Luka", dept: "IT", age: 22 },
];

function avgAgeOfDepartaments(array) {
  const sum = array.reduce((acc, person) => {
    const key = person.dept;
    if (!acc[key]) {
      acc[key] = { totalAge: 0, count: 0 };
    }
    acc[key].totalAge += person.age;
    acc[key].count++;
    return acc;
  }, {});

  const avgAge = {};
  for (const dept in sum) {
    avgAge[dept] = sum[dept].totalAge / sum[dept].count;
  }

  return avgAge;
}

console.log("task 4 answer:");
console.log(avgAgeOfDepartaments(departaments));
console.log("----------------------------------------");

// 5
const comments = [
  { id: 1, comment: "Hello world" },
  { id: 2, comment: "This is great!" },
  { id: 3, comment: "" },
];
// console.log(comments[1].comment.split(" ").length);

function countWords(array) {
  count = 0;
  for (const item of array) {
    count += item.comment.split(" ").filter((word) => word.length > 0).length;
  }
  return count;
}

console.log("task 5 answer:");
console.log(countWords(comments));
console.log("----------------------------------------");
