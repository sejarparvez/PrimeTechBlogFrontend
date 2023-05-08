interface EditPostErrors {
  title?: string;
  summary?: string;
  categories?: string;
  content?: string;
}

interface EditPostValidationProps {
  title: string;
  summary: string;
  categories: string;
  content: string;
}

function EditPostValidation({
  title,
  summary,
  categories,
  content,
}: EditPostValidationProps): EditPostErrors {
  const errors: EditPostErrors = {};

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
  if (!categories.trim()) {
    errors.categories = "Category is required";
  }

  // validate content field
  if (!content.trim()) {
    errors.content = "Content is required";
  }

  return errors;
}

export default EditPostValidation;
