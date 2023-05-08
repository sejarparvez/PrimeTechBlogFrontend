import React from "react";

interface ButtonProps {
  Name: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<ButtonProps> = ({ Name, onClick }) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    onClick(event);
  };

  return (
    <button
      className="flex items-center justify-center rounded bg-black py-2 px-4 font-bold text-white dark:bg-gray-700"
      onClick={handleClick}
    >
      {Name}
    </button>
  );
};

export default Button;
