import Image from "next/image";
import React from "react";

type Props = {};

const data = [
  {
    sectionName: "Valuta il tuo impatto",
    title:
      "Attraverso Impacting Rome connettiamo gli spazi della capitale con gli operatori della cultura.",
    description:
      "Vogliamo rendere Roma una città dove gli spazi sottoutilizzati ed inutilizzati trovino nuove possibilità per crescere e rigenerarsi attraverso la cura delle persone che li vivranno. Il nostro strumento per la misurazione d’impatto consente gratuitamente di valutare le performance sociali ed ambientali dei progetti culturali e supporta così organizzazioni ed individui a progettare in maniera sostenibile e efficace.",
    imageUrl: "/impact2.jpg",
  },
];

function ImageLeft({}: Props) {
  return (
    <div className="py-16 bg-white flex justify-center items-center w-full md:max-w-[80rem] mx-auto">
      {data.map((a, idx) => {
        return (
          <div className="flex flex-col md:flex-row" key={idx}>
            <Image
              src={a.imageUrl}
              height={800}
              width={500}
              alt="image"
              className="h-[40rem] rounded-[30rem] md:w-1/2 md:mx-auto lg:mx-0 lg:w-1/3 flex-shrink-0 text-center relative mb-10 lg:mb-0 object-cover"
            />
            <div className="flex flex-col px-10 justify-center md:px-0 lg:px-10 lg:mx-24 mt-5  md:mt-0">
              <h1 className="text-sm uppercase font-semibold tracking-wide inline text-gray-600">
                {a.sectionName}
              </h1>
              <h2 className="text-2xl md:text-4xl font-display leading-tight font-semibold text-black mb-4 mt-2 underline">
                {a.title}
              </h2>
              <p className="lg:text-xl font-display">{a.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ImageLeft;
