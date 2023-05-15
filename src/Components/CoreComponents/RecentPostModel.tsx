import Time from "@iconscout/react-unicons/icons/uil-clock";
import User from "@iconscout/react-unicons/icons/uil-user";
import dayjs from "dayjs";
import "dayjs/locale/en";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";

dayjs.extend(relativeTime);

interface Props {
  cover: string;
  title: string;
  summary: string;
  author: { Name: string };
  createdAt: string;
  _id: string;
}

function RecentPostModel({
  cover,
  title,
  summary,
  author,
  createdAt,
  _id,
}: Props) {
  const timeAgo = dayjs(createdAt).locale("en").fromNow();

  return (
    <div className="flex flex-col md:w-[78%] md:gap-20">
      <Link to={`/post/${_id}`}>
        <div className="hidden rounded-3xl border-r-4 border-pink bg-white p-4 dark:bg-black md:block">
          <div className="grid grid-cols-12 gap-6 bg-white dark:bg-black md:flex-row">
            <div className="col-span-5 h-56 bg-black">
              <img src={cover} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="col-span-7 flex flex-col justify-between gap-4">
              <h1 className="text-3xl font-bold">{title}</h1>

              <div className="text-gray-700 dark:text-gray-300">
                {summary}...
              </div>
              <div className="w-full text-sm text-gray-700 dark:text-gray-400 ">
                <div className="flex justify-between">
                  <span className="flex gap-2">
                    <User size="20" />
                    <span>{author.Name}</span>
                  </span>
                  <span className="flex gap-2">
                    <Time size="20" />
                    <span>{timeAgo}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="mx-auto w-full rounded-3xl border-b-4 border-lime bg-white p-3 dark:bg-black md:hidden">
        <Link to={`/post/${_id}`}>
          <div className="flex flex-col">
            <div className="flex flex-col gap-4 md:relative">
              <h1 className="text-2xl font-bold">{title}</h1>

              <div>
                <img src={cover} alt="" className="float-left mr-4 h-24 w-40" />

                <span>{summary}....</span>
              </div>

              <div className="bottom-0 w-full text-sm text-gray-700 dark:text-gray-400 md:absolute">
                <div className="flex justify-between">
                  <span className="flex gap-2">
                    <span>
                      <User size="20" />
                    </span>
                    <span>{author.Name}</span>
                  </span>
                  <span className="flex gap-2">
                    <span>
                      <Time size="20" />
                    </span>
                    <span>{timeAgo}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default RecentPostModel;
