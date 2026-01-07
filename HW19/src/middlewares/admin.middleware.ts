import type { NextFunction, Request, Response } from "express";

export default function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const role = req.headers["role"];

  if (role !== "admin") {
    return res.status(403).json({
      message: "not an admin",
    });
  }
  next();
}
