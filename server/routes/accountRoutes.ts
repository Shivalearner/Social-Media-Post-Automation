import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addAccount,
  disconnectAccount,
  getAccounts,
} from "../controllers/accountControllers.js";
const accountRouter = express.Router();
accountRouter.get("/", protect, getAccounts);
accountRouter.post("/", protect, addAccount);
accountRouter.delete("/", protect, disconnectAccount);

export default accountRouter;
