import { Hono } from "hono";
import { cors } from "hono/cors";

export const app = new Hono();

app.use(
  "/*",
  cors({
    origin: [
      "http://localhost:6060",
      "https://railway.blue",
      "https://railway.red",
    ],
    credentials: true,
  })
);
