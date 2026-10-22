import express from "express";
import * as uploadsControllers from "../controllers/uploads.controller.js";

export const uploadsRouter = express.Router();

uploadsRouter.post("/uploads", uploadsControllers.createUpload);
