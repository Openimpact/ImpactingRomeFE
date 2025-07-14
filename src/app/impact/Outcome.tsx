"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import bin from "../../../public/icons/bin.svg";
import StakeHolder from "./StakeHolder";
import Indicatore from "./Indicatore";
import { PrimitiveAtom, atom, useAtom, useAtomValue } from "jotai";
import { useReducerAtom } from "jotai/utils";
import { useIndicatori } from "../hooks/swrHooks";
import { Indicatori, Outcome } from "@/repos/types";

type Props = {
  name: string;
  description?: string;
};

const data = [
  {
    name: "Seleziona uno stakeholder",
    options: [
      {
        name: "Ragazzi",
      },
      {
        name: "Bambini",
      },
      {
        name: "Studenti",
      },
      {
        name: "Richiedenti asilo",
      },
      {
        name: "Pensionati",
      },
      {
        name: "Lavoratori della cultura",
      },
      {
        name: "Docenti",
      },
      {
        name: "NEET",
      },
      {
        name: "Genitori",
      },
      {
        name: "Madri single",
      },
      {
        name: "Padri single",
      },
      {
        name: "OSS",
      },
      {
        name: "Donne in gravidanza",
      },
      {
        name: "Anziani",
      },
      {
        name: "Disoccupati",
      },
    ],
  },
];

export type IndicatoreType = {
  name: string;
  target: number;
  checked?: boolean;
  proxy: {
    name: string;
    value: number;
  };
};

interface socialValueState {
  indicatoriDisponibili: Indicatori[];
  indicatoriSelezionati: (Indicatori & { target?: number })[];
}
enum indicatoriReducerActionTypes {
  addIndicatore = "addIndicatore",
  removeIndicatore = "removeIndicatore",
  changeIndicatoreTargetValue = "changeIndicatoreTargetValue",
}

function indicatoriReducer(
  state: socialValueState,
  action: { type: string; payload: any },
) {
  if (action.type === "setIndicatoriDisponibili") {
    return {
      ...state,
      indicatoriDisponibili: [...action.payload],
    };
  }
  if (action.type === "addIndicatore") {
    return {
      ...state,
      indicatoriSelezionati: Array.from(
        new Set([...state.indicatoriSelezionati, action.payload]),
      ),
    };
  }
  if (action.type === "removeIndicatore") {
    return {
      ...state,
      indicatoriSelezionati: state.indicatoriSelezionati.filter((i) => {
        if (i.name === action.payload.name) return null;
        return i;
      }),
    };
  }

  if (action.type === "changeIndicatoreTarget") {
    console.log("changeIndicatoreTarget", action.payload);
    return {
      ...state,
      indicatoriSelezionati: state.indicatoriSelezionati.map((i) => {
        if (i.name === action.payload.indicatore.name) {
          return { ...i, target: action.payload.newValue };
        }
        return i;
      }),
    };
  }
  return state;
}

function Sum(a: number, b: number) {
  return a + b;
}

export const selectedIndicatoriStateAtom = atom<socialValueState>({
  indicatoriDisponibili: [],
  indicatoriSelezionati: [],
});

export const sroiAtom = atom((get) =>
  get(selectedIndicatoriStateAtom)
    .indicatoriSelezionati.map(
      (i, idx) => (i.target! ?? 0) * (i.proxy[0]?.value ?? 0),
    )
    .reduce(Sum, 0),
);

function Outcome({ atom }: { atom: PrimitiveAtom<Outcome> }) {
  const [outcome] = useAtom(atom);

  const {
    data: indicatori,
    isLoading: indicatoriLoading,
    error: indicatoriError,
  } = useIndicatori<Indicatori[]>(outcome.id);

  const [state, dispatch] = useReducerAtom(
    selectedIndicatoriStateAtom,
    indicatoriReducer,
  );
  useEffect(() => {
    if (indicatori && !indicatoriError && !indicatoriLoading) {
      dispatch({ type: "setIndicatoriDisponibili", payload: indicatori });
    }
  }, [indicatori]);

  if (indicatoriLoading) return "loading";
  if (indicatoriError) return "error";

  return (
    <div>
      <div className="mt-6 px-4 space-y-6 border-2 border-gray-200 rounded-md">
        <div className="flex justify-between my-3">
          <h1 className="text-lg">{outcome.name}</h1>
        </div>
        {data.map((a, idx) => {
          return (
            <div key={idx}>
              <StakeHolder stakeHolderName={a.name} options={a.options} />
            </div>
          );
        })}
        <div className="w-full border-b-2 border-gray-200" />
        <div className="grid grid-cols-2 gap-2">
          {indicatori?.map((i, idx) => {
            return (
              <div key={i.id}>
                <Indicatore
                  indicatore={i}
                  getChecked={() => state.indicatoriSelezionati.includes(i)}
                  getDefaultValue={() =>
                    state.indicatoriSelezionati.filter(
                      (is) => is.id === i.id,
                    )[0]?.target! ?? 0
                  }
                  onSelect={() =>
                    dispatch({ type: "addIndicatore", payload: i })
                  }
                  onDeselect={() =>
                    dispatch({ type: "removeIndicatore", payload: i })
                  }
                  onTargetValueChange={(value) =>
                    dispatch({
                      type: "changeIndicatoreTarget",
                      payload: { indicatore: i, newValue: value },
                    })
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Outcome;
