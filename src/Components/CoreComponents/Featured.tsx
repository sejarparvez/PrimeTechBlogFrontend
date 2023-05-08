import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../AdditionalComponents/Card/Loading";

function Featured() {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  interface Post {
    _id: string;
    cover: string;
    title: string;
    author: {
      Name: string;
    };
    updatedAt: string;
    summary: string;
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/posts/featured`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Post not found") {
          setPost(null);
        } else {
          setPost(data);
        }
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    const day = formattedDate.split(" ")[0];
    const month = formattedDate.split(" ")[1];
    const year = formattedDate.split(" ")[2];
    return `${day}${daySuffix(day)} ${month} ${year}`;
  };

  const daySuffix = (day: string) => {
    if (+day >= 11 && +day <= 13) {
      return "th";
    }
    switch (+day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center">
        No Featured Post To Display
      </div>
    );
  }

  return (
    <Link to={`/post/${post._id}`}>
      <div className="flex flex-col gap-8 rounded-3xl border-b-4 border-lime bg-white p-2 shadow-2xl transition-all duration-700 dark:bg-black md:p-6 lg:flex-row">
        <div className="flex-1 lg:order-2">
          <img
            className="h-64 w-full object-cover md:h-80"
            src={post.cover}
            alt=""
          />
        </div>
        <div className="relative flex flex-1 flex-col gap-5 lg:order-1">
          <div className="text-3xl font-bold md:text-5xl">{post.title}</div>
          <div className="text-gray-500 dark:text-gray-400">
            {post.author?.Name} || {formatDate(post?.updatedAt)}
          </div>
          <div className="text-dark-300 bottom-5 lg:bottom-0">
            {post?.summary}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Featured;
