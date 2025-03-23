import admin from "firebase-admin";
import * as serviceAccount from "../../frebase-adminsdk.json"; // Path to your service account JSON

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const auth = admin.auth(); // Firebase Authentication
export const db = admin.firestore(); // Firestore Database
