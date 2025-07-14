"use client";
import React from "react";
import ErrorLabel from "./ErrorLabel";

type Props = {
  label?: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function IrInput({ label, ...rest }: Props) {
  const labelWithoutSpaces = label?.replace(/\s/g, "");
  return (
    <div className="sm:col-span-4">
      {!!label && <label
        htmlFor={labelWithoutSpaces}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label} {rest.required && <span className="text-red-500">*</span>}
      </label>}
      <div className="mt-2">
        <input
          type="text"
          id={labelWithoutSpaces?labelWithoutSpaces:rest.name}
          {...rest}
          className={
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" +
            (rest.error ? " ring-red-400 " : null)
          }
        />
        <ErrorLabel error={rest.error} />
      </div>
    </div>
  );
}

export default IrInput;
