// #1
function groupByDate(array) {
  const grouped = array.reduce((acc, item) => {
    const key = item.date;
    // console.log(key);
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += item.amount;
    return acc;
  }, {});
  return grouped;
}

console.log("task 1 answer:");
console.log(
  groupByDate([
    { date: "2025-01-01", amount: 12.5 },
    { date: "2025-01-01", amount: 7.5 },
    { date: "2025-01-02", amount: 10 },
  ])
);
console.log("----------------------------------------");

//2
function groupByVendor(array) {
  const grouped = array.reduce((acc, item) => {
    const key = item.vendor;
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += item.price;
    return acc;
  }, {});

  return grouped;
}

console.log("task 2 answer:");
console.log(
  groupByVendor([
    { vendor: "A", price: 10 },
    { vendor: "A", price: 20 },
    { vendor: "B", price: 15 },
  ])
);
console.log("----------------------------------------");

//3
function longestWordInArray(array) {
  let longest = "";
  for (const word of array) {
    if (word.length > longest.length) {
      longest = word;
    }
  }
  return longest;
}

console.log("task 3 answer:");
console.log(longestWordInArray(["apple", "banana", "kiwi"]));
console.log("----------------------------------------");

//4
function objSum(obj) {
  let sum = 0;
  for (const value in obj) {
    sum += obj[value];
  }
  return sum;
}

console.log("task 4 answer:");
console.log(objSum({ x: 5, y: 3 }));
console.log("----------------------------------------");

//5
function totalAmount(array) {
  return array
    .filter((item) => item.status === "active")
    .map((item) => item.amount * 2)
    .reduce((acc, amount) => acc + amount, 0);
}

console.log("task 5 answer:");
console.log(
  totalAmount([
    { id: 1, amount: 10, status: "active" },
    { id: 2, amount: 5, status: "inactive" },
  ])
);
console.log("----------------------------------------");

//6
class UserManager {
  constructor() {
    this.users = [];
    this.nextId = 1;
  }

  create(user) {
    const newUser = { id: this.nextId++, ...user };
    this.users.push(newUser);
    return newUser;
  }

  read(id) {
    return this.users.find((user) => user.id === id);
  }

  update(id, data) {
    const user = this.users.find((user) => user.id === id);
    if (!user) return "no user found :(((";
    Object.assign(user, data);
    return user;
  }

  delete(id) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) return "no user founr :(((";
    this.users.splice(index, 1);
    return "user deleted ";
  }
}
console.log("task 6 answer:");
const manager = new UserManager();

const user1 = manager.create({ name: "guga", age: 21 });
const user2 = manager.create({ name: "spartak", age: 12 });
console.log(manager.read(user1.id));
console.log(manager.update(user2.id, { age: 31 }));
console.log(manager.delete(user1.id));
console.log("----------------------------------------");

//7
async function fetchHighPriceProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");

    const data = await response.json();
    // console.log(data);
    const filteredProducts = data.products.filter(
      (product) => product.price > 100
    );

    filteredProducts.forEach((product) => console.log(product.title));
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

console.log("task 7 answer:");
fetchHighPriceProducts();
console.log("----------------------------------------");

//8
function groupByName(array) {
  return array
    .filter((user) => user.active)
    .map((user) => ({ full: `${user.first} ${user.last}` }));
}

console.log("task 8 answer:");
console.log(
  groupByName([
    { first: "a", last: "b", active: true },
    { first: "c", last: "d", active: false },
  ])
);
console.log("----------------------------------------");
