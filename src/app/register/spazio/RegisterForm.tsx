"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import UploadForm from "@/components/Form/UploadForm";
import dynamic from "next/dynamic";
import { useForm } from "@mantine/form";
import { Spazi } from "@/repos/types";
import {
  useAttivita,
  useDotazioni,
  usePossibilita,
  useTipologia,
  useTipologiaType,
} from "@/app/hooks/swrHooks";
import StepperFormSection, {
  createStepperFormAtoms,
} from "../../progetto/StepperFormSection";
import IrInput from "@/components/formComponents/IrInput";
import IrFormSection from "@/components/formComponents/IrFormSection";
import IrMultiselect from "@/components/formComponents/IrMultiselect";
import IrTextarea from "@/components/formComponents/IrTextarea";
import { useAtom } from "jotai";
import {createItem} from "@directus/sdk";
import useDirectus from "@/app/hooks/directus";
import {mutate} from "swr";
import RegistrazioneEffetuata from "@/app/register/operatore/RegistrazioneEffetuata";

const GeocodedMap = dynamic(() => import("@/components/GeocodedMap"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
type Props = {};

const anagraficaId = [
  { label: "Nome", name: "name" },
  { label: "Indirizzo", name: "address" },
  { label: "Citta", name: "citta" },
  { label: "Cap / Codice Postale", name: "cap" },
  { label: "Provincia", name: "provincia" },
  { label: "Indirizzo mail", name: "email" },
  { label: "Numero di telefono", name: "telephone" },
];

const stepperAtomsProps = createStepperFormAtoms(0, 5);
function RegisterForm({}: Props) {
  const {
    data: dotazioni,
    isLoading: dotazioniLoading,
    error: dotazioniError,
  } = useDotazioni<{ id: string; name: string }[]>();

  const {
    data: possibilita,
    isLoading: possibilitaLoading,
    error: possibilitaError,
  } = usePossibilita<{ id: string; name: string }[]>();

  const {
    data: attivita,
    isLoading: attivitaLoading,
    error: attivitaError,
  } = useAttivita<{ id: string; name: string }[]>();

  const {
    data: tipologia,
    isLoading: tipologiaLoading,
    error: tipologiaError,
  } = useTipologia<{ id: string; name: string }[]>();

  const {
    data: tipologiaType,
    isLoading: tipologiaTypeLoading,
    error: tipologiaTypeError,
  } = useTipologiaType<{ id: string; name: string }[]>();

  const form = useForm<Partial<Spazi> & any>(
      {
        validateInputOnChange:true,
    initialValues: {
      anagrafica: [
        {
          name: "",
          address: "",
          cap: "",
          citta: "Roma",
          provincia: "",
          email: "",
          telephone: "",
        },
      ],
      descrizione: "",
      contatti: "",
      staff: "",
      orari: "",
      dotazioniType: [],
      tipologia: [],
      tipologiaType: [],
      possibilitaType: [],
      attivitaType: [],
      main_image: "",
      video: "",
    },
    validate: {
      anagrafica: {
        name: (value) => value.length < 3 ? "Name must have at least 3 letters" : null,
        provincia: (value) => value.length < 3 ? "Name must have at least 3 letters" : null,
        email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalido email"),
        telephone: (value) => /^\+?[1-9][0-9]{7,14}$/.test(value) ? null : "Invalido numero",
        cap: (value) => (/^[0-9]{5}/.test(value) ? null : "Invalido Cap"),
        address: (value) => value.length < 3 ? "Name must have at least 3 letters" : null,
      },
      dotazioniType: (value) => {
        if (value.length == 0) return "Seleziona almeno 1 elemento";
        if (value.length > 3) return "Seleziona massimo 3 elementi";
        return null;
      },
      attivitaType: (value) => {
        if (value.length == 0) return "Seleziona almeno 1 elemento";
        if (value.length > 3) return "Seleziona massimo 3 elementi";
        return null;
      },
      tipologiaType: (value) => {
        if (value.length == 0) return "Seleziona almeno 1 elemento";
        if (value.length > 3) return "Seleziona massimo 3 elementi";
        return null;
      },
      tipologia: (value) => {
        if (value.length == 0) return "Seleziona almeno 1 elemento";
        if (value.length > 3) return "Seleziona massimo 3 elementi";
        return null;
      },
      possibilitaType: (value) => {
        if (value.length == 0) return "Seleziona almeno 1 elemento";
        if (value.length > 3) return "Seleziona massimo 3 elementi";
        return null;
      },
      descrizione: (value) => value.length < 2001 ? null : "Superato il limite di parole disponibili",
      /*video: (value) => /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/.test(
          value
        )
          ? null
          : "Invalid Url",*/
    },
  });
  const [, nextStep] = useAtom(stepperAtomsProps.nextStepAtom);
  const directus = useDirectus();

  const sendRequest = (values: Partial<Spazi> & any) => {
    console.log("called")
    if(form.validate().hasErrors) console.log(form.validate())
    directus
        .request(
            createItem("spazi", {
            ...values,
            dotazioniType: values.dotazioniType.map((s: any) => ({
              dotazioni_type_id: s.id,
            })),
            attivitaType: values.attivitaType.map((s: any) => ({
              attivita_type_id: s.id,
            })),
            tipologia: values.tipologia.map((s: any) => ({
              tipologia_type_id: s.id,
            })),
            tipologiaType: values.tipologiaType.map((s: any) => ({
              tipologiaType_type_id: s.id,
            })),
            possibilitaType: values.possibilitaType.map((s: any) => ({
              possibilita_type_id: s.id,
            })),
        }))
        .then(() => mutate("spazi"))
        .then((res) => {
          nextStep(form);
          return res;
        });
  };

  useEffect(() => {
    console.log(form.values);
  }, [form.values]);

  if (
    tipologiaError ||
    tipologiaTypeError ||
    attivitaError ||
    possibilitaError ||
    dotazioniError
  ) {
    return "error";
  }

  if (
    tipologiaLoading ||
    tipologiaTypeLoading ||
    attivitaLoading ||
    possibilitaLoading ||
    dotazioniLoading
  ) {
    return "loading";
  }

  return (
    <form
      onSubmit={form.onSubmit(sendRequest)}
      className="mx-auto max-w-7xl px-6 lg:px-8 relative"
    >
      <div className="space-y-12 mt-24">
        <StepperFormSection stepperAtoms={stepperAtomsProps} form={form}>
          <section>
            <div className="my-10 flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold leading-7 text-gray-900">
                Informazioni Generali
              </h2>
              <p className="mt-1 text- leading-6 text-gray-600">
                Inserisci le informazioni dello spazio , saranno visili sul tu
                profilo.
              </p>
            </div>
            <div className="my-10 grid grid-cols-1 gap-x-3 md:gap-x-6 gap-y-8 md:grid-cols-6">
              <div className="col-start-2 col-end-6">
                <IrFormSection sectionName="Anagrafica Spazio">
                  {anagraficaId.map((c, idx) => (
                    <>
                      <IrInput
                        {...c}
                        {...form.getInputProps(`anagrafica.0.${c.name}`)}
                        key={idx}
                      ></IrInput>
                    </>
                  ))}
                </IrFormSection>
              </div>
            </div>
          </section>

          <section>
            <div className="my-10 grid grid-cols-1 gap-x-3 md:gap-x-6 gap-y-8 md:grid-cols-6">
              <div className="col-start-2 col-end-6">
                <div className="flex flex-col justify-center items-center mb-10">
                  <h2 className="text-xl font-semibold leading-7 text-gray-900">
                    Maggiori Informazioni
                  </h2>
                  <p className="mt-1 text- leading-6 text-gray-600">
                    Inserisci le informazioni dello spazio , saranno visili sul
                    tu profilo.
                  </p>
                </div>
                <IrTextarea
                  label="Descrizione"
                  description="Descrivi il tuo spazio in 2000 caratteri"
                  {...form.getInputProps("descrizione")}
                />
              </div>

              <div className="col-start-2 col-end-6">
                <div className="mt-2">
                  <IrTextarea
                    label="Contatti"
                    description="Inserisci i recapiti di un referente per le prenotazioni"
                    {...form.getInputProps("contatti")}
                    // required
                  />
                </div>
              </div>
              <div className="col-start-2 col-end-6">
                <div className="mt-2">
                  <IrTextarea
                    label="Staff"
                    description="Presenta il tuo staff"
                    {...form.getInputProps("staff")}
                    //required
                  />
                </div>
              </div>
              <div className="col-start-2 col-end-6">
                <div className="mt-2">
                  <IrTextarea
                    label="Orari"
                    description="Elenca gli orari per i giorni della settimana"
                    {...form.getInputProps("orari")}
                    // required
                  />
                </div>
              </div>
              <div className="col-start-2 col-end-6">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Video (URL di Youtube oppure Vimeo)
                </label>
                <div className="mt-2">
                  <input
                    id="videoUrl"
                    name="videoUrl"
                    type="text"
                    autoComplete="videoUrl"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    {...form.getInputProps("video")}
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="my-10 flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold leading-7 text-gray-900">
                Image Upload
              </h2>
              <p className="mt-1 text-l leading-6 text-gray-600">
                Inserisci le tue informazioni personali , saranno visili sul tu
                profilo.
              </p>
            </div>
            <label
              htmlFor="photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            ></label>
            <div className="mt-2 flex justify-center px-6 py-10">
              <UploadForm
                value={form.getInputProps("main_image").value}
                onChange={form.getInputProps("main_image").onChange}
              />
            </div>
          </section>

          <section>
            <div className="my-10 flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold leading-7 text-gray-900">
                Seleziona i propri campi
              </h2>
              <p className="mt-1 text-l leading-6 text-gray-600">
                Inserisci le tue informazioni personali , saranno visili sul tu
                profilo.
              </p>
            </div>
            <div className="my-10 grid grid-cols-1 gap-x-3 md:gap-x-6 gap-y-8 md:grid-cols-6">
              <div className="col-start-2 col-end-6">
                <IrFormSection>
                  <IrMultiselect
                    form={form}
                    {...form.getInputProps("attivitaType")}
                    field="attivitaType"
                    options={attivita!}
                    placeholder="Attività prevalente svolta nello spazio"
                  />
                  <IrMultiselect
                    form={form}
                    {...form.getInputProps("tipologia")}
                    field="tipologia"
                    options={tipologia!}
                    placeholder="Tipologia di spazio"
                  />
                  <IrMultiselect
                    {...form.getInputProps("tipologiaType")}
                    form={form}
                    field="tipologiaType"
                    options={tipologiaType!}
                    placeholder="Tipologia di sale a disposizione"
                  />
                  <IrMultiselect
                    {...form.getInputProps("dotazioniType")}
                    form={form}
                    field="dotazioniType"
                    options={dotazioni!}
                    placeholder="Tipologia di dotazioni o servizi dello spazio"
                  />
                  <IrMultiselect
                    {...form.getInputProps("possibilitaType")}
                    form={form}
                    field="possibilitaType"
                    options={possibilita!}
                    placeholder="Cosa si può fare nel tuo spazio"
                  />
                </IrFormSection>
              </div>
              {/*<div className="md:col-start-2">
                 <GeocodedMap
                  positionInfos={["via gelso, 6 Salerno"]}
                ></GeocodedMap>
              </div>*/}
            </div>
          </section>
          <section>
            <RegistrazioneEffetuata />
          </section>

          {/*  <div className="grid grid-cols-1 gap-x-3 md:gap-x-6 gap-y-8 md:grid-cols-6">
            <div className="my-6 fixed bottom-0 right-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Salva
              </button>
            </div>
          </div> */}
        </StepperFormSection>
      </div>
    </form>
  );
}

export default RegisterForm;
