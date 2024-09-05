import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTld = () => {
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  return hostname === "localhost"
    ? "localhost"
    : hostname.split(".").pop() || "";
};

export const getRootDomain = () => {
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";

  if (hostname === "localhost") {
    return hostname;
  }

  const parts = hostname.split(".");
  const tld = parts.pop() || "";
  const domain = parts.pop() || "";
  return `${domain}.${tld}`;
};

export const createSubdomain = (subdomain: string) => {
  const tld = getTld();
  return `${subdomain}.${tld}`;
};

const rootDomain = getRootDomain();

const isLocalhost = rootDomain === "localhost";

export const homeDomain = isLocalhost ? "http://localhost:6060" : rootDomain;
console.log("home domain:", homeDomain);

export const blogDomain = isLocalhost
  ? "http://localhost:6061"
  : createSubdomain("blog");
console.log("blog domain:", blogDomain);

export const docsDomain = isLocalhost
  ? "http://localhost:6062"
  : createSubdomain("docs");
console.log("docs domain:", docsDomain);
