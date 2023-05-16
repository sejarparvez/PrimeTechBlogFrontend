import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../UserContext";

export default function MobileMenu() {
  const { userInfo } = useContext(UserContext);
  const [NavOpen, setNavOpen] = useState(false);

  const id = userInfo?.id;
  const UserName = userInfo?.name;

  const HandleClick = () => {
    setNavOpen((prev) => !prev);
  };

  return (
    <div className="lg:hidden">
      <div
        className={`z-40 flex flex-col gap-1 p-3 duration-300 ${
          NavOpen ? "rotate-[360deg]" : ""
        }`}
        onClick={HandleClick}
      >
        <span
          className={`h-0.5 w-6 bg-pink duration-300 ${
            NavOpen ? " translate-y-1.5 rotate-45 " : ""
          } `}
        ></span>
        <span
          className={`h-0.5 w-6 bg-pink duration-300  ${
            NavOpen ? "hidden" : ""
          } `}
        ></span>
        <span
          className={`h-0.5 w-6 bg-pink duration-300 ${
            NavOpen ? "-rotate-45 duration-300 ease-in-out" : ""
          } `}
        ></span>
      </div>
      <div
        className={`fixed top-0 right-0 -z-10 h-screen w-full transform  bg-slate-200 transition duration-300 ease-out dark:bg-black ${
          NavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mt-24 flex flex-col items-center gap-4 text-xl [&>*]:cursor-pointer hover:[&>*]:text-pink">
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
