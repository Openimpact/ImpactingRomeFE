import React from "react";
import generateEvents from "./generateEvents";
import Link from "next/link";
import { Slide, Carousel } from "./Carousel/Carousel";
import BlockWrapper from "./Blocks/BlockWrapper";
import { directus_url } from "@/repos";
import { useSpaceProfileContext } from "@/app/profile/[id]/spaceProfileContext";

type Props = {};

function CarouselFullWidth({}: Props) {
  const profile = useSpaceProfileContext();
  return (
    <div>
      <Carousel className="lg:ml-[calc(calc(100vw-80rem)/2)] lg:mr-[calc(calc(100vw-80rem)/2)]">
        {profile.data.images.map((item: any, idx: number) => (
          <Slide
            key={idx}
            className=" lg:flex-[0_0_50rem] flex-[0_0_80vw]  rounded-lg overflow-hidden mr-4"
          >
            <Link href="/" className="relative">
              <img
                src={`${directus_url}/assets/${item.directus_files_id}`}
                alt="/"
                style={{
                  width: "100%",
                  objectFit: "cover",
                  aspectRatio: "16/9",
                }}
                className="relative hover:cursor-pointer"
              />
            </Link>
          </Slide>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselFullWidth;
