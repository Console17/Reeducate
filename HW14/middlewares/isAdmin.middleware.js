export default function isAdminMiddleware(req, res, next) {
  const role = req.headers["role"];
  if (role !== "ADMIN") {
    return res.status(403).send("dont have access to delete");
  }
  next();
}
