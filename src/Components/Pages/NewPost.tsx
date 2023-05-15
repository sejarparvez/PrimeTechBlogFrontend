import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
import Categories from "../AdditionalComponents/Categories/Categories";
import Content from "../AdditionalComponents/Post/Content";
import NewPostValidation from "../AdditionalComponents/Validation/NewPostValidation";
import FormInput from "../Common/Input/FormInput";
import TextArea from "../Common/Input/Textarea";

function NewPost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [redirect, setRedirect] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  async function createNewPost(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const errors = NewPostValidation({
      title,
      summary,
      categories,
      content,
      files,
    });
    if (Object.keys(errors).length > 0) {
      setErrors(errors as { [key: string]: string });
      return;
    }
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if (files) {
      data.set("file", files[0]);
    }
    data.set("categories", categories);

    toast.loading("Please wait while we save your post to the database.");
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/newpost`, {
        method: "POST",
        body: data,
        credentials: "include",
      });
      toast.dismiss();
      if (response.ok) {
        toast.success("Post is added successfully");
        setRedirect(true);
      } else {
        toast.error("Couldn't save your post. Please try again later");
      }
    } catch (error) {
      console.error(error);
      toast.dismiss();
      toast.error("Couldn't save your post. Please try again later");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="mx-auto dark:bg-gray-800">
        <form
          className="rounded-lg bg-white p-3 shadow-lg dark:bg-black md:p-6"
          onSubmit={createNewPost}
        >
          <FormInput
            label="Title"
            htmlFor="title"
            id="title"
            type="text"
            placeholder="Title"
            maxLength={70}
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
            error={errors.title}
          />
          <TextArea
            label="Summary"
            htmlFor="summary"
            id="summary"
            type="text"
            placeholder="Summary"
            maxLength={200}
            value={summary}
            onChange={(ev) => setSummary(ev.target.value)}
            error={errors.summary}
          />

          <Categories
            onChange={(ev) => setCategories(ev.target.value)}
            error={errors.categories}
          />

          <FormInput
            label="Featured Image"
            htmlFor="image"
            id="image"
            type="file"
            onChange={(ev) => setFiles(ev.target.files)}
            value={""}
            placeholder={""}
          />

          <Content
            onChange={(newValue) => setContent(newValue)}
            error={errors.content}
            value={content}
          />
          <div className="mt-20">
            <button className="flex items-center justify-center rounded bg-black py-2 px-4 font-bold text-white dark:bg-gray-700">
              Create Post
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default NewPost;
