import Post from "@iconscout/react-unicons/icons/uil-edit";
import Facebook from "@iconscout/react-unicons/icons/uil-facebook";
import Github from "@iconscout/react-unicons/icons/uil-github";
import Website from "@iconscout/react-unicons/icons/uil-globe";
import Instagram from "@iconscout/react-unicons/icons/uil-instagram";
import Linkedin from "@iconscout/react-unicons/icons/uil-linkedin";
import Pen from "@iconscout/react-unicons/icons/uil-pen";
import Power from "@iconscout/react-unicons/icons/uil-power";
import Telegram from "@iconscout/react-unicons/icons/uil-telegram";
import Twitter from "@iconscout/react-unicons/icons/uil-twitter";
import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import ProfileBtnGreen from "../Common/Button/ProfileBtnGreen";
import ProfileBtnOrange from "../Common/Button/ProfileBtnOrange";
import ProfileBtnRed from "../Common/Button/ProfileBtnRed";
import MyPost from "./MyPost";

interface User {
  Image: string;
  Name: string;
  Email: string;
  Bio: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    telegram?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
}

function Profile() {
  const userInfo = useContext(UserContext);

  const { id } = useParams();

  const [user, setUser] = useState<User>({
    Image: "",
    Name: "",
    Email: "",
    Bio: "",
    socialLinks: {},
  });

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(
        `${process.env.REACT_APP_API}/profile/${id}`
      );
      const data = await response.json();
      setUser(data);
    }
    fetchUser();
  }, [id]);

  const [redirect, setRedirect] = useState(false);
  async function logout(ev: { preventDefault: () => void }) {
    ev.preventDefault();
    if (window.confirm("Are you sure you want to log out?")) {
      const response = await fetch(`${process.env.REACT_APP_API}/logout`, {
        credentials: "include",
        method: "POST",
      });

      if (response.ok) {
        userInfo.setUserInfo({ id: "", email: "", name: "" });

        setRedirect(true);
      } else {
        alert("wrong credentials");
      }
    }
  }
  const facebook = user.socialLinks?.facebook;
  const twitter = user.socialLinks?.twitter;
  const instagram = user.socialLinks?.instagram;
  const telegram = user.socialLinks?.telegram;
  const linkedin = user.socialLinks?.linkedin;
  const github = user.socialLinks?.github;
  const website = user.socialLinks?.website;

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex flex-col md:gap-10">
      <div className="flex flex-col gap-10">
        <div className="flex h-[28rem] w-full flex-col items-center justify-between gap-4 rounded-lg bg-gradient-to-r from-cyan-400  to-blue-700 pb-4 md:h-60 md:flex-row md:gap-0 md:pb-0 md:pr-16 md:pl-8">
          <div>
            <img
              src={user.Image}
              className="h-52 min-w-full rounded-lg shadow-md md:h-56 md:w-[18rem]"
              alt="Profile pictured"
            />
          </div>
          <div className="flex flex-col gap-6 px-4 md:px-0">
            <div className="text-4xl font-bold text-white">{user.Name}</div>
            <div className="text-xl">{user.Email}</div>
          </div>
          {user.Email === userInfo.userInfo.email && (
            <div className="flex items-center gap-2 md:flex-col md:gap-6">
              <div className="flex items-center justify-center">
                <Link to={"/newpost"}>
                  <ProfileBtnGreen Name="New Post" icon={<Post />} />
                </Link>
              </div>

              <div>
                <Link to={`/users/edit/${id}`}>
                  <ProfileBtnOrange Name="Edit Profile" icon={<Pen />} />
                </Link>
              </div>
              <div
                className="flex items-center justify-center"
                onClick={logout}
              >
                <ProfileBtnRed Name="Logout" icon={<Power />} />
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center gap-10 rounded-3xl bg-white p-6 dark:bg-black md:my-10 md:mx-20 ">
          <div className="md:text-xl">{user.Bio}</div>
          <div className="flex flex-col items-center justify-center gap-6">
            <div className="text-3xl font-bold">Let's Connect</div>
            <div className="flex gap-4">
              <Link
                to={facebook || ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                {facebook && <Facebook />}
              </Link>
              <Link
                to={twitter || ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                {twitter && <Twitter />}
              </Link>
              <Link
                to={instagram || ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                {instagram && <Instagram />}
              </Link>
              <Link
                to={telegram || ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                {telegram && <Telegram />}
              </Link>
              <Link
                to={linkedin || ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                {linkedin && <Linkedin />}
              </Link>
              <Link to={github || ""} target="_blank" rel="noopener noreferrer">
                {github && <Github />}
              </Link>
              <Link
                to={website || ""}
                target="_blank"
                rel="noopener noreferrer"
              >
                {website && <Website />}
              </Link>
            </div>
          </div>
        </div>
        <div>
          <div className=" flex md:mt-10">
            <span className="mx-auto px-3 text-2xl font-bold md:px-6 md:text-4xl">
              <span> Every Article Published By </span>
              {user.Name}
              <span className="text-3xl font-extrabold md:text-5xl">
                {user.Name}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className="mx-auto mt-10 md:mt-20">
          {id && <MyPost userId={id} />}
        </div>
      </div>
    </div>
  );
}

export default Profile;
