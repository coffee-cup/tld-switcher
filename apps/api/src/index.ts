import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  const host = c.req.header("host");
  console.log("Host: ", host);

  return c.text("Hello Hono!");
});

const port = 6070;
const hostname = "0.0.0.0";
console.log(`Server is running http://${hostname}:${port}`);

serve({
  fetch: app.fetch,
  port,
  hostname,
});
