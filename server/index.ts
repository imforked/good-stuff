import express from "express";
import { usersRouter } from "./routes/users";
import { errorHandler } from "./middleware";

const PORT = process.env.PORT || 3000;
const PATH_PREFIX = "/api";

const app = express();

app.use(express.json());

app.use(PATH_PREFIX, usersRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`The server has started on port ${PORT} 🤠`);
});
