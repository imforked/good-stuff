import express from "express";
import * as postsControllers from "../controllers/posts.controller";

export const postsRouter = express.Router();

postsRouter.post("/create-post", postsControllers.createPost);
