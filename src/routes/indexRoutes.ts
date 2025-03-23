import { Router } from "express";
import { homePage } from "../controllers/indexControllers";
import verifyToken from "../middileware/authMiddileware";

const router = Router();

router.get("/",verifyToken, homePage);

export default router;
