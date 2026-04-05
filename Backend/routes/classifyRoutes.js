import express from "express";
import { classifyEmail } from "../controllers/classifyController.js";

const router = express.Router();

router.post("/", classifyEmail);

export default router;