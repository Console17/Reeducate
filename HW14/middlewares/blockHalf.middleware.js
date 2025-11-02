export default function blockHalf(req, res, next) {
  const blockChance = Math.random();
  if (blockChance < 0.5) {
    return res.status(503).json({
      error: "YOU HAVE BEEN RANDOMLY BLOCKED. UNLUCKY",
    });
  }
  next();
}
