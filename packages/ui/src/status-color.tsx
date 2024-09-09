import React from "react";
import { cn } from "./helpers";

export const StatusColor = ({ tld }: { tld?: string }) => {
  const color =
    tld === "blue"
      ? "bg-blue-200"
      : tld === "red"
        ? "bg-red-200"
        : "bg-gray-200";
  return <div className={cn("h-6 w-full", color)} />;
};
