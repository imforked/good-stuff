import express from "express";

const PORT = process.env.PORT || 3000;

const app = express();

app.listen(() => {
  console.log(`The server has started on port ${PORT} 🤠`);
});
