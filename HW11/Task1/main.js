const fs = require("fs/promises");

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();
  const filteredData = data.map(({ id, name, username, email }) => ({
    id,
    name,
    username,
    email,
  }));
  await fs.writeFile("users.json", JSON.stringify(filteredData, null, 2)); // null-i da 2 formatistvis davumate
}

getUsers();
