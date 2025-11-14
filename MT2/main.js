import express from "express";
import readFile from "./utils/readFile.js";
import writeFile from "./utils/writeFile.js";
import apiRouter from "./api/api.controller.js";

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api", apiRouter);

app.get("/", async (req, res) => {
  const expenses = await readFile("expenses.json", true);
  const { category } = req.query;
  let filteredExpenses = expenses;
  if (category) {
    filteredExpenses = expenses.filter(
      (e) => e.category.toLowerCase() === category.toLowerCase()
    );
  }

  res.render("pages/home.ejs", { expenses: filteredExpenses });
});

app.get("/create", (req, res) => {
  res.render("pages/create.ejs");
});

app.get("/expenses/:id", async (req, res) => {
  const id = req.params.id;
  const expenses = await readFile("expenses.json", true);
  const expense = expenses.find((e) => e.id === id);
  res.render("pages/details.ejs", { expense });
});

app.get("/expenses/:id/details", async (req, res) => {
  const id = req.params.id;
  const expenses = await readFile("expenses.json", true);
  const expense = expenses.find((e) => e.id === id);
  res.render("pages/update.ejs", { expense });
});

app.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
