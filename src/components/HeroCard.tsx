import Link from "next/link";
import Image from "next/image";
import React from "react";
import arrow from "../../public/icons/arrow.svg";

type Props = {
  image: string;
  title: string;
  link: string;
};

function HeroCard({ image, title, link }: Props) {
  return (
    <div className="h-full w-full relative flex items-end cursor-pointer overflow-hidden opacity-90 group hover:opacity-100">
      <Link href={link} className="z-10 w-full px-6 mb-20">
        <Image
          fill={true}
          src={image}
          alt="random"
          className="h-full w-full absolute object-cover group-hover:transition duration-300 ease-in-out group-hover:scale-105"
        />
        <div className="relative">
          <div className="w-full flex justify-between">
            <h1 className="font-semibold text-5xl z-10 text-white w-1/2">
              {title}
            </h1>
            <Image
              src={arrow}
              width={42}
              height={42}
              alt="arrow"
              className="transition-transform ease-in-out duration-300 group-hover:transform group-hover:translate-x-3"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default HeroCard;
