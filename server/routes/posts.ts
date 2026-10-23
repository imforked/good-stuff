import express from "express";
import * as postsControllers from "../controllers/posts.controller.js";

export const postsRouter = express.Router();

postsRouter.post("/posts", postsControllers.createPost);
postsRouter.get("/posts", postsControllers.getPosts);
postsRouter.get("/posts/:postId", postsControllers.getPost);
postsRouter.put("/posts/:postId", postsControllers.updatePost);
postsRouter.delete("/posts/:postId", postsControllers.deletePost);
postsRouter.post("/posts/:postId/bookmark", postsControllers.bookmarkPost);
postsRouter.delete("/posts/:postId/bookmark", postsControllers.unBookmarkPost);
