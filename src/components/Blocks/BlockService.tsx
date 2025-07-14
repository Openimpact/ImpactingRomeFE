import React from "react";
import Image from "next/image";
import ServiziIcons from "./ServiziIcons.json";
import BlockWrapper from "./BlockWrapper";
import BlockTitle from "./BlockTitle";

type Props = {};

function BlockService({}: Props) {
  return (
    <BlockWrapper className="">
      <BlockTitle>Services</BlockTitle>
      <div className="flex md:justify-center md:items-center">
        <div className="grid grid-cols-3 md:grid-cols-9 gap-16 md:px-8 px-8 md:my-0">
          {ServiziIcons.icons.map((icon, idx) => {
            return (
              <div key={idx}>
                <div className="flex flex-col justify-center items-center">
                  <Image
                    src={icon.imageUrl}
                    alt={icon.name}
                    width={32}
                    height={32}
                  />
                  <h3>{icon.name}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BlockWrapper>
  );
}

export default BlockService;
