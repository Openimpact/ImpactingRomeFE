"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PrimitiveAtom, atom, useAtom } from "jotai";
import { splitAtom } from "jotai/utils";
import SDGdata from "./SDGdata.json";
import {useOutcome} from "@/app/hooks/swrHooks";
import {Outcome} from "@/repos/types";
import {selectedSDGAtom} from "@/app/impact/OutcomesSdg";
import {Typography} from "@material-tailwind/react";

type SDGType = {
  id: number;
  sdgName: string;
  description: string;
  icon_url: string;
  checked: boolean;
};

const Sdg = ({ sdg: sdgAtom }: { sdg: PrimitiveAtom<SDGType> }) => {
  const [sdg, setSdg] = useAtom(sdgAtom);
  const [checked, setChecked] = useState(sdg.checked);
  const labelWithoutSpaces = sdg.sdgName.replace(/\s/g, "");

  useEffect(() => {
    setSdg({
      ...sdg,
      checked,
    });
  }, [checked]);

  return (
    <div
      onClick={() => setChecked(!checked)}
      className="mt-6 space-y-6 cursor-pointer"
    >
      <div className="flex gap-x-4 h-full">
        <div className="flex flex-col justify-start items-start mt-6">
          <input
            id={sdg.id.toString()}
            name={labelWithoutSpaces}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            defaultChecked={checked}
          />
        </div>
        <div className="flex w-full space-x-6 items-start">
          <Image
            src={sdg.icon_url}
            alt={labelWithoutSpaces}
            width={50}
            height={50}
            className="h-12 w-12 object-fit mt-2 "
          />

          <div className="text-sm leading-6 items-start">
            <label
              htmlFor={labelWithoutSpaces}
              className="font-medium text-gray-900"
            >
              {sdg.sdgName}
            </label>
            {sdg.description && (
              <p className="text-gray-500 font-light">{sdg.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const SDGImageUrls = {
  1: "/SDG/01.png",
  2: "/SDG/02.png",
  3: "/SDG/03.png",
  4: "/SDG/04.png",
  5: "/SDG/05.png",
  6: "/SDG/06.png",
  7: "/SDG/07.png",
  8: "/SDG/08.png",
  9: "/SDG/09.png",
  10: "/SDG/10.png",
  11: "/SDG/11.png",
  12: "/SDG/12.png",
  13: "/SDG/13.png",
  14: "/SDG/14.png",
  15: "/SDG/15.png",
  16: "/SDG/16.png",
  17: "/SDG/17.png",
};

export const SDGAtom = atom(SDGdata.data);

export const SDGSplitAtom = splitAtom(SDGAtom);

function SdgList() {
  const [sdgs] = useAtom(SDGSplitAtom);
  const [selectedSdgs] = useAtom(selectedSDGAtom);
  const {
    data: outcome,
    isLoading: outcomeLoading,
    error: outcomeError,
  } = useOutcome<Outcome[]>(selectedSdgs);
  return (<>
        <Typography
            className="font-normal"
        >
          Seleziona gli SDG relativi al tuo progetto
        </Typography>
    <div className="grid grid-cols-2 gap-4">
      {sdgs.map((sdg, idx) => (
        <Sdg sdg={sdg} key={idx}></Sdg>
      ))}
    </div>
  </>
  );
}

export default SdgList;
