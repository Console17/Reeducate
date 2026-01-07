import type { Request, Response, NextFunction } from "express";
import type { ObjectSchema } from "joi";

export default function validate(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body || {}, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        message: error.details.map((el) => el.message),
      });
    }

    req.body = value;
    next();
  };
}
