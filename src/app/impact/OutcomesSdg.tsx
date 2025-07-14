import React, {useCallback} from "react";
import info from "../../../public/icons/info.svg";
import Image from "next/image";
import {useIndicatori, useOutcome} from "../hooks/swrHooks";
import { atom, useAtom } from "jotai";
import { SDGAtom, SDGImageUrls } from "./SdgComponent";
import {Indicatori, Outcome} from "@/repos/types";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import {Button, Typography} from "@material-tailwind/react";

type Props = {};

const sliceStartAtom = atom(0);
const sliceEndAtom = atom(7);
const currentPageAtom = atom(1);

export const selectedSDGAtom = atom((get) =>
  get(SDGAtom)
    .filter((s) => s.checked)
    .map((s) => s.id)
);
export const selectedOutcomeAtom = atom<Outcome[]>([]);

const selectedOutcomes = function OutcomesSdg({}: Props) {
  const [sdgs, _] = useAtom(selectedSDGAtom);
  const [selectedOutcomes, setSelectedOutcomes] = useAtom(selectedOutcomeAtom);
  // using the global state from Jotai for setting our slice values
  const [currentSliceStart, setCurrentSliceStart] = useAtom(sliceStartAtom);
  const [currentSliceEnd, setCurrentSliceEnd] = useAtom(sliceEndAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const {
    data: outcome,
    isLoading: outcomeLoading,
    error: outcomeError,
  } = useOutcome<Outcome[]>(sdgs);

  if (outcomeLoading) return "loading";
  if (outcomeError) return "error";

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


  const pagesAtom = atom(currentSliceEnd < outcome!.length);

  const getItemProps = (index: any) =>
    ({
      variant: currentPage === index ? "filled" : "text",
      color: "gray",
      onClick: () => setCurrentPage(index),
    }) as any;

  const outcomes = outcome?.sort((x, y) => +x.sdg! - +y.sdg!)!;

  return (
    <div className="mt-6">
      <h1 className="my-5 text-xl">Outcomes</h1>
      <Typography
          className="font-normal "
      >
        Seleziona i risultati che intendi generare con il progetto.
      </Typography>
      <div className="mt-10">
        {outcomes.slice(currentSliceStart, currentSliceEnd).map((a, idx) => {
          return (
            <div
              key={a.id}
              className="border-b-2 border-gray-200 w-full cursor-pointer"
            >
              <div className="flex justify-between items-center my-6 px-10">
                <div className="flex items-center gap-x-16">
                  <input
                    id={a.id}
                    name="outcome_name"
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    defaultChecked={
                      !!selectedOutcomes.filter((x) => x.id === a.id).length
                    }
                    onChange={(e) =>{
                       if(e.target.checked) {
                        setSelectedOutcomes([...selectedOutcomes, a])
                        }else{
                          setSelectedOutcomes([
                            ...selectedOutcomes.filter((x) => x.id != a.id),
                          ])
                        }
                      }
                    }
                  />
                  <h2 className="w-full">{a.name}</h2>
                </div>
                <div className="flex items-center gap-x-16">
                  <Image src={info} alt="icon" width={18} height={18} />
                  <Image
                    //@ts-ignore
                    src={SDGImageUrls[+a.sdg!]}
                    alt="icon"
                    width={50}
                    height={50}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex items-center justify-center my-8 gap-4">
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={previousPage}
            disabled={currentPage === 1}
          >
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
          {/* <div>
            {<IconButton {...getItemProps(pagesAtom)}>{currentPage}</IconButton>}
          </div> */}
          <Button
            variant="text"
            className="flex items-center gap-2"
            onClick={nextPage}
            disabled={currentPage === 5}
          >
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default selectedOutcomes;
