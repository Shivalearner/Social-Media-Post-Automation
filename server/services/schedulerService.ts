import cron from "node-cron";
import { Post } from "../models/Post.js";
import { Account } from "../models/Account.js";
import zernio from "../config/zernio.js";
import { activityLog } from "../models/activityLog.js";

export const initScheduler = () => {
  cron.schedule("* * * * *  ", async () => {
    try {
      const now = new Date();
      const postsToPublish = await Post.find({
        status: "scheduled",
        scheduledFor: { $lte: now },
      });

      for (const post of postsToPublish) {
        try {
          const accounts = await Account.find(<any>{
            user: post.user,
            platform: { $in: post.platforms },
            status: "connected",
            zernioAccountId: { $exists: true },
          });
          if (accounts.length === 0) {
            console.log(
              `No connected Zernio accounts found for post ${post._id}`,
            );
            continue;
          }
          const zernioplatforms = accounts.map((acc) => ({
            tform: acc.platform as any,
            accountId: acc.zernioAccountId!,
          }));

          const payload = {
            content: post.content,
            publishNow: true,
            ...(post.mediaUrl
              ? {
                  mediaItems: [
                    { type: post.mediaType || "image", url: post.mediaUrl },
                  ],
                }
              : {}),
            platforms: zernioplatforms,
          };
          console.log(
            `Publishing post ${post._id} to Zernio with media: ${post.mediaUrl || "none"}`,
          );

          const response = await zernio.posts.createPost({ body: payload });

          const publishedPost = (response.data as any)?.post || response.data;

          if (!publishedPost) {
            throw new Error("Failed to get post object from Zernio response");
          }

          console.log(
            `Zernio post created:${publishedPost._id || publishedPost.id}`,
          );

          post.status = "published";
          await post.save();

          await activityLog.create({
            user: post.user,
            actionType: "POST_PUBLISHED",
            description: `Published post to ${accounts.map((a) => a.platform).join(", ")}`,
            relatedPost: post._id,
          });
        } catch (err: any) {
          console.log(
            `Failed to publish post ${post._id}:`,
            err?.response?.data || err?.message,
          );
          post.status = "failed";
          await post.save();
        }
      }
      if (postsToPublish.length > 0) {
        console.log(
          `Evaluated ${postsToPublish.length} posts at ${now.toISOString()}`,
        );
      }
    } catch (error) {
        console.log("Error in scheduler:", error)
    }
  });
  console.log("Scheduler service initialized")
};
