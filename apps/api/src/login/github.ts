import { deleteCookie, setCookie } from "hono/cookie";
import { getAndValidateStateData, getStateString } from "../authState";
import { app } from "../hono";

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

if (!githubClientId || !githubClientSecret) {
  throw new Error("GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET must be set");
}

app.get("/logout", (c) => {
  deleteCookie(c, "token");

  const next = c.req.query("next") ?? getDefaultNext(c.req.url);

  console.log("logout:", c.req.header("host"));

  return c.redirect(next);
});

// Redirects to GitHub for authentication
app.get("/login/github", async (c) => {
  const host = c.req.header("host");
  const next = c.req.query("next");

  const protocol = host?.includes("localhost") ? "http" : "https";
  const redirectUri = `${protocol}://${host}/login/github/callback`;

  console.log("login/github:", c.req.header("host"), redirectUri);

  const state = await getStateString({
    next,
    redirectUri,
  });

  const url = `https://github.com/login/oauth/authorize?client_id=${githubClientId}&redirect_uri=${redirectUri}&state=${state}`;

  return c.redirect(url);
});

app.get("/login/github/callback", async (c) => {
  const code = c.req.query("code");
  const state = c.req.query("state");

  const stateData = await getAndValidateStateData(state ?? "");
  if (stateData == null) {
    return c.json({ message: "Invalid state" }, 400);
  }

  const redirectUri = stateData.redirectUri;

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: githubClientId,
      client_secret: githubClientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json();

  if (data.error) {
    return c.json({ message: data.error }, 400);
  }

  const accessToken = data.access_token;

  const next = stateData.next ?? getDefaultNext(stateData.redirectUri ?? "");
  console.log("NEXT", next);

  // Set a cookie with the access token
  setCookie(c, "token", accessToken, {
    ...(redirectUri.includes("localhost") ? { domain: "localhost" } : {}),
    httpOnly: true,
    sameSite: "Lax",
    secure: false,
  });

  return c.redirect(next);
});

const getDefaultNext = (redirectUri: string) => {
  if (redirectUri.includes("localhost")) {
    return "http://localhost:6060";
  }

  if (redirectUri.includes("railway.blue")) {
    return "https://railway.blue";
  }

  return "https://railway.red";
};

const getCookieDomain = (redirectUri: string) => {
  if (redirectUri.includes("localhost")) {
    return "localhost";
  }

  if (redirectUri.includes("railway.blue")) {
    return "railway.blue";
  }

  return "railway.red";
};

export const getGitHubUser = async (accessToken: string) => {
  const response = await fetch("https://api.github.com/user", {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  return data;
};
