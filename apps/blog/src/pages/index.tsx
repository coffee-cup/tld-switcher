import { getTld } from "@repo/ui/helpers";
import { Nav } from "@repo/ui/nav";
import { StatusColor } from "@repo/ui/status-color";
import { useState, useEffect } from "react";

const Home = () => {
  const tld = getTld();

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <div>
      <StatusColor tld={tld} />

      <div className="grid grid-rows-[auto_1fr] max-w-[1024px] w-full mx-auto p-8 h-full">
        <Nav />

        <main className="flex items-center w-full h-full">
          <div className="mb-20 md:mb-96">
            <h1 className="text-6xl font-bold mb-12">
              <span className="text-accent">~</span> Blog{" "}
              <span className="text-accent">~</span>
            </h1>
            <p>
              These are the docs for{" "}
              <span className="bg-accent px-1 py-px rounded-md font-mono">
                .{tld}
              </span>
            </p>
          </div>
        </main>
      </div>
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
