import { Request, Response } from "express";

export const profile = (req: Request, res: Response) => {
  res.send("Profile Page");
}