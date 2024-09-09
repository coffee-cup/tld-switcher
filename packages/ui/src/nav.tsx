import { ChevronsLeftRightEllipsis } from "lucide-react";
import { type ClassValue, clsx } from "clsx";
// import { blogDomain, docsDomain, homeDomain } from "./helpers";

export const Nav = () => {
  return (
    <nav className="w-full flex items-center justify-between py-8">
      <ChevronsLeftRightEllipsis className="text-primary" size={32} />

      {/* <ul className="flex items-center gap-6 font-semibold">
        <li>
          <a href={homeDomain} className="hover:text-primary hover:underline">
            home
          </a>
        </li>

        <li>
          <a href={blogDomain} className="hover:text-primary hover:underline">
            blog
          </a>
        </li>

        <li>
          <a href={docsDomain} className="hover:text-primary hover:underline">
            docs
          </a>
        </li>
      </ul> */}
    </nav>
  );
};
