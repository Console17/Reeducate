// #1
// console.log("1");
// setTimeout(() => console.log("2"), 100);
// setTimeout(() => console.log("3"), 0);
// Promise.resolve().then(() => console.log("4"));
// console.log("5");

console.log("task 1 answer:");
console.log("tanmimdevroba: 1,5,4,3,2");
console.log("----------------------------------------");

// #2
// console.log("1");
// setTimeout(() => console.log("2"), 0);
// Promise.resolve().then(() => {
//   console.log("3");
//   setTimeout(() => console.log("4"), 0);
// });
// console.log("5");

console.log("task 2 answer:");
console.log("tanmimdevroba: 1,5,3,2,4");
console.log("----------------------------------------");

// #3
function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

console.log("task 3 answer:");
await sleep(1000);
console.log("1 wamis shemdeg");
console.log("----------------------------------------");

// #4
function guessNumber(number) {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const random = Math.floor(Math.random() * 20) + 1;
      console.log("random guess:", random);

      if (random === number) {
        console.log("Fount random number");
        clearInterval(interval);
        resolve(random);
      }
    }, 1000);
  });
}

console.log("task 4 answer:");
await guessNumber(6);
console.log("----------------------------------------");

// #5
async function countdown(start, time) {
  const interval = time / start;

  for (let i = start; i >= 0; i--) {
    console.log(i);
    if (i > 0) {
      await sleep(interval); // funqcia #3 taskidan
    }
  }
  console.log("Done!");
}

countdown(5, 5000);
