import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { cn, getTld } from "@repo/ui/helpers";
import { NextSeo } from "next-seo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "../global.css";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
