import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './constants';

interface UserPayload {
  _id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}

export const validateDataMiddleWare =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({ errors: error.errors });
      }

      return res.status(500).json({ error: error?.message });
    }
  };

export const authenticateUser = (
  req: Request<{ user: any }, {}, {}, {}, {}>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.session as any;
    if (!token) {
        throw new Error('not an authenticated user');
        
        // req.user = { _id: '6637c81015a789a60ee10296', email: "1@2.com" };
        // next()
        // return
    }
    const payload = jwt.verify(token, JWT_SECRET!) as UserPayload;
    req.user = payload;

    next();
  } catch (error: any) {
      res.status(400).send({ error: error?.message });
  }
};
