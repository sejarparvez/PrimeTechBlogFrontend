import { useEffect, useState } from "react";
import Loading from "../AdditionalComponents/Card/Loading";
import RecentPostModel from "./RecentPostModel";

interface Post {
  _id: string;
}

function RecentPost() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${process.env.REACT_APP_API}/post?page=${currentPage}&pageSize=${pageSize}`
    )
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
        setTotalPages(data.totalPages);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, [currentPage, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <li
        key={number}
        onClick={() => handlePageChange(number)}
        className={`${
          currentPage === number
            ? "border-2 border-lime bg-black text-white"
            : "bg-white text-gray-800"
        } mx-1 cursor-pointer rounded-md border px-3 py-1 hover:bg-gray-800`}
      >
        {number}
      </li>
    ));
  };

  return (
    <div className="flex flex-col items-center gap-16">
      {isLoading ? (
        <Loading />
      ) : posts.length > 0 ? (
        posts.map((post) => (
          <RecentPostModel
            cover={""}
            title={""}
            summary={""}
            author={{
              Name: "",
            }}
            createdAt={""}
            key={post._id}
            {...post}
          />
        ))
      ) : (
        <p className="text-center">No posts found</p>
      )}
      {posts.length > 0 && (
        <ul className="mt-4 flex">
          <li
            onClick={() => handlePageChange(1)}
            className={`${
              currentPage === 1
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            } mx-1 cursor-pointer rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-600`}
          >
            First
          </li>
          <li
            onClick={() =>
              handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)
            }
            className={`${
              currentPage === 1
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            } mx-1 cursor-pointer rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-600`}
          >
            Prev
          </li>
          {renderPageNumbers()}
          <li
            onClick={() =>
              handlePageChange(
                currentPage < totalPages ? currentPage + 1 : currentPage
              )
            }
            className={`${
              currentPage === totalPages
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            } mx-1 cursor-pointer rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-600`}
          >
            Next
          </li>
          <li
            onClick={() => handlePageChange(totalPages)}
            className={`${
              currentPage === totalPages
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            } mx-1 cursor-pointer rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-600`}
          >
            Last
          </li>
        </ul>
      )}
    </div>
  );
}

export default RecentPost;
