import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { redis } from "./redis";

const app = new Hono();

app.get("/", async (c) => {
  const host = c.req.header("host");
  console.log("Host: ", host);

  const ping = await redis.ping();

  return c.json({
    redisPing: ping,
    host,
  });
});

const port = 6070;
const hostname = "0.0.0.0";
console.log(`Server is running http://${hostname}:${port}`);

serve({
  fetch: app.fetch,
  port,
  hostname,
});
