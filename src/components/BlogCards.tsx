import Image from "next/image";
import react from "react";

const posts = [
  {
    id: 1,
    title: "Conformità",
    href: "#",
    description:
      "Il primo indicatore per la sostenibilità di un’azienda riguarda il rispetto delle leggi e degli standard nazionali e/o internazionali. Ad esempio, un indicatore misurabile (KPI) può essere la quantità di multe ricevute per infrazioni.",
    imageUrl: "/event.jpg",
  },
  {
    id: 2,
    title: "Uso dei materiali e Performance",
    href: "#",
    description:
      "Il secondo KPI introdotto da GreenTire misura le quantità di risorse e materie prime utilizzate, la quantità di rifiuti e le emissioni che ne derivano di conseguenza. Un indicatore che valuta sia la parte ambientale che quella economica dell’azienda, per poterla definire veramente “sostenibile”.",
    imageUrl: "/event.jpg",
  },
  {
    id: 3,
    title: "Effetti",
    href: "#",
    description:
      "Quali sono gli effetti che la tua azienda produce? Qual è il suo impatto ambientale totale? Quali sono le norme di sicurezza che hai adottato per tutelare i lavoratori? Quanti sono stati gli incidenti sul lavoro all’interno dell’organizzazione? Rispondendo a queste e altre domande avrai un’idea più chiara degli effetti della tua azienda in ambito sia sociale che ambientale.",
    imageUrl: "/event.jpg",
  },
];

export default function BlogCards() {
  return (
    <div className="pt-16 mb-20 bg-white h-full w-full md:max-w-[80rem] mx-auto">
      <div className="mx-auto max-w-7xl px-6 md:px-0">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Misurare la sostenibilità con gli indicatori
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Alcuni aspetti della sostenibilità non sono affatto facili da
            misurare, poiché spesso alcuni dati sono cosiddetti “latenti”,
            ovvero non direttamente misurabili. Per questo è importante
            individuare degli indicatori, chiamati anche KPI (Key Performance
            Indicators) che producano dati misurabili attraverso strumenti e
            sistemi chiari e condivisibili.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col items-start justify-between"
            >
              <div className="relative w-full">
                <Image
                  src={post.imageUrl}
                  width={500}
                  height={500}
                  alt=""
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 ">
                    <span className="absolute inset-0" />
                    {post.title}
                  </h3>
                  <p className="mt-5 line-clamp-3 text-base leading-6 text-gray-600">
                    {post.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
