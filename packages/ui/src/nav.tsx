import { ChevronsLeftRightEllipsis } from "lucide-react";
import { blogDomain, cn, docsDomain, homeDomain } from "./helpers";

export const Nav = ({ className }: { className?: string }) => {
  return (
    <nav
      className={cn("w-full flex items-center justify-between py-8", className)}
    >
      <ChevronsLeftRightEllipsis className="text-primary" size={32} />

      <ul className="flex items-center gap-6 font-semibold">
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
      </ul>
    </nav>
  );
};
