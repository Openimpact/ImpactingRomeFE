import React from "react";
import NavBar from "@/components/NavBar";
import BlockText from "@/components/Blocks/BlockText";
import BlockCarousel from "@/components/Blocks/BlockCarousel";
import BlockImage from "@/components/Blocks/BlockImage";
import BlockModal from "@/components/Blocks/BlockModal";
import BlockForm from "@/components/Blocks/BlockForm";
import BlockContact from "@/components/Blocks/BlockContact";
import BlockService from "@/components/Blocks/BlockService";
import CarouselFullWidth from "@/components/CarouselFullWidth";

type Props = {};

function ProfileGrid({}: Props) {
  return (
    <>
      <main className="pt-16 bg-white h-full w-full md:max-w-[80rem] mx-auto">
        <div>
          <div className="mt-2"></div>
          <div className="w-screen lg:-mx-[calc(calc(100vw-80rem)/2)] mt-2">
            <CarouselFullWidth />
          </div>
          <div className="flex flex-col lg:grid lg:grid-cols-1 gap-4 mt-2">
            <BlockContact />
          </div>
        </div>
      </main>
    </>
  );
}

export default ProfileGrid;
