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
    <div>
      <StatusColor tld={tld} />

      <div className="grid grid-rows-[auto_1fr] max-w-[1024px] w-full mx-auto p-8 h-full">
        <Nav />

        <main className="flex items-center w-full h-full">
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
