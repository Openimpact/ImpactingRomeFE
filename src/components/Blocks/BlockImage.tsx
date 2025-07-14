"use client";
import React from "react";
import ReactPlayer from "react-player";
import BlockWrapper from "./BlockWrapper";
import BlockTitle from "./BlockTitle";

type Props = {};

function BlockImage({}: Props) {
  return (
    <BlockWrapper>
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <BlockTitle>A Block Image/Video</BlockTitle>
        <div className="mx-auto flex justify-center w-full">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=45if6jkpMPI"
            width={"100%"}
            height={"auto"}
            style={{ aspectRatio: "16/9" }}
          />
        </div>
      </div>
    </BlockWrapper>
  );
}

export default BlockImage;
