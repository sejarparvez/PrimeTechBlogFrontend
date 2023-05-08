import Edit from "@iconscout/react-unicons/icons/uil-edit";
import Trash from "@iconscout/react-unicons/icons/uil-trash-alt";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../UserContext";
import Ad from "../AdditionalComponents/Card/Ad";
import AuthorCard from "../AdditionalComponents/Card/AuthorCard";
import Loading from "../AdditionalComponents/Card/Loading";
import CommentForm from "../Comments/Comment";

function SinglePost(): JSX.Element {
  const { userInfo } = useContext(UserContext);
  const [postInfo, setPostInfo] = useState<Post | null>(null);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/post/${id}`).then((response) => {
      response.json().then((postInfo: Post) => {
        setPostInfo(postInfo);
      });
    });
  }, [id]);

  if (!postInfo)
    return (
      <div className="mx-auto mt-40">
        <Loading />
      </div>
    );

  interface Post {
    _id: string;
    title: string;
    author: {
      bio: string;
      _id: number;
      Name: string;
    };
    content: string;
    categories: string;
    updatedAt: string;
    cover: string;
  }

  const formatDate = (dateString: string): string => {
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

  const daySuffix = (day: string): string => {
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

  const handleDelete = (): void => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmed) {
      fetch(`${process.env.REACT_APP_API}/post/${postInfo._id}`, {
        method: "DELETE",
      }).then(() => {
        navigate("/");
      });
    }
  };

  const postId = postInfo._id;
  return (
    <div className="flex flex-col md:grid md:grid-cols-8 md:gap-4">
      <div className="rounded-2xl py-1  md:col-span-6 md:row-span-2">
        <div className="mb-10 rounded-lg bg-white px-2 py-4 dark:bg-black md:mx-0">
          <h1 className="mb-4 text-4xl font-extrabold">{postInfo.title}</h1>
          <div className="flex flex-col gap-4 md:flex-row md:justify-between">
            <div>
              <span className="flex text-sm">
                <span className="text-sm ">
                  This Post Last Was Updated By{" "}
                  <Link to={`/users/${postInfo.author._id}`}>
                    <span className="px-1 text-lg font-medium ">
                      {postInfo.author.Name}
                    </span>{" "}
                  </Link>
                  At{" "}
                  <span className=" font-medium">
                    {formatDate(postInfo.updatedAt)}
                  </span>
                </span>
              </span>
            </div>
            <div>
              <Link to={`/posts/${postInfo.categories}`}>
                {" "}
                <button className="mr-10 rounded-tl-2xl rounded-br-2xl bg-pink px-4 py-1 font-bold text-white">
                  {postInfo.categories}
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center gap-6 bg-white dark:bg-black md:flex-row">
            {userInfo.id === postInfo.author._id && (
              <div className="mx-auto flex items-center justify-center md:justify-end">
                <div>
                  <Link to={`/edit/${postInfo._id}`}>
                    <span className="mr-4 flex gap-1 rounded-lg bg-black px-3 py-2 font-bold text-white hover:bg-red-700 dark:bg-gray-600">
                      <span>
                        <Edit />
                      </span>
                      <span>Edit Post</span>
                    </span>
                  </Link>
                </div>
                <div>
                  <span
                    className=" flex gap-1 rounded-lg bg-red-600 px-3 py-2 font-bold text-white hover:bg-red-700"
                    onClick={handleDelete}
                  >
                    <span>
                      <Trash />
                    </span>

                    <span>Delete Post</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <img
          className="mx-auto h-52 w-[96%] rounded-lg object-cover shadow-lg md:h-96 md:w-full"
          src={postInfo.cover}
          alt=""
        />
        <div
          className=" mt-10 mb-12 max-w-none rounded-lg bg-white p-3  dark:bg-black md:mx-0 md:mt-16 md:text-lg"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
        <CommentForm postId={postId} />
      </div>
      <div className="col-span-2 mb-4 w-full md:sticky md:top-4 md:h-screen">
        <div className="mb-10 h-4/6 rounded-2xl bg-white dark:bg-black">
          <AuthorCard
            author={{ name: postInfo.author.Name, bio: postInfo.author.bio }}
            id={postInfo.author._id}
          />
        </div>
        <div className="h-1/5 rounded-xl bg-white p-2 dark:bg-black">
          <Ad />
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
