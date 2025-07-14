/*
"use client";
*/
import React from "react";
import info from "../../../public/icons/info.svg";
import Image from "next/image";
import { Indicatori } from "@/repos/types";

type Props = {
  indicatore: Indicatori;
  onSelect: () => void;
  onDeselect: () => void;
  onTargetValueChange: (value: number) => void;
  getChecked: () => boolean;
  getDefaultValue: () => number;
};

export default function Indicatore({
  indicatore,
  onSelect,
  onDeselect,
  onTargetValueChange,
  getChecked,
                                     getDefaultValue
}: Props) {
  const labelWithoutSpaces = indicatore.name?.replace(/\s/g, "");
  return (
    <div className="my-3 px-4 space-y-6 border-2 border-gray-200 rounded-md min-w-lg">
      <div className="my-6 space-y-6">
        <div className="flex flex-col gap-x-3 gap-y-6 items-start">
          <div className="flex gap-x-6 justify-center items-center">
            <input
              id={indicatore.id}
              name={labelWithoutSpaces}
              type="checkbox"
              onChange={(e) => (e.target.checked ? onSelect() : onDeselect())}
              className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-600 cursor-pointer "
              defaultChecked={getChecked()}
            />
            <div className="flex gap-x-3">
              <label
                htmlFor={labelWithoutSpaces}
                className="font-medium text-gray-900 cursor-pointer"
              >
                {indicatore.name}
              </label>
              <Image
                src={info}
                alt="icon"
                width={24}
                height={24}
                className="object-fit"
              />
            </div>
          </div>
          <div className="w-full border-b-2 border-gray-200" />
          <div className="flex justify-center items-center w-full gap-x-6">
            <input
              type="number"
              placeholder="Seleziona un target"
              min={0}
              step={1}
              name={labelWithoutSpaces}
              id={labelWithoutSpaces}
              required
              defaultValue={getDefaultValue()}
              onChange={(e) => onTargetValueChange(+e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div className="">
              <Image
                src={info}
                alt="icon"
                width={24}
                height={24}
                className="object-fit"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
