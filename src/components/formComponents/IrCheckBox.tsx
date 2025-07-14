"use client";
import React, { ComponentProps } from "react";
import ErrorLabel from "./ErrorLabel";

type Props = {
  label: string;
  description?: string;
};

function IrCheckBox({
  label,
  description,
  ...rest
}: Props &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > &
  any) {
  const labelWithoutSpaces = label.replace(/\s/g, "").toLowerCase();
  return (
    <div className="mt-6 space-y-6">
      <div className="relative flex gap-x-3">
        <div className="flex h-6 items-center">
          <input
            id={labelWithoutSpaces}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            {...rest}
            name={labelWithoutSpaces}
          />
        </div>
        <div className="text-sm leading-6">
          <label
            htmlFor={labelWithoutSpaces}
            className="font-medium text-gray-900"
          >
            {label}
          </label>
          {description && <p className="text-gray-500">{description}</p>}
        </div>
        <ErrorLabel error={rest.error} />
      </div>
    </div>
  );
}

export default IrCheckBox;
