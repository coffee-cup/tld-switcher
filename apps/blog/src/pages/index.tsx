import { cn, getTld } from "@repo/ui/helpers";
import { Nav } from "@repo/ui/nav";
import { Footer } from "@repo/ui/footer";
import { StatusColor } from "@repo/ui/status-color";
import { useState, useEffect } from "react";

const Home = () => {
  const tld = getTld();

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  const color =
    tld === "blue"
      ? "bg-blue-200"
      : tld === "red"
        ? "bg-red-200"
        : "bg-gray-200";

  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] grid-cols-[auto_minmax(0,1024px)_auto] min-h-screen">
      <StatusColor tld={tld} className="col-span-3" />

      <Nav className="col-start-2 px-8" />

      <main className="flex items-center w-full h-full col-start-2 px-8">
        <div className="mb-20 md:mb-96 h-[228px]">
          <h1 className="text-6xl font-bold mb-12">Blog</h1>
          <p>
            These are the docs for{" "}
            <span
              className={cn("bg-accent px-1 py-px rounded-md font-mono", color)}
            >
              .{tld}
            </span>
          </p>
        </div>
      </main>

      <Footer />
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
