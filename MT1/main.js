#!/usr/bin/env node

import { Command } from "commander";
import { v4 as uuidv4 } from "uuid";
import readFile from "./utils/readFile.js";
import writeFile from "./utils/writeFile.js";
const program = new Command();

program.name("expanse-cli").description("expense-cli tool").version("1.0.0");
program
  .command("show")
  .option("-i, --id <expanseId>", "Id to show exact expanse")
  .option("--asc", "Sorts by asc")
  .option("--desc", "Sorts by desc")
  .option("-c, --category <category>", "category to filter")
  .option("-p, --page <page>", "page of expanses", "1")
  .option("-t, --take <take>", "number of expanses", "10")
  .description("shows all expanses")
  .action(async (opts) => {
    const expanses = await readFile("expanse.json", true);

    if (opts.id) {
      const expanse = expanses.find((el) => el.id === opts.id);
      if (!expanse) {
        console.log("no such expanse exists");
        return;
      }
      console.log(expanse);
      return;
    }

    if (opts.asc) {
      expanses.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    if (opts.desc) {
      expanses.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    if (opts.category) {
      const filteredCategories = expanses.filter(
        (el) => el.category === opts.category
      );
      console.log(filteredCategories);
      return;
    }
    const page = Number(opts.page);
    const take = Math.min(Number(opts.take), 10);
    console.log(expanses.slice((page - 1) * take, take * page));
  });
program
  .command("add")
  .description("adds new expanse to the list")
  .argument("<category>", "category for new expanse")
  .argument("<price>", "price of new expanse")
  .action(async (category, price) => {
    const expanses = await readFile("expanse.json", true);

    if (price < 10) {
      console.log("price should be at least 10");
      return;
    }

    const newExpanse = {
      category,
      price,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    expanses.push(newExpanse);
    await writeFile("expanse.json", expanses);
    console.log("added new expanse to the list: \n", newExpanse);
  });
program
  .command("delete")
  .description("deletes expanse")
  .argument("<id>", "id for expanse to delete")
  .action(async (id) => {
    const expanses = await readFile("expanse.json", true);
    const expanseId = expanses.findIndex((el) => el.id === id);
    if (expanseId === -1) {
      console.log("no todo with that id exists");
      return;
    }
    const deletedExpanse = expanses[expanseId];
    expanses.splice(expanseId, 1);
    await writeFile("expanse.json", expanses);
    console.log(deletedExpanse);
  });
program
  .command("update")
  .description("updates exsisting expanse")
  .argument("<id>", "id of expanse to update")
  .option("-c, --category <category>", "category to update")
  .option("-p, --price <price>", "price to update")
  .action(async (id, opts) => {
    const expanses = await readFile("expanse.json", true);
    const expanseToUpdate = expanses.find((el) => el.id === id);
    if (!expanseToUpdate) {
      console.log("now expanse with such id exsits");
    }
    if (opts.category) {
      expanseToUpdate.category = opts.category;
    }
    if (opts.price && opts.price >= 10) {
      expanseToUpdate.price = opts.price;
    }
    await writeFile("expanse.json", expanses);
    console.log("updated expanse: \n", expanseToUpdate);
  });
program
  .command("search")
  .description("search expanse by added date")
  .argument("<date>", "date to seach with")
  .action(async (date) => {
    const expanses = await readFile("expanse.json", true);
    const inputDate = new Date(date);
    console.log(inputDate);
    if (isNaN(inputDate)) {
      console.log("invalid date format");
    }
    const filteredExpanses = expanses.filter((el) => {
      const expanseDate = new Date(el.createdAt);
      return (
        expanseDate.getFullYear() === inputDate.getFullYear() &&
        expanseDate.getMonth() === inputDate.getMonth() &&
        expanseDate.getDate() === inputDate.getDate()
      );
    });

    if (filteredExpanses.length === 0) {
      console.log("No expenses found on this date");
      return;
    }

    console.log(filteredExpanses);
  });

program.parse();
