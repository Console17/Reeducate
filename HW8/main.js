//1
function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const mouseLocation = debounce((e) => {
  console.log("mausi gacherda:", e.clientX, e.clientY);
}, 300);

window.addEventListener("mousemove", mouseLocation);

//2
const btn = document.querySelector(".btn");
const parag = document.querySelector(".parag");

btn.addEventListener("click", async () => {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    const data = await response.json();
    parag.textContent = data.quote;
  } catch (error) {
    console.error(error);
  }
});

//3
const container = document.querySelector(".container");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");
const pageInfo = document.querySelector(".pageInfo");

let currentPage = 1;
const limit = 30;
const totalUsers = 200;
const totalPages = Math.ceil(totalUsers / limit);

async function fetchUsers(page = 1) {
  const skip = (page - 1) * limit;
  const res = await fetch(
    `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
  );
  const data = await res.json();
  console.log(data);
  displayUsers(data.users);
  updatePagination();
}

function displayUsers(users) {
  container.innerHTML = users
    .map(
      (user) => `
        <div class="user-card">
          <h3>${user.firstName} ${user.lastName}</h3>
          <p>${user.email}</p>
        </div>
      `
    )
    .join("");
}

function updatePagination() {
  pageInfo.textContent = `gverdi ${currentPage}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    fetchUsers(currentPage);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    fetchUsers(currentPage);
  }
});

fetchUsers(currentPage);

//4
const input = document.querySelector(".input");
const carBtn = document.querySelector(".carBtn");
const carInfo = document.querySelector(".carInfo");

carBtn.addEventListener("click", async (e) => {
  const id = input.value.trim();
  e.preventDefault();
  try {
    const res = await fetch(`https://myfakeapi.com/api/cars/${id}`);

    const data = await res.json();
    console.log(data);
    carInfo.innerHTML = `
          <p>${data.Car.car}</p>
          <p>modeli: ${data.Car.car_model}</p>
          <p>feri: ${data.Car.car_color}</p>
          <p>weli: ${data.Car.car_model_year}</p>
        `;
  } catch (error) {
    alert("gtxovt sheiyvanot sxva ricxvi");
    console.error(error);
  }
});
