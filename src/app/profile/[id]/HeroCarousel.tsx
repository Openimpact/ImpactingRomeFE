import React from "react";
import { directus_url } from "@/repos";
import { useSpaceProfileContext } from "./spaceProfileContext";
import CarouselFullWidth from "@/components/CarouselFullWidth";

type Props = {};

function Hero({}: Props) {
  const profile = useSpaceProfileContext();
  console.log(profile);
  return (
    <div
      className="relative 
    flex flex-col justify-center overflow-hidden  h-screen py-16 "
    >
      <img
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        src={`${directus_url}/assets/${profile?.data?.main_image}`}
      />
      <div className="mt-0 mb-24">
        <CarouselFullWidth />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/40" />
      <div className="w-full md:max-w-[80rem] mx-auto px-4">
        <h2 className=" text-3xl bottom z-10 max-w-[45ch] text-white">
          {profile?.data?.type[0].spazi_type_id?.name}
        </h2>
        <h1 className="font-semibold text-6xl bottom z-10 mb-8 text-white">
          {profile?.data?.name}
        </h1>
        <h2 className=" text-3xl bottom z-10 max-w-[45ch] text-white">
          {profile?.data?.formatted_address}
        </h2>
      </div>
    </div>
  );
}

export default Hero;
