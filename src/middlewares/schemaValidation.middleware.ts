import { Request, Response, NextFunction } from "express";
import { AnySchema } from "yup";

const schemaValidationMiddleware =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: object = req.body;

      const validatedData = await schema.validate(data);

      req.body = validatedData;

      next();
    } catch (err: any) {
      return res.status(400).json({ message: err.errors?.join(", ") });
    }
  };

export { schemaValidationMiddleware };
