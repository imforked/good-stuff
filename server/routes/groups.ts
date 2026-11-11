import { Router } from "express";
import * as groupsController from "../controllers/groups.controller.js";

export const groupsRouter = Router();

groupsRouter.post("/groups", groupsController.createGroupController);
groupsRouter.get("/groups", groupsController.getGroupsController);
groupsRouter.get("/groups/:groupId", groupsController.getGroupController);
