import express from "express";
import * as commentsControllers from "../controllers/comments.controller";

export const commentsRouter = express.Router();

commentsRouter.post(
  "/posts/:postId/comments",
  commentsControllers.createComment
);
commentsRouter.put("/comments/:commentId", commentsControllers.updateComment);
