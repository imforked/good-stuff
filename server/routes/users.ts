import express from "express";
import * as usersControllers from "../controllers/users.controller";

export const usersRouter = express.Router();

usersRouter.post("/create-account", usersControllers.createAccount);
