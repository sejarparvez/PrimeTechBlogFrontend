interface Errors {
  title?: string;
  summary?: string;
  categories?: string;
  content?: string;
  image?: string;
}

interface Props {
  title: string;
  summary: string;
  categories: string;
  content: string;
  files: FileList | null;
}

export default function NewPostValidation({
  title,
  summary,
  categories,
  content,
  files,
}: Props): Errors {
  const errors: Errors = {};

  // validate title field
  if (!title.trim()) {
    errors.title = "Title is required";
  } else if (title.trim().length < 40) {
    errors.title = "Title must be at least 40 characters long";
  } else if (title.trim().length > 70) {
    errors.title = "Title can not be longer than 70 characters";
  }

  // validate summary field
  if (!summary.trim()) {
    errors.summary = "Summary is required";
  } else if (summary.trim().length < 100) {
    errors.summary = "Summary must be at least 100 characters long";
  } else if (summary.trim().length > 200) {
    errors.summary = "Summary can not be longer than 200 characters";
  }

  // validate categories field
  if (!categories || categories.length === 0) {
    errors.categories = "Category is required";
  }

  // validate content field
  if (!content.trim()) {
    errors.content = "Content is required";
  } else if (content.trim().length < 200) {
    errors.content = "Content can not be less than 200 characters";
  }

  // validate image field
  if (!files || files.length === 0) {
    errors.image = "Image is required";
  }

  return errors;
}
