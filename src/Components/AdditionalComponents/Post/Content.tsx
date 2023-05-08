import { FC } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Toolbar from "./ReactQuill";

interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

const Content: FC<Props> = ({ value, onChange, error }) => {
  return (
    <div className="mb-4 h-[30rem] max-w-xs md:max-w-md lg:max-w-2xl">
      <label
        className="mb-2 block font-bold text-gray-700 dark:text-gray-300"
        htmlFor="content"
      >
        Content
      </label>
      <div className="rounded">
        <ReactQuill
          className="h-96 w-full"
          value={value}
          onChange={(content, delta, source, editor) => {
            onChange(editor.getHTML());
          }}
          modules={Toolbar()}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Content;
