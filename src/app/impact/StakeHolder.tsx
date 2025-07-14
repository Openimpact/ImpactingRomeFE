import React from "react";
import { Select, Option } from "@material-tailwind/react";
import IrSelect from "@/components/formComponents/IrSelect";

type Props = {
  stakeHolderName: string;
  options: {
    name: string;
  }[];
};

function StakeHolder({ stakeHolderName, options }: Props) {
  return (
    <div className="flex w-72 flex-col gap-6">
      <IrSelect
          label={stakeHolderName}
          name={stakeHolderName}
          error={undefined}
          options={options.map(x=>({value:x.name,name:x.name}))}
      />
    </div>
  );
}

export default StakeHolder;
