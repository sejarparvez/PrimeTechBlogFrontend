import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from "react";

interface CommentsListProps {
  comments: any;
}

function CommentsList({ comments }: CommentsListProps) {
  return (
    <div className="flex flex-col gap-4">
      {comments.map(
        (comment: {
          _id: Key | null | undefined;
          author: {
            name:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | ReactFragment
              | ReactPortal
              | null
              | undefined;
          };
          createdAt: string | number | Date;
          content:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | ReactFragment
            | ReactPortal
            | null
            | undefined;
        }) => (
          <div
            key={comment._id}
            className="bg-white p-4 rounded-lg dark:bg-black"
          >
            <div className="flex flex-row items-center gap-4">
              <div className="bg-gray-300 rounded-full h-12 w-12"></div>
              <div>
                <div className="flex flex-row items-baseline">
                  <span className="font-bold text-lg">
                    {comment.author.name}
                  </span>
                  <span className="ml-4 text-gray-500 text-sm">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-2 text-gray-700 dark:text-gray-300">
                  {comment.content}
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default CommentsList;
