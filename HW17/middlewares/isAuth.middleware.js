import jwt from "jsonwebtoken";
import "dotenv/config";

export default async function isAuthMiddleware(req, res, next) {
  try {
    const headers = req.headers["authorization"];
    if (!headers) {
      return res.status(401).json({ message: "token not provided" });
    }
    const token = headers.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "token not provided" });
    }
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (e) {
    return res.status(401).json({ message: "token is expired" });
  }
}
