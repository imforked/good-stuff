import { ErrorRequestHandler } from "express";
import { ERROR } from "../constants";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  res.status(500).json({ error: ERROR.SOMETHING_WENT_WRONG });
};
