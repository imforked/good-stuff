import { Router } from "express";

export const listsRouter = Router();

listsRouter.post("/lists");
listsRouter.get("/lists/:postId");
