import React from "react";

type Props = {
  isActive: boolean;
  name: string;
  onClick: React.MouseEventHandler;
};

//style={{ backgroundColor: `${isActive ? "black" : "white"}` }}

function FiltersTypes({ name, onClick, isActive }: Props) {
  return (
    <div>
      <button
        onClick={onClick}
        style={{
          backgroundColor: `${isActive ? "grey" : "white"}`,
        }}
        className="py-1 px-4 block gap-x-2 text-sm font-medium rounded-lg border text-gray-900 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
      >
        {name}
      </button>
    </div>
  );
}

export default FiltersTypes;
