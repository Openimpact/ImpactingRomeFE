import React, { ReactElement, ReactNode } from "react";

type Props = {
  error?: string;
};

function ErrorLabel({ error }: Props) {
  return (
    <>
      {error && (
        <label className="block text-sm font-light leading-6 text-red-500">
          {error}
        </label>
      )}
    </>
  );
}

export default ErrorLabel;
