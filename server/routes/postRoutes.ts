import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  generatePost,
  getGeneration,
  getPosts,
  schedulePost,
} from "../controllers/postController.js";
import { upload } from "../config/multer.js";

const postRouter = express.Router();

postRouter.get("/", protect, getPosts);

postRouter.get("/generations", protect, getGeneration);

postRouter.post("/", protect, upload.single("media"), schedulePost);

postRouter.post("/generate", protect, generatePost);

export default postRouter;
