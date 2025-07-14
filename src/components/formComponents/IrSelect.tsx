"use client";
import React from "react";
import ErrorLabel from "./ErrorLabel";

type Props = {
  name: string;
  label: string;
  options: {
    value: string;
    name: string;
  }[];
  error?: string;
  required?: boolean;
};

function IrSelect({ label, name, options, error, required }: Props) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-2">
        <select
          id={name}
          name={name}
          autoComplete={name}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600  sm:text-sm sm:leading-6"
        >
          {options.map((option, idx) => (
            <option value={option.value} key={idx}>{option.name}</option>
          ))}
        </select>
        <ErrorLabel error={error} />
      </div>
    </div>
  );
}

export default IrSelect;
