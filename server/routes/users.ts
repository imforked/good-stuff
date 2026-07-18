import express from "express";
import * as usersControllers from "../controllers/users.controller";

export const usersRouter = express.Router();

usersRouter.post("/profile", usersControllers.createProfile);
usersRouter.put("/profile", usersControllers.updateProfile);
usersRouter.delete("/profile", usersControllers.deleteProfile);
usersRouter.get("/profile", usersControllers.getProfile);
