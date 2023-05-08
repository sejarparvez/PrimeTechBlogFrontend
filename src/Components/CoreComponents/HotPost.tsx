import { useEffect, useState } from "react";
import Loading from "../AdditionalComponents/Card/Loading";
import HotPostModel from "./HotPostModel";

interface Post {
  _id: string;
  cover: string;
  author: {
    Name: string;
  };
  updatedAt: string;
  title: string;
}

const HotPost = () => {
  const [hotPosts, setHotPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchHotPosts = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}/posts/hotpost`
        );
        const data = await response.json();
        setHotPosts(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setIsLoading(false);
      }
    };
    fetchHotPosts();
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
    if (day >= "11" && day <= "13") {
      return "th";
    }
    switch (day.slice(-1)) {
      case "1":
        return "st";
      case "2":
        return "nd";
      case "3":
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <div className="flex flex-col flex-wrap items-center justify-center gap-8 md:flex-row">
      {isLoading ? (
        <div>
          <Loading />
        </div>
      ) : error ? (
        <div>No posts found.</div>
      ) : hotPosts.length === 0 ? (
        <div>No posts found.</div>
      ) : (
        hotPosts.map((post) => (
          <HotPostModel
            key={post._id}
            cover={post.cover}
            author={post.author.Name}
            time={formatDate(post.updatedAt)}
            heading={post.title}
            id={post._id}
          />
        ))
      )}
    </div>
  );
};

export default HotPost;
