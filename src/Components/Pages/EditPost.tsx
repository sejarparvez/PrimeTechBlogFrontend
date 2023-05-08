import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import { Navigate, useParams } from "react-router-dom";
import Categories from "../AdditionalComponents/Categories/Categories";
import Content from "../AdditionalComponents/Post/Content";
import EditPostValidation from "../AdditionalComponents/Validation/EditPostValidation";
import FormInput from "../Common/Input/FormInput";
import TextArea from "../Common/Input/Textarea";

function EditPost() {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [categories, setCategories] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/post/` + id).then((response) => {
      response.json().then((postInfo) => {
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
        setCategories(postInfo.categories);
      });
    });
  }, [id]);

  async function UpdatePost(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    const errors = EditPostValidation({
      title,
      summary,
      categories,
      content,
    });
    if (Object.keys(errors).length > 0) {
      setErrors(errors as { [key: string]: string });

      return;
    }
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("categories", categories);
    if (id) {
      data.set("id", id);
    }

    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    toast.loading("Please wait while we save your post to the database.");

    await fetch(`${process.env.REACT_APP_API}/post`, {
      method: "PUT",
      body: data,
      credentials: "include",
    });
    toast.dismiss();
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="mx-auto max-w-2xl p-4 dark:bg-gray-800 md:mt-0">
        <form
          className="rounded-lg bg-white p-6 shadow-lg dark:bg-black"
          onSubmit={UpdatePost}
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
              Update Post
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

export default EditPost;
