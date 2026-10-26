import express from "express";
import { usersRouter } from "./routes/users.js";
import { postsRouter } from "./routes/posts.js";
import { errorHandler } from "./middleware/index.js";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import cookieParser from "cookie-parser";
import { isAllowedOrigin } from "./constants/allowedOrigins.js";
import { uploadsRouter } from "./routes/uploads.js";
import { listsRouter } from "./routes/lists.js";

const PORT = process.env.PORT || 3000;
const PATH_PREFIX = "/api";

const app = express();

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(cookieParser());

app.all(`${PATH_PREFIX}/auth/*splat`, toNodeHandler(auth));

app.use(express.json());

app.use(PATH_PREFIX, usersRouter);
app.use(PATH_PREFIX, postsRouter);
app.use(PATH_PREFIX, uploadsRouter);
app.use(PATH_PREFIX, listsRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`The server has started on port ${PORT} 🤠`);
});
