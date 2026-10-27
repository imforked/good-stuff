import { Router } from "express";
import * as listsControllers from "../controllers/lists.controller.js";

export const listsRouter = Router();

listsRouter.post("/lists", listsControllers.createUserListController);
listsRouter.get("/lists/:listId", listsControllers.getUserListController);
listsRouter.delete("/lists/:listId", listsControllers.deleteUserListController);
listsRouter.post(
  "/lists/:listId/posts/:postId",
  listsControllers.addPostToUserListController,
);
listsRouter.delete(
  "/lists/:listId/posts/:postId",
  listsControllers.deletePostFromUserListController,
);
