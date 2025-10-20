const http = require("http");
const url = require("url");
const fs = require("fs/promises");

const aboutGuga = {
  name: "guga",
  age: "21",
  education: "University 4th year",
};

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const { pathname, query } = parsedUrl;

  if (req.method === "GET" && pathname === "/about") {
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify(aboutGuga));
  }

  if (req.method === "GET" && pathname === "/players") {
    const data = await fs.readFile("./players.json", "utf-8");
    let players = JSON.parse(data);

    if (query.nation) {
      const nation = query.nation.toLocaleLowerCase();
      players = players.filter((p) => {
        return p.nation.toLocaleLowerCase() === nation;
      });
    }
    res.writeHead(200, { "content-type": "application/json" });
    return res.end(JSON.stringify(players));
  }

  if (req.method === "POST" && pathname === "/players") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      const newPlayerInfo = JSON.parse(body);

      if (
        !newPlayerInfo.name ||
        !newPlayerInfo.status ||
        !newPlayerInfo.nation ||
        !newPlayerInfo.age
      ) {
        res.writeHead(400, { "content-type": "application/json" });
        return res.end(
          JSON.stringify({
            success: false,
            error: "Gtxovt mogvawodot mtliani informacia",
          })
        );
      }

      const data = await fs.readFile("./players.json", "utf-8");
      const players = JSON.parse(data);
      const lastId = players[players.length - 1]?.id || 0;
      const newPlayer = {
        id: lastId + 1,
        name: newPlayerInfo.name,
        status: newPlayerInfo.status,
        nation: newPlayerInfo.nation,
        age: newPlayerInfo.age,
      };
      players.push(newPlayer);
      await fs.writeFile("./players.json", JSON.stringify(players, null, 2));

      res.writeHead(201, { "content-type": "application/json" });
      return res.end("success");
    });
  }

  if (req.method === "DELETE" && pathname.startsWith("/players")) {
    const id = parseInt(pathname.split("/")[2]);
    const data = await fs.readFile("./players.json", "utf-8");
    let players = JSON.parse(data);

    const initialLength = players.length;
    players = players.filter((p) => p.id !== id);

    if (players.length === initialLength) {
      res.writeHead(404, { "content-type": "application/json" });
      return res.end(JSON.stringify({ success: false }));
    }

    await fs.writeFile("./players.json", JSON.stringify(players, null, 2));
    res.writeHead(200, JSON.stringify({ success: true, data: players }));
    return res.end("deleted");
  }
});

server.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});
