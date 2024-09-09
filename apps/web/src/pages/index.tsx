import { getTld } from "@repo/ui/helpers";
import { useIsMounted } from "@repo/ui/hooks/useIsMounted";
import { Button } from "@repo/ui/button";

const Home = () => {
  const tld = getTld();

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <div className="grid grid-rows-[auto_1fr] max-w-[1024px] w-full mx-auto p-8 h-full">
      {/* <Nav /> */}

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
