// #1
async function fetchWrongURL(url, delay = 1000, retrues = 5) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(`${error.message} #${retrues}`);

    if (retrues === 1) {
      throw new Error("maqsimaluri ganmeorebebis raodenoba amoiwura");
    }

    await new Promise((res) => setTimeout(res, delay));
    return fetchWrongURL(url, delay, retrues - 1);
  }
}
fetchWrongURL("https://jsonplaceholde.typicode.com")
  .then((data) => console.log(data))
  .catch((error) => console.error(error.message));

// #2
async function resolveRace() {
  const urls = [
    "https://dummyjson.com/users",
    "https://jsonplaceholder.typicode.com/users",
  ];

  try {
    const result = await Promise.race(
      urls.map(async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return { url, data };
      })
    );

    console.log("pirveli daresolvda :", result.url);
    console.log("data: ", result.data);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
// resolveRace();

//3
async function filterProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    // console.log(data);
    const filteredData = data.products.filter((product) => product.price > 10);
    console.log(filteredData);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
// filterProducts();

//4
async function filterDevs() {
  try {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    // console.log(data);
    const filteredData = data.users.filter(
      (user) => user.company.title === "Web Developer"
    );

    // console.log(filteredData);
    filteredData.forEach((user) => {
      console.log(
        `
            ${user.firstName} ${user.lastName} 
            adress: ${user.address.address} 
            mail: ${user.email} 
            phone: ${user.phone}
            `
      );
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}
// filterDevs();

//5
async function fetchAll() {
  const urls = [
    "https://dummyjson.com/recipes",
    "https://dummyjson.com/comments",
    "https://dummyjson.com/todos",
    "https://dummyjson.com/quotes",
  ];
  try {
    const responses = await Promise.all(urls.map((url) => fetch(url)));
    const data = await Promise.all(responses.map((res) => res.json()));

    console.log("recipes:", data[0]);
    console.log("comments:", data[1]);
    console.log("todos:", data[2]);
    console.log("quotes:", data[3]);
  } catch (error) {
    console.error("Error:", error.message);
  }
}
// fetchAll();
