import React from "react";
import generateEvents from "../../components/generateEvents";
import Link from "next/link";
import { Slide, Carousel } from "../../components/Carousel/Carousel";
import BlockWrapper from "./BlockWrapper";
import { directus_url } from "@/repos";
import { useSpaceProfileContext } from "@/app/profile/[id]/spaceProfileContext";

type Props = {};

function BlockCarousel({}: Props) {
  const profile = useSpaceProfileContext();
  return (
    <div>
      <Carousel className="">
        {profile.data.images.map((item:any, idx:number) => (
          <Slide
            key={idx}
            className=" md:flex-[0_0_calc(50%-.25rem)] flex-[0_0_50%] rounded-lg overflow-hidden mr-1"
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

export default BlockCarousel;
