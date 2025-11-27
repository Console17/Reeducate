import type { NextFunction, Request, Response } from "express";

export default function logMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("fine");

  next();
}
