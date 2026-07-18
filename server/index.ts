import express from "express";
import { usersRouter } from "./routes/users";
import { postsRouter } from "./routes/posts";
import { errorHandler } from "./middleware";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";

const PORT = process.env.PORT || 3000;
const PATH_PREFIX = "/api";

const app = express();

app.all(`${PATH_PREFIX}/auth/*splat`, toNodeHandler(auth));

app.use(express.json());

app.use(PATH_PREFIX, usersRouter);
app.use(PATH_PREFIX, postsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`The server has started on port ${PORT} 🤠`);
});
