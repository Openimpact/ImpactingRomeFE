"use client";
import React, { useMemo } from "react";
import "survey-core/defaultV2.min.css";
import { Model } from "survey-core";
import StepperFormSection, {createStepperFormAtoms} from "./StepperFormSection";
import { Survey } from "survey-react-ui";
import UploadForm from "@/components/Form/UploadForm";
import IrCheckBox from "@/components/formComponents/IrCheckBox";
import IrFormSection from "@/components/formComponents/IrFormSection";
import IrInput from "@/components/formComponents/IrInput";
import IrTextarea from "@/components/formComponents/IrTextarea";
import {useForm} from "@mantine/form";

type Props = {};

const surveyJson = {
  elements: [
    {
      name: "FirstName",
      title: "Enter your first name:",
      type: "text",
    },
    {
      name: "LastName",
      title: "Enter your last name:",
      type: "text",
    },
    {
      name: "FirstName",
      title: "Enter your first name:",
      type: "text",
    },
    {
      name: "LastName",
      title: "Enter your last name:",
      type: "text",
    },
  ],
};

const anagraficaId = [
  "Nome",
  "Cognome",
  "Data di nascita",
  "Residenza (città, via, civico, cap)",
  "Genere",
  "Indirizzo mail",
  "Numero di telefono",
];

const lavoro = [
  "Architettura",
  "Arte",
  "Art and craft",
  "Arti performative",
  "Audiovisivo",
  "Beni culturali",
  "Design",
  "Divulgazione culturale",
  "Editoria e comunicazione",
  "Innovazione tecnologica",
  "Moda",
  "Musica",
  "Spazio di comunità",
  "Altro",
];

const professione = [
  "Amministrazione | Gestione | Direzione",
  "Architettura | Decorazione | Scenografia",
  "Artistico | Creativo",
  "Diffusione | distribuzione",
  "Comunicazione | PR",
  "Produzione | Programmazione",
  "Suono | Immagine | Direzione tecnica | Regia",
  "Web design| Multimedia | Grafica",
  "Insegnamento | Ricerca",
  "Altro",
];

const competenze = [
  "Architettura",
  "Art director",
  "Arts and craft",
  "Ballerin*",
  "Budgeting",
  "Cantant*",
  "Cinema e animazione",
  "Community mangement",
  "Comunicazione e promozione",
  "Curatoria",
  "Design",
  "Design delle organizzazioni",
  "Direzione di scena",
  "Formazione",
  "Fotografia",
  "Grafica",
  "Illustrazione",
  "Istallazioni",
  "Light design",
  "Moda",
  "Musicist*",
  "Organizzazione eventi",
  "Politiche europee/nazionali/regionali per la cultura",
  "Politiche, fondi, iniziative e programmi comunitari",
  "Produzione",
  "Progettazione",
  "Project Management",
  "Recitazione",
  "Regia",
  "Sartoria",
  "Scenografia",
  "Scultura",
  "Sociologia dell’ambiente e del territorio",
  "Tecnico audio",
  "Tecnico luci",
  "Tecnico camera",
  "Upcycling",
  "Urban design",
  "UX Design",
  "Videomaking",
  "Videomapping",
];

const tipologiaService = [
  "Americane",
  "Aria condizionata",
  "Bar - Ristorante",
  "Cabina regia",
  "Frigorifero",
  "Impianto audio",
  "Lavagna a fogli mobili",
  "Lavagna interattiva",
  "Microfoni",
  "Palco mobile",
  "Passerella per sfilate",
  "PC",
  "Pulizia",
  "Schermo",
  "Servizio catering",
  "Video proiettore",
  "Wifi",
  "CNC",
  "Laser Cutter",
  "Stampante 3D",
  "Strumenti per lavorare ceramica",
  "Strumenti per lavorare ferro",
  "Altro",
];

const stepperAtomsProps =  createStepperFormAtoms(0, 4);
function CreaUnProgetto({}: Props) {
  const survey = new Model(surveyJson);
  const form = useForm<any>({})
  return (
    <form className="mx-auto max-w-7xl px-6 lg:px-8 mb-10">
      <div className="space-y-12 mt-24">
        <StepperFormSection stepperAtoms={stepperAtomsProps} form={form}>
          <section>
            <div className="my-10 flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold leading-7 text-gray-900">
                Informazioni Generali
              </h2>
              <p className="mt-1 text-l leading-6 text-gray-600">
                Inserisci le tue informazioni personali , saranno visili sul tu
                profilo.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6 md:col-start-2 md:col-end-6">
              <div className="md:col-start-2 md:col-end-6">
                <IrFormSection sectionName="Anagrafica">
                  {anagraficaId.map((c, idx) => (
                    <IrInput label={c} key={idx}></IrInput>
                  ))}
                </IrFormSection>
                <div className="sm:col-span-4 mt-4">
                  <IrTextarea
                    label="Descrizione"
                    description="Descriviti in massimo 2000 caratteri"
                  />
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="my-10 flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold leading-7 text-gray-900">
                CheckBoxes
              </h2>
              <p className="mt-1 text-l leading-6 text-gray-600">
                Inserisci le tue informazioni personali , saranno visili sul tu
                profilo.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-6">
              <div className="md:col-start-2 md:col-end-6">
                <IrFormSection sectionName="In quale campo creativo lavori?">
                  {lavoro.map((att, idx) => (
                    <IrCheckBox label={att} key={idx}></IrCheckBox>
                  ))}
                </IrFormSection>

                <IrFormSection sectionName="Tipologia di professione">
                  {professione.map((pro, idx) => (
                    <IrCheckBox label={pro} key={idx}></IrCheckBox>
                  ))}
                </IrFormSection>

                <IrFormSection sectionName="Quali sono le tue competenze?">
                  {competenze.map((competenza, idx) => (
                    <IrCheckBox label={competenza} key={idx}></IrCheckBox>
                  ))}
                </IrFormSection>
              </div>
            </div>
          </section>
          <section>
            <div className="my-10 flex flex-col justify-center items-center">
              <h2 className="text-xl font-semibold leading-7 text-gray-900">
                Survey
              </h2>
              <p className="mt-1 text-l leading-6 text-gray-600">
                Inserisci le tue informazioni personali , saranno visili sul tu
                profilo.
              </p>
            </div>
            <Survey model={survey} />
          </section>
          <section>
            <div>
              <div className="my-10 flex flex-col justify-center items-center">
                <h2 className="text-xl font-semibold leading-7 text-gray-900">
                  Image Upload
                </h2>
                <p className="mt-1 text-l leading-6 text-gray-600">
                  Inserisci le tue informazioni personali , saranno visili sul
                  tu profilo.
                </p>
              </div>
              <UploadForm onChange={()=>{}} />
            </div>
          </section>
        </StepperFormSection>
      </div>
    </form>
  );
}

export default CreaUnProgetto;
