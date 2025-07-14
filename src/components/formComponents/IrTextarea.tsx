"use client";
import React from "react";
import ErrorLabel from "./ErrorLabel";

type Props = {
  label: string;
  description?: string;
  error?: string;
};

function IrTextarea({ label, description, ...rest }: Props) {
  const labelWithoutSpaces = label.replace(/\s/g, "");
  return (
    <div>
      <label
        htmlFor="about"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={labelWithoutSpaces}
          name={labelWithoutSpaces}
          rows={2}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={""}
          /* required */
          {...rest}
        />
      </div>
      <ErrorLabel error={rest.error} />
        {description && <p className="mt-3 text-sm leading-6 text-gray-600">{description}</p>}
    </div>
  );
}

export default IrTextarea;
