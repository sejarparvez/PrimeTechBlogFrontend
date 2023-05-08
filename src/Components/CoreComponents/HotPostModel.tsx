import React from "react";
import { Link } from "react-router-dom";

interface Props {
  cover: string;
  author: string;
  time: string;
  heading: string;
  id: string;
}

const HotPostModel: React.FC<Props> = ({
  cover,
  author,
  time,
  heading,
  id,
}) => (
  <div className=" mx-auto flex flex-col  items-center rounded-3xl border-b-4 border-lime bg-white shadow-2xl dark:bg-black md:w-[30%]">
    <Link to={`/post/${id}`}>
      <img src={cover} alt="" className="h-52 w-96 rounded-3xl" />
    </Link>
    <div className="flex flex-col gap-3 p-4">
      <div className=" flex justify-between text-gray-700 dark:text-gray-300">
        <span>{author}</span>
        <span>{time}</span>
      </div>
      <Link to={`/post/${id}`}>
        <span className="text-2xl font-bold">{heading}</span>
      </Link>
    </div>
  </div>
);

export default HotPostModel;
