import { Router } from "express";
import * as listsControllers from "../controllers/lists.controller.js";

export const listsRouter = Router();

listsRouter.post("/lists", listsControllers.createListController);
listsRouter.get("/lists/:listId", listsControllers.getListController);
listsRouter.post(
  "/lists/:listId/posts/:postId",
  listsControllers.addPostToUserListController,
);
