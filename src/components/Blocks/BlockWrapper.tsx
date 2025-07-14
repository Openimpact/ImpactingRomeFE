import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};

function BlockWrapper({ children, className }: Props) {
  return (
    <div className={"hover:bg-sky-50 bg-sky-50/50 rounded-lg py-4 px-4 md:px-4 " + className}>
      {children}
    </div>
  );
}

export default BlockWrapper;
