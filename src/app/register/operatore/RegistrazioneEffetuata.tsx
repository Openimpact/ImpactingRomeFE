import React from "react";
import Image from "next/image";
import circle from "../../../../public/icons/circle-done.svg";
import Link from "next/link";

type Props = {};

function RegistrazioneEffetuata({}: Props) {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="flex justify-center items-center">
        <Image src={circle} alt="circle-done" width={42} height={42} />
      </div>
      <div className="text-center">
        <h1 className="mt-4 md:text-2xl text-xl w-[20ch] md:w-[30ch] font-bold tracking-tight text-gray-900 sm:text-5xl">
          La tua registrazione è andata a buon fine.
        </h1>
        <Link href={"/"} className="font-bold text-xl">
          Torna alla home
        </Link>
        {/* <h1 className="mt-4 md:text-xl text-lg  tracking-tight text-gray-900 sm:text-5xl">
          Sarai ricontattato al più presto.
        </h1> */}
      </div>
    </main>
  );
}

export default RegistrazioneEffetuata;
