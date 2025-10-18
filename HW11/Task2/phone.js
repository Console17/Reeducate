const fs = require("fs/promises");
const [, , operation, phone, name] = process.argv;

async function loadContacts() {
  const data = await fs.readFile("contacts.json", "utf8");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
}

async function saveContacts(contacts) {
  await fs.writeFile("contacts.json", JSON.stringify(contacts, null, 2));
}

async function main() {
  const contacts = await loadContacts();

  if (operation === "add") {
    if (contacts.find((c) => c.phone === phone)) {
      console.log("es nomeri ukve arsebobs");
      return;
    }
    contacts.push({ phone, name });
    await saveContacts(contacts);
    console.log("contacti damatebulia");
    return;
  } else if (operation === "delete") {
    const filteredContacts = contacts.filter((c) => c.phone !== phone);
    if (filteredContacts.length === contacts.length) {
      console.log("aseti nomeri ar arsebobs contactebshi ");
    } else {
      await saveContacts(filteredContacts);
      console.log("contacti washlilia");
    }
  } else if (operation === "show") {
    if (contacts.length === 0) {
      console.log("tqvent ar gaqvt contactebi");
    } else {
      console.log(contacts);
    }
  }
}

main();
