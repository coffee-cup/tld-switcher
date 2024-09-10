import React, { useEffect, useState } from "react";
import { getTld } from "@repo/ui/helpers";
import { Nav } from "@repo/ui/nav";
import { StatusColor } from "@repo/ui/status-color";
import { useUser } from "../hooks/useUser";
import { Login } from "../components/Login";
import { GitHubUser } from "../components/GitHubUser";
import { getApiUrl } from "../api";

const Home = () => {
  const tld = getTld();

  const { isError, data } = useUser();
  console.log("data", data, isError);

  const isMounted = useIsMounted();
  if (!isMounted) return null;

  return (
    <div className="grid grid-rows-[auto_auto_1fr_auto] grid-cols-[auto_minmax(0,1024px)_auto] min-h-screen">
      <StatusColor tld={tld} className="col-span-3" />

      <Nav className="col-start-2 px-8" />

      <main className="flex items-center w-full h-full col-start-2 px-8">
        <div className="mb-20 md:mb-96">
          <h1 className="text-6xl font-bold mb-12">.{tld}</h1>

          {isError && <Login />}

          {data && (
            <div className="grid gap-6">
              <GitHubUser {...data} />

              <a
                href={`${getApiUrl()}/logout`}
                className="text-sm text-gray-500 hover:opacity-70"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </main>

      <footer className="col-start-2 py-8 px-8">
        {tld === "red" && (
          <a
            href="https://railway.blue"
            className="text-blue-400 hover:underline"
          >
            Go to Railway Blue
          </a>
        )}

        {tld === "blue" && (
          <a
            href="https://railway.red"
            className="text-red-400 hover:underline"
          >
            Go to Railway Red
          </a>
        )}

        {tld === "localhost" && (
          <p className="text-sm text-gray-500">localhost</p>
        )}
      </footer>
      {/* </div> */}
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
