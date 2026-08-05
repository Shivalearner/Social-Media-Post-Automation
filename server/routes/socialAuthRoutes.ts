import { Express } from "express";
import {
  generateAuthUrl,
  syncAccounts,
} from "../controllers/socialAuthController.js";
import { protect } from "../middleware/authMiddleware.js";

const socialAuthRouter = Express.Router();

socialAuthRouter.get("/:platform/url", protect, generateAuthUrl);
socialAuthRouter.get("/sync", protect, syncAccounts);

export default socialAuthRouter;
