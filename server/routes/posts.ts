import express from "express";
import * as postsControllers from "../controllers/posts.controller";

export const postsRouter = express.Router();

postsRouter.post("/posts", postsControllers.createPost);
postsRouter.get("/posts/:postId", postsControllers.getPost);
