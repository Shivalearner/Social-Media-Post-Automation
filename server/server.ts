import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db.js";

const app = express();

// Database connection
await connectDB();

// Middleware
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is Live!");
});

// Global Error Handler
app.use((err: any, res: Response, _req: Request, _next: NextFunction) => {
  console.error(err);
  res.status(500).send(err?.response?.data?.message || err?.message);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
