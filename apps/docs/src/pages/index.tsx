import { getTld } from "@repo/ui/helpers";
import { Nav } from "@repo/ui/nav";
import { useIsMounted } from "@repo/ui/hooks/useIsMounted";

const Home = () => {
  const tld = getTld();
  const isMounted = useIsMounted();

  if (!isMounted) return null;

  return (
    <div className="grid grid-rows-[auto_1fr] max-w-[1024px] w-full mx-auto p-8 h-full">
      <Nav />

      <main className="flex items-center w-full h-full">
        <div className="mb-20 md:mb-96">
          <h1 className="text-6xl font-bold mb-12">
            <span className="text-secondary">~</span> Docs{" "}
            <span className="text-secondary">~</span>
          </h1>
          <p>
            These are the docs for{" "}
            <span className="bg-secondary px-1 py-px rounded-md font-mono">
              {tld}
            </span>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
