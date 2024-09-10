import { serve } from "@hono/node-server";
import { redis } from "./redis";
import { app } from "./hono";
import { getCookie } from "hono/cookie";
import "./login/github";
import { getGitHubUser } from "./login/github";

app.get("/", async (c) => {
  const host = c.req.header("host");
  console.log("Host: ", host);

  const ping = await redis.ping();

  return c.json({
    redisPing: ping,
    host,
  });
});

app.get("/user", async (c) => {
  const token = getCookie(c, "token");

  console.log("TOKEN", token);
  if (!token) {
    return c.json({ error: "No token" }, 401);
  }

  const userData = await getGitHubUser(token);
  return c.json(userData);
});

const port = 6070;
const hostname = "0.0.0.0";
console.log(`Server is running http://${hostname}:${port}`);

serve({
  fetch: app.fetch,
  port,
  hostname,
});
