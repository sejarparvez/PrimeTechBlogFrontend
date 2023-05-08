import { ChangeEventHandler, FC, useContext } from "react";
import { UserContext } from "../../../UserContext";
import Options from "./Options";

interface CategoriesProps {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  error?: string;
}

const Categories: FC<CategoriesProps> = ({ onChange, error }) => {
  const UserInfo = useContext(UserContext);
  const Admin = UserInfo.userInfo.email;

  return (
    <div className="mb-4">
      <label
        className="mb-2 block font-bold text-gray-700 dark:text-gray-300"
        htmlFor="categories"
      >
        Categories
      </label>
      <select
        className="mt-2 block w-10/12 rounded-md border border-gray-300 bg-slate-200 px-4 py-2 text-gray-700 dark:bg-slate-400"
        id="categories"
        onChange={onChange}
      >
        <option value="">Select Category</option>
        {Admin === process.env.REACT_APP_ADMIN
          ? Options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          : Options.filter(
              (option) =>
                option.value !== "featured" && option.value !== "hotpost"
            ).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
      </select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Categories;
