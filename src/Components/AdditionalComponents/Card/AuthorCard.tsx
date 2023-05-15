import Facebook from "@iconscout/react-unicons/icons/uil-facebook";
import Github from "@iconscout/react-unicons/icons/uil-github";
import Website from "@iconscout/react-unicons/icons/uil-globe";
import Instagram from "@iconscout/react-unicons/icons/uil-instagram";
import Linkedin from "@iconscout/react-unicons/icons/uil-linkedin";
import Telegram from "@iconscout/react-unicons/icons/uil-telegram";
import Twitter from "@iconscout/react-unicons/icons/uil-twitter";
import { Link } from "react-router-dom";

interface Author {
  name: string;
  bio: string;
  image: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
    telegram?: string;
    website?: string;
  };
}

interface AuthorCardProps {
  author: Author;
  id: number;
}

function AuthorCard({ author, id }: AuthorCardProps) {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="pt-2 flex flex-col gap-4">
        <Link to={`/users/${id}`} className="flex justify-center px-2">
          <span className="font-extrabold text-xl text-pink">{author.name}</span>
         
        </Link>
        <Link to={`/users/${id}`} className="h-32 w-full">
          <img
            src={author.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </Link>
        <div className="px-2 text-justify overflow-y-scroll">
          {author.bio.length > 250
            ? `${author.bio.slice(0, 250)}...`
            : author.bio}
        </div>
      </div>
      <div className="bg-black dark:bg-pink rounded-b-2xl text-white flex items-center justify-center gap-2 py-2 flex-wrap">
        {author.socialLinks.facebook && (
          <a
            href={author.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook />
          </a>
        )}
        {author.socialLinks.facebook && (
          <a
            href={author.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter />
          </a>
        )}
        {author.socialLinks.instagram && (
          <a
            href={author.socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram />
          </a>
        )}
        {author.socialLinks.linkedin && (
          <a
            href={author.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin />
          </a>
        )}
        {author.socialLinks.telegram && (
          <a
            href={author.socialLinks.telegram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Telegram />
          </a>
        )}
        {author.socialLinks.github && (
          <a
            href={author.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </a>
        )}
        {author.socialLinks.website && (
          <a
            href={author.socialLinks.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Website />
          </a>
        )}
      </div>
    </div>
  );
}

export default AuthorCard;
