import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { cn, getTld } from "@repo/ui/helpers";

import "../global.css";
import { NextSeo } from "next-seo";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title={`TLD Switch ${getTld()}`}
        description="Testing bed for switching from a .app to a .com domain"
      />

      <div
        className={cn(
          inter.className,
          "grid min-h-screen bg-background text-text"
        )}
      >
        <Component {...pageProps} />
      </div>
    </>
  );
}
