import { Request, Response, NextFunction } from "express";
import { auth } from "../config/firebase";

const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decodedToken = await auth.verifyIdToken(token);
    (req as any).user = decodedToken; // Attach user info to request
    next(); // Move to the next middleware
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token", error });
  }
};

export default verifyToken;
