"use client";
import React, { ReactNode } from "react";

type Props = { children: ReactNode; sectionName?: string; className?: string };

const IrFormSection = (props: Props) => {
  return (
    <div className={"col-start-1 col-span-4 pb-10" + props.className}>
      {props.sectionName && (
        <h2 className="mt-6 mb-4 text-base font-semibold leading-7 text-gray-900">
          {props.sectionName}
        </h2>
      )}
      <div className="">
        <fieldset>
          <div className="space-y-6">{props.children}</div>
        </fieldset>
      </div>
    </div>
  );
};

export default IrFormSection;
