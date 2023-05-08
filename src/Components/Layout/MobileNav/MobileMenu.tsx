import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../UserContext";

export default function MobileMenu() {
  const { userInfo } = useContext(UserContext);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const id = userInfo?.id;
  const UserName = userInfo?.name;

  const HandleClick = () => {
    setIsNavOpen((prev) => !prev);
  };

  return (
    <div>
      <div
        id="menu-btn"
        className={
          isNavOpen ? "open hamburger md:hidden" : "hamburger md:hidden"
        }
        onClick={HandleClick}
      >
        <span className="hamburger-top"></span>
        <span className="hamburger-middle"></span>
        <span className="hamburger-bottom"></span>
      </div>
      <div
        className={`fixed top-[4.5rem] right-0 z-50 h-screen w-full transform bg-white transition duration-300 ease-out dark:bg-black ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mt-6 flex flex-col items-center gap-4 text-xl">
          <Link to={"/posts/technology"}>
            <span onClick={HandleClick}>Technology</span>
          </Link>
          <Link to={"/posts/game"}>
            <span onClick={HandleClick}>Game</span>
          </Link>
          <Link to={"/posts/robotics"}>
            <span onClick={HandleClick}>Robotics</span>
          </Link>
          <Link to={"/posts/ai"}>
            <span onClick={HandleClick}>AI</span>
          </Link>
          <Link to={"/posts/bussiness"}>
            <span onClick={HandleClick}>Bussiness</span>
          </Link>
          <Link to={"/posts/phone"}>
            <span onClick={HandleClick}>Smart Phone</span>
          </Link>
          <Link to={"/posts/computer"}>
            <span onClick={HandleClick}>Computer</span>
          </Link>
          <Link to={"/posts/lifestyle"}>
            <span onClick={HandleClick}>Life Style</span>
          </Link>
          <Link to={"/posts/laptop"}>
            <span onClick={HandleClick}>Laptop</span>
          </Link>

          <span onClick={HandleClick}>
            {UserName ? (
              <Link to={`/users/${id}`}>
                <button className="rounded-full border-2 border-lime bg-black px-10 py-1.5 text-xl font-bold text-white">
                  Profile
                </button>
              </Link>
            ) : (
              <Link to={"/login"}>
                <button className="rounded-full border-2 border-lime bg-black px-10 py-1.5 text-xl font-bold text-white">
                  Log In
                </button>
              </Link>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
