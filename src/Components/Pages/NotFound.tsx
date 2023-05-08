import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-6xl font-bold ">404 - Page Not Found</h1>
      <p className="] mb-4 text-lg">
        Sorry, the page you are looking for cannot be found.
      </p>
      <Link to={"/"}>
        <span className="text-lg text-blue-600">Go back to the home page</span>
      </Link>
    </div>
  );
};

export default NotFound;
