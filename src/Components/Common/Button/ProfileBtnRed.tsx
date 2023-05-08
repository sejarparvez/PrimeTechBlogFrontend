import React, { ReactNode } from "react";

interface ProfileBtnRedProps {
  Name: string;
  icon?: ReactNode;
}

const ProfileBtnRed: React.FC<ProfileBtnRedProps> = ({ Name, icon }) => {
  return (
    <button className="flex items-center justify-center gap-2 rounded-md bg-red-600 px-2 py-1 text-sm font-bold text-white md:my-0 md:h-12 md:w-36 md:px-0 md:text-lg">
      {Name}
      {icon}
    </button>
  );
};

export default ProfileBtnRed;
