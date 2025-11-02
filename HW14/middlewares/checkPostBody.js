export default function checkPostBody(req, res, next) {
  if (!req.body) {
    return res.status(400).send("body is required");
  }
  const { category, price } = req.body;
  if (!category || !price) {
    return res.status(400).send("category and price are required");
  }
  next();
}
