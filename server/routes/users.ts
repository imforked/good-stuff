import express from "express";
import * as usersControllers from "../controllers/users.controller";

export const usersRouter = express.Router();

usersRouter.post("/create-profile", usersControllers.createProfile);
usersRouter.put("/update-profile", usersControllers.updateProfile);
