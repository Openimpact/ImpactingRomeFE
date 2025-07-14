import React from "react";

type Props = {
  children: React.ReactNode;
};

function BlockTitle({ children }: Props) {
  return (
    <h1 className="md:text-2xl text-2xl mb-4 font-bold tracking-tight text-gray-900">
      {children}
    </h1>
  );
}

export default BlockTitle;
