import React from "react";

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  htmlFor: string;
  id: string;
  maxLength?: number;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  htmlFor,
  id,
  maxLength,
  error,
}) => {
  if (type === "file") {
    return (
      <div className="mb-4">
        <label
          className="mb-2 block font-bold text-gray-700 dark:text-gray-300"
          htmlFor={htmlFor}
        >
          {label}
        </label>

        <input
          className="focus:shadow-outline w-full rounded border py-2 px-3 leading-tight text-black shadow focus:outline-none bg-slate-200 dark:bg-slate-400"
          id={id}
          type={type}
          onChange={onChange}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className="mb-4">
      <label
        className="mb-2 block font-bold text-gray-700 dark:text-gray-300"
        htmlFor={htmlFor}
      >
        {label}
      </label>

      <input
        className="focus:shadow-outline w-full rounded border py-2 px-3 leading-tight text-black shadow focus:outline-none bg-slate-200 dark:bg-slate-400"
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default FormInput;
