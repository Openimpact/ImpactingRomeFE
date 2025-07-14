"use client";
import React, { useCallback, useEffect, useMemo } from "react";
import UploadForm from "@/components/Form/UploadForm";
import { useForm } from "@mantine/form";
import { Operatori } from "@/repos/types";
import {
  useCampoType,
  useProfessioni,
  useSkillType,
} from "@/app/hooks/swrHooks";
import StepperFormSection, {
  createStepperFormAtoms,
} from "../../progetto/StepperFormSection";
import { mutate } from "swr";
import IrMultiselect from "@/components/formComponents/IrMultiselect";
import IrFormSection from "@/components/formComponents/IrFormSection";
import IrInput from "@/components/formComponents/IrInput";
import RegistrazioneEffetuata from "./RegistrazioneEffetuata";
import useDirectus, { directus_user } from "@/app/hooks/directus";
import { createItem } from "@directus/sdk";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";

type Props = {};

const anagraficaId = [
  { required: true, label: "Nome", name: "name", type: "text" },
  {
    required: false,
    label: "Appartieni ad un'associazione?",
    name: "associazione",
    placeholder: "Nome dell'associazione",
    type: "text",
  },
/*  {
    required: true,
    label: "Data di fondazione",
    name: "foundation",
    type: "text",
    placeholder: "GG/MM/AAAA",
  },*/
  {
    required: true,
    label: "Indirizzo (città, via, civico, cap)",
    name: "address",
    type: "text",
  },
  { required: true, label: "Indirizzo email", name: "email", type: "email" },
  {
    required: true,
    label: "Numero di telefono",
    name: "telephone",
    type: "telephone",
  },
];

export const RegisterOperatoriStepperAtomsProps = createStepperFormAtoms(0, 4);

