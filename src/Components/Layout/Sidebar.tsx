import Arrow from "@iconscout/react-unicons/icons/uil-arrow-right";
import Search from "@iconscout/react-unicons/icons/uil-search";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Toggle from "./Toggle";

function Sidebar() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [showMorePopup, setShowMorePopup] = useState(false);

  const toggleMorePopup = () => {
    setShowMorePopup(!showMorePopup);
  };

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/profile`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const userInfo = await response.json();
        setUserInfo(userInfo);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUserInfo();
  }, [setUserInfo]);

  const id = userInfo?.id;
  const UserName = userInfo?.name;

  return (
    <div className="flex h-full flex-col items-center justify-between rounded-2xl bg-white py-3 px-4 transition-all duration-700 dark:bg-black">
      <div className="flex flex-col">
        <Link to={"/"}>
          <div className="text-4xl font-bold">Logo</div>
        </Link>
        <div className="flex items-center justify-center py-4">
          <Toggle />
        </div>
      </div>
      <div className="flex w-full max-w-2xl flex-col items-center justify-between">
        <div className="mb-6 flex w-full max-w-xs items-center justify-between rounded-lg bg-gray-100 px-2 py-1">
          <input
            type="text"
            className="mr-2 w-full bg-transparent focus:outline-none"
            placeholder="Search"
          ></input>
          <button className="rounded-full bg-black py-1 px-2 text-white">
            <Search size={20} />
          </button>
        </div>
        <div className="flex w-full max-w-xs flex-col gap-1.5 text-xl">
          <Link to={"/posts/technology"}>
            <span>Technology</span>
          </Link>
          <Link to={"/posts/game"}>
            <span>Game</span>
          </Link>
          <Link to={"/posts/robotics"}>
            <span>Robotics</span>
          </Link>
          <Link to={"/posts/lifestyle"}>
            <span>Lifestyle</span>
          </Link>
          <Link to={"/posts/ai"}>
            <span>AI</span>
          </Link>
          <Link to={"/posts/bussiness"}>
            <span>Business</span>
          </Link>
          <Link to={"/posts/phone"}>
            <span>Smart Phone</span>
          </Link>
          <Link to={"/posts/computer"}>
            <span>Computer</span>
          </Link>
          <Link to={"/posts/laptop"}>
            <span>Laptop</span>
          </Link>

          <span
            className="flex cursor-pointer items-center gap-2"
            onClick={toggleMorePopup}
          >
            More <Arrow />
          </span>
        </div>
      </div>

      {/* Sliding Popup */}
      <div
        className={`fixed top-0 left-0 h-full w-full transform transition-all duration-300 ease-in-out ${
          showMorePopup ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="absolute h-full w-full bg-gray-800 opacity-50"></div>
        <div className="absolute left-0 z-50 h-full w-60 bg-white p-6 dark:bg-black">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">More Options</h3>
            <button onClick={toggleMorePopup}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <ul className="mt-4 space-y-2">
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
            <li>Option 4</li>
            <li>Option 5</li>
          </ul>
        </div>
      </div>

      <div className="mt-4">
        {UserName ? (
          <Link to={`/users/${id}`}>
            <button className="rounded-full border-2 border-pink bg-black px-10 py-1.5 text-xl font-bold text-white">
              Profile
            </button>
          </Link>
        ) : (
          <Link to={"/login"}>
            <button className="rounded-full border-2 border-pink bg-black px-10 py-1.5 text-xl font-bold text-white">
              Log In
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
