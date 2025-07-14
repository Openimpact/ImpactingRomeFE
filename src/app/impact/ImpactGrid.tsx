"use client";
import React, { Fragment, useEffect, useState } from "react";
import SdgComponent from "./SdgComponent";
import OutcomesSdg, { selectedOutcomeAtom, selectedSDGAtom } from "./OutcomesSdg";
import {
  BuildingLibraryIcon,
  ChevronUpDownIcon,
  CogIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import { Button, Step, Stepper, Typography } from "@material-tailwind/react";
import IndicatorsList from "./IndicatorsList";
import { atom, useAtom } from "jotai";
import ExcelUploader from "@/components/ExcelUploader";
import IrFormSection from "@/components/formComponents/IrFormSection";
import IrInput from "@/components/formComponents/IrInput";
import { UseFormReturnType, useForm } from "@mantine/form";
import IrTextarea from "@/components/formComponents/IrTextarea";
import ProgettoTable from "@/app/progetto/ProgettoTable";
import HeroCercaSection from "@/components/HeroCercaSection";
import { Operatori, Spazi } from "@/repos/types";
import { useOperatoriSearch, useSpaziSearch } from "../hooks/swrHooks";
import { Combobox, Transition } from "@headlessui/react";
import Image from "next/image";
import useDirectus from "../hooks/directus";
import { createItem, readMe } from "@directus/sdk";
import { selectedIndicatoriStateAtom, sroiAtom } from "./Outcome";
import { useRouter } from "next/navigation";

type Props = {};

type ImpactGridValueType = {
  budget: number;
  nomeProgetto: string;
  descrizione: string;
  operatori: Partial<Operatori>[];
  spazi: Partial<Spazi>[];
};
export type ImpactGridFormType = UseFormReturnType<ImpactGridValueType>;

const stepperAtoms = (initialStep: number, totalStepCount: number) => {
  const currentStepAtom = atom(initialStep);
  const nextStepAtom = atom(null, (get, set) =>
    set(currentStepAtom, (c) => (c === totalStepCount - 1 ? c : c + 1))
  );
  const previousStepAtom = atom(null, (get, set) =>
    set(currentStepAtom, (c) => (c === 0 ? 0 : c - 1))
  );
  return [currentStepAtom, nextStepAtom, previousStepAtom];
};

const totalSteps = 5;
const [currentStepAtom, setNextAtom, setPrevAtom] = stepperAtoms(0, totalSteps);

function ImpactGrid({}: Props) {
  const [activeStep, setActiveStep] = useAtom(currentStepAtom);
  const [logged,setLogged] = useState(false)
  const router = useRouter()

  


  const [selectedSDGs] = useAtom(selectedSDGAtom);
  const [selectedIndicatori] = useAtom(selectedIndicatoriStateAtom);
  const [selectedOutcome] = useAtom(selectedOutcomeAtom);
  const [sroi] = useAtom(sroiAtom);
  
  const [, handleNext] = useAtom(setNextAtom);
  const [, handlePrev] = useAtom(setPrevAtom);

  const [query, setQuery] = useState("");
  const [querySp, setQuerysp] = useState("");

  const directus = useDirectus();

  useEffect(()=>{
    directus.request(readMe({fields: ['*']})).then(res=> setLogged(!!res))
  },[])

  const {
    data: op,
    isLoading: isLoadingOp,
    error: errorOp,
  } = useOperatoriSearch<Operatori[]>(query);

  const {
    data: sp,
    isLoading: isLoadingSp,
    error: errorSp,
  } = useSpaziSearch<Spazi[]>(querySp);
  const [selected, setSelected] = useState<Spazi[]>([]);

  const filteredspazi =
    querySp === ""
      ? sp
      : sp?.filter((spazio) => {
          return spazio
            .name!.toLowerCase()
            .includes(querySp.toLocaleLowerCase());
        });

  const filteredOperatori =
    query === ""
      ? op
      : op?.filter((operatore) => {
          return operatore
            .name!.toLowerCase()
            .includes(query.toLocaleLowerCase());
        });

  const form = useForm<ImpactGridValueType>({
    initialValues: {
      budget: 0,
      nomeProgetto: "",
      descrizione: "",
      operatori: [],
      spazi: [],
    },
  });

  return (
    <>
      <HeroCercaSection
        title="Valuta l'impatto del tuo progetto"
        image="/impact.jpg"
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
      {/* {!logged && <Typography className="my-16 ">
                  Effettua il login per continuare.
                </Typography>} */}
        { <div className="space-y-12 my-40">
          <div className=" pb-12">
            <div className="w-full px-24 pb-20 mb-[6rem]">
              <Stepper activeStep={activeStep!}>
                <Step onClick={() => setActiveStep(0)}>
                  <UserIcon className="h-5 w-5 cursor-pointer" />
                  <div className="absolute -bottom-[4.5rem] w-max text-center">
                    <Typography
                      variant="h6"
                      color={activeStep === 0 ? "blue-gray" : "gray"}
                    >
                      Informazioni generali
                    </Typography>
                  </div>
                </Step>
                <Step onClick={() => setActiveStep(1)}>
                  <UserIcon className="h-5 w-5 cursor-pointer" />
                  <div className="absolute -bottom-[4.5rem] w-max text-center">
                    <Typography
                      variant="h6"
                      color={activeStep === 0 ? "blue-gray" : "gray"}
                    >
                      Sustainable Development Goals
                    </Typography>
                  </div>
                </Step>
                <Step onClick={() => setActiveStep(2)}>
                  <CogIcon className="h-5 w-5 cursor-pointer" />
                  <div className="absolute -bottom-[4.5rem] w-max text-center">
                    <Typography
                      variant="h6"
                      color={activeStep === 1 ? "blue-gray" : "gray"}
                    >
                      Outcomes
                    </Typography>
                  </div>
                </Step>
                <Step onClick={() => setActiveStep(3)}>
                  <BuildingLibraryIcon className="h-5 w-5 cursor-pointer" />
                  <div className="absolute -bottom-[4.5rem] w-max text-center">
                    <Typography
                      variant="h6"
                      color={activeStep === 2 ? "blue-gray" : "gray"}
                    >
                      Indicatori
                    </Typography>
                  </div>
                </Step>
                <Step onClick={() => setActiveStep(4)}>
                  <BuildingLibraryIcon className="h-5 w-5 cursor-pointer" />
                  <div className="absolute -bottom-[4.5rem] w-max text-center">
                    <Typography
                      variant="h6"
                      color={activeStep === 2 ? "blue-gray" : "gray"}
                    >
                      Riepilogo
                    </Typography>
                  </div>
                </Step>
              </Stepper>
            </div>
                
            {activeStep == 0 && (
              <div>
                <Typography className="my-16 ">
                  Inserisci le informazioni essenziali del progetto
                </Typography>
                <IrFormSection className={"my-8"}>
                  <IrInput
                    label={"Nome del progetto"}
                    {...form.getInputProps("nomeProgetto")}
                  />
                </IrFormSection>
                <IrFormSection className={"my-8"}>
                  <IrTextarea
                    label={"Descrivi brevemente il progetto"}
                    {...form.getInputProps("descrizione")}
                  />
                </IrFormSection>
                <IrFormSection className={"my-8"}>
                  <IrInput
                    label={"Budget complessivo"}
                    {...form.getInputProps("budget")}
                  />
                </IrFormSection>

                {/*  <IrFormSection className={"my-8"}>
                  <IrInput
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={"Seleziona gli operatori coinvolti"}
                  />
                  {op?.map((op, idx) => {
                    return (
                      <div
                        key={idx}
                        className={`cursor-pointer border-2 py-1 px-1 ${
                          form.values.operatori.filter((x) => x.id === o.id)
                            .length
                            ? "text-red-500"
                            : "text-black"
                        }`}
                        onClick={() =>
                          !form.values.operatori.filter((x) => x.id === o.id)
                            .length
                            ? form.insertListItem("operatori", o.id)
                            : form.removeListItem(
                                "operatori",
                                form.values.operatori.indexOf(o)
                              )
                        }
                      >
                        {o.name}
                      </div>
                    );
                  })}
                </IrFormSection> */}
                {/* <IrFormSection className={"my-8"}>
                  <div>{querySp}</div>
                  <IrInput
                    value={querySp}
                    onChange={(e) => setQuerysp(e.target.value)}
                    placeholder={"Seleziona gli spazi coinvolti"}
                  />
                  {sp?.map((o, idx) => {
                    return (
                      <div
                        key={idx}
                        className={`cursor-pointer border-2 py-1 px-1  ${
                          form.values.spazi.filter((x) => x.id === o.id).length
                            ? "text-red-500"
                            : "text-black"
                        }`}
                        onClick={() =>
                          !form.values.spazi.filter((x) => x.id === o.id).length
                            ? form.insertListItem("spazi", o.id)
                            : form.removeListItem(
                                "spazi",
                                form.values.spazi.indexOf(o)
                              )
                        }
                      >
                        {o.name}
                      </div>
                    );
                  })}
                </IrFormSection> */}
                <div className="my-6">
                  <IrFormSection>
                    <label>Seleziona gli spazi coinvolti</label>
                    <div className="flex items-start gap-24">
                      <div className="relative max-w-7xl">
                        <Combobox
                          onChange={(s) => {
                            const o: Spazi = filteredspazi?.filter(
                              (x) => x.name === s
                            )[0]!;
                            !form.values.spazi.filter((x) => x.id === o?.id)
                              .length
                              ? form.insertListItem("spazi", o)
                              : form.removeListItem(
                                  "spazi",
                                  form.values.spazi.indexOf(o!)
                                );
                          }}
                        >
                          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                            <Combobox.Input
                              className="w-full border-none py-2 pl-3 mr-40 text-base leading-5 text-gray-900 focus:ring-0"
                              onChange={(event) =>
                                setQuerysp(event.target.value)
                              }
                              placeholder="Seleziona"
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </Combobox.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery("")}
                          >
                            <Combobox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto bg-white text-base rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-none sm:text-sm">
                              {filteredspazi?.map((o, idx) => (
                                <Combobox.Option
                                  key={idx}
                                  value={o.name}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 ${
                                      active ? "bg-blue-50/50" : ""
                                    }`
                                  }
                                >
                                  {o.name}
                                </Combobox.Option>
                              ))}
                            </Combobox.Options>
                          </Transition>
                        </Combobox>
                      </div>
                      <div>
                        {form.values.spazi.map((x) => (
                          <div
                            className="flex justify-between border-2 px-1 py-1 rounded-md text-base bg-gray-50 cursor-pointer mb-2"
                            key={x.id}
                            onClick={() =>
                              form.removeListItem(
                                "spazi",
                                form.values.spazi.indexOf(x)
                              )
                            }
                          >
                            {x.name}
                            <Image
                              src="/icons/CloseICon.svg"
                              height={12}
                              width={12}
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </IrFormSection>
                </div>
               {/* <div className="my-6">
                  <IrFormSection>
                    <label>Seleziona gli operatori coinvolti</label>
                    <div className="flex items-start gap-24">
                      <div className="relative max-w-7xl">
                        <Combobox
                          onChange={(s) => {
                            const o: Operatori = filteredOperatori?.filter(
                              (x) => x.name === s
                            )[0]!;
                            !form.values.operatori.filter((x) => x.id === o?.id)
                              .length
                              ? form.insertListItem("operatori", o)
                              : form.removeListItem(
                                  "operatori",
                                  form.values.operatori.indexOf(o!)
                                );
                          }}
                        >
                          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
                            <Combobox.Input
                              className="w-full border-none py-2 pl-3 mr-40 text-base leading-5 text-gray-900 focus:ring-0"
                              onChange={(event) => setQuery(event.target.value)}
                              placeholder="Seleziona"
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                              <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </Combobox.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery("")}
                          >
                            <Combobox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto bg-white text-base rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-none sm:text-sm">
                              {filteredOperatori?.map((op, idx) => (
                                <Combobox.Option
                                  key={idx}
                                  value={op.name}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 ${
                                      active ? "bg-blue-50/50" : ""
                                    }`
                                  }
                                >
                                  {op.name}
                                </Combobox.Option>
                              ))}
                            </Combobox.Options>
                          </Transition>
                        </Combobox>
                      </div>
                      <div>
                        {form.values.operatori.map((x) => (
                          <div
                            className="flex justify-between border-2 px-1 py-1 rounded-md text-base bg-gray-50 cursor-pointer mb-2"
                            key={x.id}
                            onClick={() =>
                              form.removeListItem(
                                "operatori",
                                form.values.operatori.indexOf(x)
                              )
                            }
                          >
                            {x.name}
                            <Image
                              src={"/icons/CloseICon.svg"}
                              height={12}
                              width={12}
                              alt=""
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </IrFormSection>
                </div>*/}

                {/* <IrFormSection className={"my-8"}>
                  <Combobox value={selected} onChange={setSelected}>
                    <div className="relative mt-1">
                      <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                          className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                          onChange={(event) => setQuerysp(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2"></Combobox.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuerysp("")}
                      >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                          {querySp !== "" ? (
                            <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                              Nothing found.
                            </div>
                          ) : (
                            //@ts-ignore
                            sp!.map((spazio) => (
                              <Combobox.Option
                                key={spazio.id}
                                className={({ active }) =>
                                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active
                                      ? "bg-teal-600 text-white"
                                      : "text-gray-900"
                                  }`
                                }
                                value={spazio.name}
                              >
                                {({ selected, active }) => (
                                  <>
                                    <span
                                      className={`block truncate ${
                                        selected ? "font-medium" : "font-normal"
                                      }`}
                                    >
                                      {spazio.name}
                                    </span>
                                    {selected ? (
                                      <span
                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                          active
                                            ? "text-white"
                                            : "text-teal-600"
                                        }`}
                                      ></span>
                                    ) : null}
                                  </>
                                )}
                              </Combobox.Option>
                            ))
                          )}
                        </Combobox.Options>
                      </Transition>
                    </div>
                  </Combobox>
                </IrFormSection> */}

                {/* <pre>{JSON.stringify(form.values, null, 2)}</pre> */}
              </div>
            )}
            {activeStep == 1 && <SdgComponent />}
            {activeStep == 2 && <OutcomesSdg />}
            {activeStep == 3 && <IndicatorsList />}
            {activeStep == 4 && <ProgettoTable form={form} />}
            <div className="mt-32 flex justify-between">
              {activeStep != 0 && (
                <Button
                  onClick={() => handlePrev(activeStep!)}
                  disabled={activeStep == 0}
                >
                  Indietro
                </Button>
              )}
              {activeStep != totalSteps - 1 && (
                <Button onClick={() => handleNext(activeStep!)}>Avanti</Button>
              )}
              {activeStep === totalSteps - 1 && (
                <Button
                  onClick={() =>
                    /* directus.request(createItem("impactEvaluation",{
                      name: form.values.nomeProgetto,
                      budget: form.values.budget,
                      sroi, 
                      descrizione: form.values.descrizione,
                      content: JSON.stringify({
                        selectedSDGs,
                        selectedIndicatori,
                        selectedOutcome
                      }),
                      spazi: form.values.spazi.map(x=>({id:x.id!})),
                      operatori: form.values.operatori.map(x=>({id:x.id!})),
                    })).then(()=>{
                    }) */
                    router.push("/progetto")
                  }
                >
                  Salva
                </Button>
              )}
            </div>
          </div>
        </div>}
      </div>
    </>
  );
}

export default ImpactGrid;
