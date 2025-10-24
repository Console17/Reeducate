#!/usr/bin/env node

import { Command } from "commander";
import { v4 as uuidv4 } from "uuid";
import readFile from "./utils/readFile.js";
import writeFile from "./utils/writeFile.js";
const program = new Command();

program.name("todo CLI").description("todo CLI tool").version("1.0.0");

program
  .command("show")
  .description("returns all todos")
  .action(async () => {
    const todos = await readFile("todo.json", true);
    console.log(todos);
  });
program
  .command("add")
  .description("adds new todo")
  .argument("<todoName>", "name of a new todo")
  .action(async (name) => {
    const todos = await readFile("todo.json", true);

    const newTodo = {
      id: uuidv4(),
      name,
      isDone: "false",
    };
    todos.push(newTodo);
    await writeFile("todo.json", todos);
    console.log(newTodo);
  });
program
  .command("delete")
  .description("deletes todo")
  .argument("<id>", "id for a todo")
  .action(async (id) => {
    const todos = await readFile("todo.json", true);
    const index = todos.findIndex((el) => el.id === id);
    if (index === -1) {
      console.log("no todo with that id exists");
    }
    const deletedTodo = todos[index];
    todos.splice(index, 1);
    await writeFile("todo.json", todos);
    console.log(deletedTodo);
  });
program
  .argument("<id>", "todo ID to update")
  .description("updates exsisting todo")
  .option("-n, --name <todoName>", "name property")
  .option("-d, --done", "mark todo as done")
  .action(async (id, opts) => {
    const todos = await readFile("todo.json", true);
    const todo = todos.find((el) => el.id === id); // isev findIndexitac sheidzleba
    console.log(id);
    if (!todo) {
      console.log("no todo with that id exists");
      return;
    }
    if (opts.name) {
      todo.name = opts.name;
    }
    if (opts.done) {
      todo.isDone = true;
    }

    await writeFile("todo.json", todos);
    console.log(todo);
  });
program.parse();
