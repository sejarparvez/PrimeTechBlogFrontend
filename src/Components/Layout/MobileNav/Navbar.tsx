import Toggle from "../Toggle";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <nav
      className="relative z-50 w-full border-b-2 border-pink bg-white dark:bg-black"
      id="home"
    >
      <div className="mx-auto flex px-4 h-16  items-center justify-between md:px-8">
        <div className="font-bold text-xl">Logo</div>
        <div className=" scale-75">
          <Toggle />
        </div>
        <div className="lg:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
