import React, { useContext, useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";
import CommentsList from "./CommentList";

function CommentForm({ postId }: { postId: string }) {
  const { userInfo } = useContext(UserContext);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    // Fetch the comments for the post from the backend
    fetch(`${process.env.REACT_APP_API}/posts/${postId}/comments`)
      .then((response) => response.json())
      .then((data: Comment[]) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [postId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const id = userInfo?.id;

    // Display loading message
    const promise = toast.promise(
      fetch(`${process.env.REACT_APP_API}/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          post: postId,
          author: id,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add comment");
          }
          return response.json();
        })
        .then((data: Comment) => {
          // Append the new comment to the existing list
          setComments([...comments, data]);
          setComment("");
          // Display success message
          return "Comment added successfully!";
        }),
      {
        loading: "Adding comment...",
        success: "Comment added successfully!",
        error: "Failed to add comment",
      }
    );
    promise.then(() => console.log("Toast dismissed!"));
  };

  const name = userInfo?.name;
  const id = userInfo?.id;

  return (
    <div className="flex flex-col gap-4 overflow-hidden ">
      <div className="flex flex-col gap-4 rounded-lg bg-white p-4 dark:bg-black">
        <span className=" text-2xl font-semibold ">Leave A Reply</span>

        {name && (
          <>
            <div className="flex flex-col gap-6">
              <span className=" items-baseline">
                <span className="pr-2 text-xl">
                  {" "}
                  You Are Logged In As{" "}
                  <Link to={`/users/${id}`}>
                    <span className="font-bold">{name}</span>{" "}
                  </Link>
                </span>
                <span className="text-3xl font-bold">{}</span>
              </span>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="mb-2 block font-bold text-gray-700 dark:text-gray-300"
                    htmlFor="comment"
                  >
                    Comment
                  </label>
                  <textarea
                    className="focus:shadow-outline h-32 w-full appearance-none rounded border py-2 px-3 leading-tight  focus:outline-none dark:bg-slate-800 md:h-40"
                    id="comment"
                    placeholder="Enter your comment here"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    className="focus:shadow-outline dark:bg-dark-400  rounded bg-black py-2 px-6 font-bold text-white focus:outline-none dark:bg-gray-700"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </>
        )}

        {!name && (
          <>
            <div className="text-xl">
              You Need To{" "}
              <Link to={"/login"}>
                <span className="font-bold">Log In</span>
              </Link>
            </div>
          </>
        )}
      </div>

      <CommentsList comments={comments} />
      <Toaster />
    </div>
  );
}

export default CommentForm;
