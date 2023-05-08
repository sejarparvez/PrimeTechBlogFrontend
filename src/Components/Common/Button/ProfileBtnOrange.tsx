import React, { ReactNode } from "react";

interface ProfileBtnGreenProps {
  Name: string;
  icon?: ReactNode;
}

const ProfileBtnGreen: React.FC<ProfileBtnGreenProps> = ({ Name, icon }) => {
  return (
    <button className="flex items-center justify-center gap-2 rounded-md bg-orange-600 px-2 py-1 text-sm font-bold text-white md:my-0 md:h-12 md:w-36 md:px-0 md:text-lg">
      {Name}
      {icon}
    </button>
  );
};

export default ProfileBtnGreen;
