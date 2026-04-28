import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Express Request object so TypeScript knows we are attaching a 'user' to it
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; role: string };
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Look for the token inside the cookies
    const token = req.cookies.taskflow_token;

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token provided' });
    }

    // 2. Verify the token's digital signature using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string; role: string };

    // 3. Attach the decoded payload (userId and role) to the request object
    req.user = decoded;

    // 4. Give the green light to move on to the actual route
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    // If the token is expired or tampered with, reject the request
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
};
