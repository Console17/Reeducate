const fs = require("fs/promises");
const [, , operation, arg1, arg2] = process.argv;

async function loadCars() {
  const data = await fs.readFile("cars.json", "utf8");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
}

async function saveCars(cars) {
  await fs.writeFile("cars.json", JSON.stringify(cars, null, 2));
}

async function main() {
  const cars = await loadCars();
  if (operation === "show") {
    if (cars.length === 0) {
      console.log("jer daamatet manqanebi");
      return;
    }
    let filteredCars = [];
    if (!isNaN(arg1)) {
      filteredCars = cars.filter((c) => c.carReleaseDate > Number(arg1));
    } else {
      filteredCars = cars.filter((c) => c.carColor === arg1);
    }

    console.log(filteredCars);
    return;
  }

  const [carName, carReleaseDate, carColor] = [operation, arg1, arg2];
  if (!carName || !carReleaseDate || !carColor) {
    console.log("gtxovt sheiyvanot saxeli weli da feri");
    return;
  }

  const newCar = {
    carName,
    carReleaseDate: Number(carReleaseDate),
    carColor,
  };

  cars.push(newCar);
  await saveCars(cars);
  console.log("manqana damatebulia");
}

main();
