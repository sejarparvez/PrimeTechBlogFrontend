import React from "react";

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
  return (
    <div className="mb-4">
      <label
        className="mb-2 block font-bold text-gray-700 dark:text-gray-300"
        htmlFor={htmlFor}
      >
        {label}
      </label>

      <textarea
        className="focus:shadow-outline h-20 w-full appearance-none rounded border bg-slate-200 py-2 px-3 leading-tight text-black shadow focus:outline-none dark:bg-slate-400"
        id={id}
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
