import Link from "next/link";
import React from "react";

const data = [
  {
    title: "Sei un operatore della cultura? Cerchi uno spazio per i tuoi progetti?",
    description:
      "Registrandoti potrai entrare in contatto con gli spazi disponibili e collaborare con altri operatori culturali.",
    buttonName: "Crea il tuo profilo",
    buttonLink: "/signup/operatori",
  },
  {
    title: "Hai uno spazio a disposizione? Vuoi condividerlo con altri operatori culturali?",
    description:
      "Registrandoti potrai entrare in contatto con gli operatori culturali e collaborare con loro. Non perdere l'occasione di far conoscere il tuo spazio!",
    buttonName: "Registra il tuo spazio",
    buttonLink: "/signup/spazi",
  },
    {
    title: "Hai in mente un nuovo progetto? Vuoi valutarne l'impatto sociale?",
    description:
      "Grazie al nostro stumento di valutazione potrai creare una scheda di valutazione del tuo progetto.",
    buttonName: "Valuta l'impatto generato",
    buttonLink: "/impact",
  },
];

export default function CtaSection() {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900 text-white text-center min-h-screen" >
      <img className="w-full h-full object-cover object-bottom lg:object-center absolute z-0 scale-[1.8] -translate-y-[30vh] md:scale-100 md:translate-y-0" src="https://images.unsplash.com/photo-1603105722273-98bacd29ed70?q=80&w=2660&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt=""
       />
      <div className="h-full w-full absolute opacity-80 md:opacity-70 z-0"
          style={{
            "background":"linear-gradient(39deg, rgba(72,32,120,1) 0%, rgba(170,14,14,1) 50%, rgba(255,149,0,1) 100%)"
          }}></div>


      <div className="py-12 md:pt-24 relative z-10 flex flex-col md:flex-row justify-start gap-16 md:max-w-[80rem] mx-auto">
      <h1 className="px-6 lg:px-6 py-6 md:pt-24 text-left text-6xl md:text-6xl lg:text-8xl font-bold  tracking-tight text-white">
            Impacting Rome<br></br><span className="text-[.5em] md:text-[.65em] font-light inline-block max-w-[20ch] mt-8">Ecosistema digitale per un migliore accesso alla cultura</span>
          </h1>
      </div>
      <div className=" py-6 md:py-10  md:mt-32 px-6 sm:py-8 md:px-8 relative z-10  backdrop-blur-sm "
        style={{
          "background":"rgba(0,0,0,0.3)",
        }}
      >
        <div className="md:max-w-[80rem] mx-auto flex flex-col md:flex-row  space-around gap-16">

        {data.map((a, idx) => {
          return (
            <div className="mx-auto max-w-2xl text-left " key={idx}>
              <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                {a.title}
                <br />
              </h1>
              <p className="mt-6 max-w-xl text-lg hidden md:block text-white">
                {a.description}
              </p>
              <div className="mt-10 flex items-start justify-start gap-x-6">
                <Link
                  href={a.buttonLink}
                  className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                  {a.buttonName}
                </Link>
              </div>
            </div>
          );
        })}
        </div>
      </div>

    </div>
  );
}

