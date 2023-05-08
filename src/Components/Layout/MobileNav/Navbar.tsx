import { Link } from "react-router-dom";
import Toggle from "../Toggle";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <div
      className="fixed top-0 z-50 w-screen items-center justify-center border-b-2 bg-white bg-opacity-30 px-8 py-3 font-bold backdrop-blur-xl dark:border-0 dark:bg-black dark:bg-opacity-30 dark:backdrop-blur-xl md:py-4 md:px-16"
      id="Home"
    >
      <div className="flex  items-center justify-between">
        <div className="flex cursor-pointer items-center gap-4">
          <Link to={"/"}>
            <div className="font-serif text-3xl">Logo</div>
          </Link>
        </div>

        <div className="mt-2 flex items-center gap-9 md:hidden">
          <div>
            <Toggle />
          </div>
          <MobileMenu />
        </div>
      </div>
    </div>
  );
}
