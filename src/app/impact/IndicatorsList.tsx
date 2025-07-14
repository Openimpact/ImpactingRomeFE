import React from "react";
import Outcome, { sroiAtom } from "./Outcome";
import { useAtom } from "jotai";
import { selectedOutcomeAtom } from "./OutcomesSdg";
import { splitAtom } from "jotai/utils";
import {Typography} from "@material-tailwind/react";

type Props = {};

export const selectedOutcomesSplitAtom = splitAtom(selectedOutcomeAtom);

function IndicatorsList({}: Props) {
  const [socialValue] = useAtom(sroiAtom);
  const [selectedOutcomes] = useAtom(selectedOutcomesSplitAtom);
  return (
    <div className="mt-6">

      <h1 className="my-5 text-xl">Seleziona gli indicatori appropriati</h1>
      <Typography
          className="font-normal"
      >
        Come sarà possibile misurarne l&apos;impatto?
      </Typography>
      {/* <h2 className="mt-2">Social Value : {socialValue}</h2>
       */}{" "}
      <div className="mt-10">
        {selectedOutcomes.map((a, idx) => {
          return <Outcome atom={a} key={idx} />;
        })}
      </div>
    </div>
  );
}

export default IndicatorsList;
