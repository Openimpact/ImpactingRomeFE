import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { atom, useAtom } from "jotai";

const sliceStartAtom = atom(0);
const sliceEndAtom = atom(7);
const currentPageAtom = atom(1);

export { sliceStartAtom, sliceEndAtom, currentPageAtom };

type Props = {};

export function Pagination({}: Props) {
  // using the global state from Jotai for setting our slice values
  const [currentSliceStart, setCurrentSliceStart] = useAtom(sliceStartAtom);
  const [currentSliceEnd, setCurrentSliceEnd] = useAtom(sliceEndAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  // the number that is added to the states specifies how many posts are displayed per page
  const nextPage = () => {
    setCurrentSliceStart(currentSliceStart + 4);
    setCurrentSliceEnd(currentSliceEnd + 4);
    setCurrentPage(currentPage + 1);
  };

  const previousPage = () => {
    setCurrentSliceStart(currentSliceStart - 4);
    setCurrentSliceEnd(currentSliceEnd - 4);
    setCurrentPage(currentPage - 1);
  };

  const getItemProps = (index: any) =>
    ({
      variant: currentPage === index ? "filled" : "text",
      color: "gray",
      onClick: () => setCurrentPage(index),
    }) as any;
  return (
    <div className="flex items-center justify-center my-8 gap-4">
      {currentSliceStart >= 4 && (
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      )}
      <div className="flex items-center gap-2">
        <IconButton {...getItemProps(1)}>1</IconButton>
        <IconButton {...getItemProps(2)}>2</IconButton>
        <IconButton {...getItemProps(3)}>3</IconButton>
        <IconButton {...getItemProps(4)}>4</IconButton>
        <IconButton {...getItemProps(5)}>5</IconButton>
      </div>
      {
      //@ts-ignore
      currentSliceEnd < outcome.length && (
        <Button
          variant="text"
          className="flex items-center gap-2"
          onClick={nextPage}
          disabled={currentPage === 5}
        >
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
