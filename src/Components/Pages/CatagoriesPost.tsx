import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecentPostModel from "../CoreComponents/RecentPostModel";

interface CategoriesPostProps {
  userId: string;
}

function CategoriesPost(props: CategoriesPostProps) {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);
  const { categories } = useParams<{ categories: string }>();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/categoriesposts/${categories}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      });
  }, [categories, currentPage, pageSize, props.userId]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <li
        key={number}
        onClick={() => handlePageChange(number)}
        className={`${
          currentPage === number
            ? "border-2 border-blue-600 bg-black text-white"
            : "bg-white text-gray-800"
        } mx-1  cursor-pointer rounded-md border px-3 py-1 hover:bg-gray-200`}
      >
        {number}
      </li>
    ));
  };

  return (
    <div className="flex w-full flex-col text-center items-center gap-16 md:mt-6">
      <div className="text-3xl font-bold md:text-5xl">
        Every Post Of {categories} Categories
      </div>

      {posts.length > 0 &&
        posts.map((post) => <RecentPostModel key={post._id} {...post} />)}
      <ul className="mt-4 flex">
        <li
          onClick={() => handlePageChange(1)}
          className={`${
            currentPage === 1
              ? "bg-gray-400 text-white"
              : "bg-white text-gray-800"
          } mx-1 cursor-pointer rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-200`}
        >
          First
        </li>
        <li
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)
          }
          className={`${
            currentPage === 1
              ? "bg-gray-400 text-white"
              : "bg-white text-gray-800"
          } mx-1 cursor-pointer rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-200`}
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
              ? "bg-gray-400 text-white"
              : "bg-white text-gray-800"
          } mx-1 cursor-pointer rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-200`}
        >
          Next
        </li>
        <li
          onClick={() => handlePageChange(totalPages)}
          className={`${
            currentPage === totalPages
              ? "bg-gray-400 text-white"
              : "bg-white text-gray-800"
          } mx-1 cursor-pointer rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-200`}
        >
          Last
        </li>
      </ul>
    </div>
  );
}

export default CategoriesPost;
