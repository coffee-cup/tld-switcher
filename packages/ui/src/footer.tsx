import React from "react";
import { getTld } from "./helpers";

export const Footer = () => {
  const tld = getTld();

  return (
    <footer className="col-start-2 py-8 px-8">
      {tld === "red" && (
        <a
          href={`https://railway.blue`}
          className="text-blue-400 hover:underline"
        >
          Go to Railway Blue
        </a>
      )}

      {tld === "blue" && (
        <a
          href={`https://railway.red`}
          className="text-red-400 hover:underline"
        >
          Go to Railway Red
        </a>
      )}

      {tld === "localhost" && (
        <p className="text-sm text-gray-500">localhost</p>
      )}
    </footer>
  );
};
