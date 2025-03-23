import { Request, Response } from "express";
import { auth, db } from "../config/firebase";
import { DecodedIdToken } from "firebase-admin/auth";

// ✅ Verify Google ID Token
export const login = async (req: Request, res: Response): Promise<void> => {
  const { token }: { token?: string } = req.body;

  if (!token) {
    res.status(400).json({ message: "Token is required" });
    return;
  }

  try {
    const decodedToken: DecodedIdToken = await auth.verifyIdToken(token);

    // Check if user exists in Firestore
    const userRef = db.collection("users").doc(decodedToken.uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      // Save user to Firestore
      await userRef.set({
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name || "",
        photoURL: decodedToken.picture || "",
        createdAt: new Date(),
      });
    }

    res.status(200).json({ message: "Login successful", user: decodedToken });
  } catch (error) {
    res.status(401).json({ message: "Invalid token", error });
  }
};

// ✅ Logout (Optional)
export const logout = async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: "Logout should be handled on the frontend by clearing the token." });
};
