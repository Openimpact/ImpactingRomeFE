import React from "react";
import Image from "next/image";

type Props = {
  image: string;
  title: string;
};

function HeroCercaSection({ image, title }: Props) {
  return (
    <div className="relative overflow-hidden flex flex-col justify-end z-20 h-[25rem] py-16 ">
      <Image
        className="absolute inset-0 -z-10 h-full w-full object-cover object-center"
        fill={true}
        src={image}
        alt={title}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      <div className="w-full md:max-w-[80rem] mx-auto px-4 flex flex-col justify-center h-full">
        <h1 className="font-semibold text-6xl z-10 text-white text-center mt-8">
          {title}
        </h1>
      </div>
    </div>
  );
}

export default HeroCercaSection;
