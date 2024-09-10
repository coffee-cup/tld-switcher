import { getTld } from "@repo/ui/helpers";

export const getApiUrl = () => {
  const tld = getTld();

  if (tld === "localhost") {
    return "http://localhost:6070";
  }

  return `https://api.railway.${tld}`;
};
