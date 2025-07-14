import IrFormSection from "@/components/formComponents/IrFormSection";
import React from "react";

type Props = {
  proxyName: string;
  proxySource: string;
  proxyValue: string;
};

function Proxy({ proxyName, proxySource, proxyValue }: Props) {
  return (
    <div className="grid grid-cols-1 gap-x-3 md:gap-x-6 gap-y-8 md:grid-cols-5 bg-gray-200 rounded-xl">
      <div className="col-start-2 col-end-6">
        <IrFormSection sectionName="Proxy">
          <h2>{proxyName}</h2>
          <h2>{proxySource}</h2>
          <h2>{proxyValue}</h2>
        </IrFormSection>
      </div>
    </div>
  );
}

export default Proxy;
