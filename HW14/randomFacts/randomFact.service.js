// randomFact.service.js
export async function getRandomFact(req, res) {
  const response = await fetch(
    "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en"
  );

  if (!response.ok) {
    console.error("error");
    res.status(500).json({ error: "Failed to fetch random fact" });
  }
  const data = await response.json();
  res.json({ fact: data.text });
}
