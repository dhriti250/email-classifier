import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import classifyRoutes from "./routes/classifyRoutes.js";

dotenv.config();
// console.log("ENV KEY:", process.env.OPENAI_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/classify", classifyRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));