function RegisterOperatore({}: Props) {
  const {
    data: professioni,
    isLoading: professioniLoading,
    error: professioniError,
  } = useProfessioni<{ id: string; name: string }[]>();

  const {
    data: campoType,
    isLoading: campoTypeLoading,
    error: campoTypeError,
  } = useCampoType<{ id: string; name: string }[]>();

  const {
    data: skillType,
    isLoading: skillTypeLoading,
    error: skillTypeError,
  } = useSkillType<{ id: string; name: string }[]>();
  const directus = useDirectus();
  const [user, setUser] = useAtom(directus_user);
  const router = useRouter();
  const form = useForm<Partial<Operatori> & any>({
    validateInputOnChange: true,
    initialValues: {
      name: "",
      address: "",
      associazione: "",
      /*foundation: "",*/
      email: user.email ?? "",
      telephone: "",

      descrizione: "",
      staff: "",
      orari: "",
      campoType: [],
      professionType: [],
      skillType: [],
      main_image: "",
    },
    validate: {
        name: (value) =>
          value.length < 3
            ? "Il nome deve essere composto da almeno 3 lettere"
            : null,

        /*foundation: (value) => {
          const date = new Date(value.split("/").reverse().join("/"));
          const now = new Date();
          if (date > now) {
            return "La data di fondazione deve essere passata";
          }
          return null;
        },*/
        email: (value) =>
          /^\S+@\S+$/.test(value) ? null : "Indirizzo email non valido",
        telephone: (value) =>
          /^(\((00|\+)39\)|(00|\+)39)?(38[890]|34[7-90]|36[680]|33[3-90]|32[89])\d{7}$/.test(
            value
          )
            ? null
            : "Numero non valido",
      campoType: (value) => {
        if (value.length == 0) return "Seleziona almeno 1 elemento";
        if (value.length > 6) return "Seleziona massimo 6 elementi";
        return null;
      },
      skillType: (value) => {
        if (value.length == 0) return "Seleziona almeno 1 elemento";
        if (value.length > 6) return "Seleziona massimo 6 elementi";
        return null;
      },
      professionType: (value) => {
        if (value.length == 0) return "Seleziona almeno 1 elemento";
        if (value.length > 6) return "Seleziona massimo 6 elementi";
        return null;
      },
    },
    /*transformValues: (values) => {
      return {
        ...values,
        foundation: values.foundation.split("/").reverse().join("-"),
      };
    },*/
  });
  const [, nextStep] = useAtom(RegisterOperatoriStepperAtomsProps.nextStepAtom);
  const sendRequest = (values: Partial<Operatori> & any) => {
    console.log("hello from send request");
    console.log(user);
    directus
      .request(
        createItem("operatori", {
          ...values,
          ...(values.associazione != '' && {
            associazioni: [{name: values.associazione}]
          }),
          skillType: values.skillType.map((s: any) => ({
            skill_type_id: s.id,
          })),
          professionType: values.professionType.map((s: any) => ({
            profession_type_id: s.id,
          })),
          campoType: values.campoType.map((s: any) => ({
            campo_type_id: s.id,
          })),
        })
      )
      .then(() => mutate("operatori"))
      .then((res) => {
        nextStep(form);
        return res;
      });
  };

  useEffect(() => {
    console.log(form.values);
  }, [form.values]);

  useEffect(() => {
    console.log(user);
    if (!user) {
      router.push("/");
    }
  }, [user]);

  if (skillTypeError || campoTypeError || professioniError) {
    return "error";
  }

  if (campoTypeLoading || professioniLoading || skillTypeLoading) {
    return "loading";
  }

  function validateStep(stepIndex: number){
    console.log("called validatestep -", stepIndex)
    form.validate()
    switch (stepIndex) {
      case 0 :
        const valid = (form.isValid("name") &&
            form.isValid("foundation") &&
            form.isValid("address") &&
            form.isValid("email") &&
            form.isValid("telephone")
        )
        console.log(valid)
        return valid
      case 1 :
        return (form.isValid("campoType") &&
            form.isValid("professionType") &&
            form.isValid("skillType") )
      case 2 :
        return (form.isValid("main_image"))
      default:
        return false
    }
  }

  return (
    <form
      onSubmit={form.onSubmit(sendRequest)}
      className="mx-auto max-w-7xl px-6 lg:px-8"
    >
      <h1 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 mb-20">
        Iscrizione ad Impacting Rome
      </h1>
      <div className="space-y-12 ">
        <StepperFormSection
          stepperAtoms={RegisterOperatoriStepperAtomsProps}
          form={form}
          validateStep={validateStep}
        >
          <section>
            <div className="my-10 flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold leading-7 text-gray-900">
                Informazioni Generali
              </h2>
              <p className="mt-1 text-base leading-6 text-gray-600">
                Inserisci le tue informazioni generali, non saranno visibili sul
                tuo profilo.
              </p>
            </div>

            <div className="grid gap-x-3 md:gap-x-6 gap-y-8 grid-cols-6">
              <div className="col-start-2 col-end-6">
                <IrFormSection sectionName="Anagrafica">
                  {anagraficaId.map((c, idx) => {
                    switch (c.type) {
                      case "text":
                        return (
                          <IrInput
                            {...c}
                            {...form.getInputProps(`${c.name}`)}
                            key={idx}
                          ></IrInput>
                        );
                      case "email":
                        return (
                          <IrInput
                            {...c}
                            {...form.getInputProps(`${c.name}`)}
                            key={idx}
                          ></IrInput>
                        );
                      case "telephone":
                        return (
                          <IrInput
                            {...c}
                            {...form.getInputProps(`${c.name}`)}
                            key={idx}
                          ></IrInput>
                        );
                      default:
                        return (
                          <IrInput
                            {...c}
                            {...form.getInputProps(`${c.name}`)}
                            key={idx}
                          ></IrInput>
                        );
                    }
                  })}
                </IrFormSection>
              </div>
            </div>
          </section>

          {/* <section>
            <div>
              <div className="my-10 flex flex-col justify-center items-center">
                <h2 className="text-xl font-semibold leading-7 text-gray-900">
                  Maggiori Informazioni
                </h2>
                <p className="mt-1 text-base leading-6 text-gray-600">
                  Inserisci le tue informazioni personali , saranno visili sul
                  tuo profilo.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-x-3 md:gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="md:col-start-2 md:col-end-6">
                  <div className="sm:col-span-4 mt-4">
                    <IrTextarea
                      label="Descrizione"
                      description="Descriviti in massimo 2000 caratteri"
                      {...form.getInputProps(`anagrafica.0.descrizione`)}
                    />
                  </div>
                  <div className="col-span-4 mt-4">
                    <div className="mt-2">
                      <IrTextarea
                        label="Staff"
                        description="Presenta il tuo staff"
                        {...form.getInputProps("staff")}
                      />
                    </div>
                  </div>
                  <div className="col-span-4 mt-4">
                    <div className="mt-2">
                      <IrTextarea
                        label="Orari"
                        description="Elenca gli orari per i giorni della settimana"
                        {...form.getInputProps("orari")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section> */}

          <section>
            <div className="my-10 flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold leading-7 text-gray-900">
                Seleziona le tue aree di interesse
              </h2>
              <p className="mt-1 text-base leading-6 text-gray-600">
                Utilizzeremo queste informazioni per metterti in contatto con
                spazi ed interlocutori interessanti per te e le tue attività.
              </p>
            </div>
            <div className="grid  gap-x-3 md:gap-x-6 gap-y-8 grid-cols-6">
              <div className="col-start-2 col-end-6">
                <IrFormSection>
                  <IrMultiselect
                    form={form}
                    {...form.getInputProps("campoType")}
                    field="campoType"
                    options={campoType!}
                    placeholder="In quale campo creativo lavori?"
                  />

                  <IrMultiselect
                    form={form}
                    {...form.getInputProps("professionType")}
                    field="professionType"
                    options={professioni!}
                    placeholder="Tipologia di professione"
                  />

                  <IrMultiselect
                    {...form.getInputProps("skillType")}
                    form={form}
                    field="skillType"
                    options={skillType!}
                    placeholder="Quali sono le tue competenze?"
                  />
                </IrFormSection>
              </div>
            </div>
          </section>

          <section>
            <div className="my-10 flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold leading-7 text-gray-900">
                Immagine del Profilo
              </h2>
              <p className="mt-1 text-base leading-6 text-gray-600"></p>
            </div>
            <div className="col-span-4 mt-4">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              ></label>
              <div className="mt-2 flex justify-center px-6 py-10">
                <UploadForm
                  value={form.getInputProps("main_image").value}
                  onChange={form.getInputProps("main_image").onChange}
                  error={form.getInputProps("main_image").error}
                />
              </div>
            </div>
          </section>
          <section>
            <RegistrazioneEffetuata />
          </section>
        </StepperFormSection>
      </div>
    </form>
  );
}

export default RegisterOperatore;
