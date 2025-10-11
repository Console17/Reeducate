// #1
class TodoApp {
  constructor(id, title, isDone = false) {
    this.id = id;
    this.title = title;
    this.isDone = isDone;
    this.createdAt = new Date().toISOString();
  }
}

class TodoList {
  constructor() {
    this.todos = [];
  }

  add(title) {
    const id = crypto.randomUUID(); // random idebistvis, xelit gadacemac sheidzleba rogorc sxva taskebshia
    const todo = new TodoApp(id, title);
    this.todos.push(todo);
    return todo;
  }

  remove(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  checkDone(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) todo.isDone = !todo.isDone;
  }

  checkActiveTodo(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) return null;
    return !todo.isDone;
  }

  Todos(filter = "all") {
    switch (filter) {
      case "active":
        return this.todos.filter((t) => !t.isDone);
      case "done":
        return this.todos.filter((t) => t.isDone);
      default:
        return this.todos;
    }
  }

  getAllTodos({ active } = {}) {
    if (active === true) return this.todos.filter((t) => !t.isDone);
    if (active === false) return this.todos.filter((t) => t.isDone);
    return this.todos;
  }
}

const todoList = new TodoList();
// todoList.add("iswavle fronti");
// todoList.add("iswavle backi");
// todoList.add("iswavle");

// todoList.checkDone(todoList.todos[0].id);

// console.log("yvela:", todoList.Todos("all"));
// console.log("aqtiuri:", todoList.Todos("active"));
// console.log("shesrulebuli:", todoList.Todos("done"));

// console.log(
//   "getAllTodos({active:true}):",
//   todoList.getAllTodos({ active: true })
// );
// console.log(
//   "getAllTodos({active:false}):",
//   todoList.getAllTodos({ active: false })
// );
// console.log("getAllTodos():", todoList.getAllTodos());

// #2
class ShoppingCart {
  constructor() {
    this.cart = [];
  }

  addToCart(item) {
    this.cart.push({ id: item.id, name: item.name, price: item.price });
  }

  removeFromCart(itemId) {
    this.cart = this.cart.filter((item) => item.id !== itemId);
  }

  updateItem(itemId, updatedData) {
    const item = this.cart.find((i) => i.id === itemId);
    if (!item) {
      return;
    }
    item.name = updatedData.name;
    item.price = updatedData.price;
  }

  calculateTotalPrice() {
    return this.cart.reduce((total, item) => total + item.price, 0);
  }
}

const myCart = new ShoppingCart();

// myCart.addToCart({ id: 1, name: "vashli", price: 99 });
// myCart.addToCart({ id: 2, name: "yava", price: 11 });
// myCart.addToCart({ id: 3, name: "mausi", price: 25 });

// myCart.updateItem(2, { name: "js", price: 10 });
// console.log("Total price:", myCart.calculateTotalPrice());

// myCart.removeFromCart(1);
// console.log(myCart);
// console.log(myCart.calculateTotalPrice());

// #3
class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push({
      id: book.id,
      title: book.title,
      author: book.author,
      year: book.year,
    });
  }
  removeBook(bookId) {
    this.books = this.books.filter((book) => book.id !== bookId);
  }

  listBooks(sort) {
    if (sort === "year") {
      this.books.sort((a, b) => a.year - b.year);
    }
    console.log(this.books);
  }
}

// Example usage
const library = new Library();

library.addBook({
  id: 1,
  title: "Dune",
  author: "Guga Brdzeni",
  year: 1949,
});
library.addBook({
  id: 2,
  title: "Gladiator",
  author: "good author",
  year: 1932,
});
library.addBook({
  id: 3,
  title: "cs2",
  author: "gabe",
  year: 1953,
});

// console.log("yvela wigni:");
// library.listBooks();

// console.log("wlebis mixedvit:");
// library.listBooks("year"); // amis shemdeg originali array isorteba. shegvidzlia spread operatorit davklonot rom originali ar sheicvalos.

// library.removeBook(3);
// library.listBooks();

// #4
class ContactManager {
  constructor() {
    this.contacts = [];
    this.nextId = 1;
  }

  addNewContact({ name, phone, email }) {
    const emailExists = this.contacts.some((c) => c.email === email); // some methodi am taskistvis vipove gptm mirchia, ramdenad kargia ar vici, ise forit da ifit shedzileba igives gaketeba
    const phoneExists = this.contacts.some((c) => c.phone === phone);

    if (emailExists || phoneExists) {
      console.log("nomeri an maili ukve arsebobs");
      return;
    }

    const contact = { id: this.nextId++, name, phone, email };
    this.contacts.push(contact);
  }

  viewAllContacts() {
    console.log(this.contacts);
  }

  updatePhone(contactId, newPhone) {
    const contact = this.contacts.find((c) => c.id === contactId);
    contact.phone = newPhone;
  }

  deleteContact(contactId) {
    this.contacts = this.contacts.filter((contact) => contact.id !== contactId);
  }
}

// Example usage
const manager = new ContactManager();

// manager.addNewContact({
//   name: "Guga",
//   phone: "12345",
//   email: "guga@gmail.com",
// });
// manager.addNewContact({
//   name: "nika",
//   phone: "12592",
//   email: "nika@gmail.com",
// });

// manager.viewAllContacts();

// manager.addNewContact({
//   name: "saba",
//   phone: "12345",
//   email: "saba@gmail.com",
// }); //nomris ganmeoreba
// manager.addNewContact({
//   name: "davit",
//   phone: "54321",
//   email: "nika@gmail.com",
// }); // emailis gameoreba

// manager.updatePhone(2, "11111");
// manager.viewAllContacts();

// manager.deleteContact(1);
// manager.viewAllContacts();
