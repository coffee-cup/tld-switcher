import React, { useEffect, useState } from "react";
import { getTld } from "@repo/ui/helpers";
import { Button } from "@repo/ui/button";
import { Nav } from "@repo/ui/nav";

const Home = () => {
  const tld = getTld();

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <div className="grid grid-rows-[auto_1fr] max-w-[1024px] w-full mx-auto p-8 h-full">
      <Nav />

      <main className="flex items-center w-full h-full">
        <div className="mb-20 md:mb-96">
          <h1 className="text-6xl font-bold mb-12">{tld}</h1>
          <p>todo...</p>
        </div>
      </main>
    </div>
  );
};

export default Home;

export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};
