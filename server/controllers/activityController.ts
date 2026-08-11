import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware.js";
import { activityLog } from "../models/activityLog.js";

// get all activity
// GET /api/activity
export const getActivity = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const activity = await activityLog
      .find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("relatedPost", "content");
    res.json(activity);
  } catch (error: any) {
    res.status(500).json({ message: error?.message || "Server error" });
  }
};
