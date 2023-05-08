import { Link } from "react-router-dom";

interface Author {
  name: string;
  bio: string;
}

interface AuthorCardProps {
  author: Author;
  id: number;
}

function AuthorCard({ author, id }: AuthorCardProps) {
  return (
    <div className="rounded-2xl bg-white dark:bg-black h-3/4">
      <div className="flex flex-col p-3">
        <span className="mx-auto py-2 text-2xl font-bold">About Author</span>
        <hr />
      </div>
      <div className="flex flex-col gap-4 p-4">
        <Link to={`/users/${id}`}>
          <span className="mx-auto text-xl font-bold">{author.name}</span>
        </Link>
        <span>{author.bio}</span>
      </div>
    </div>
  );
}

export default AuthorCard;
