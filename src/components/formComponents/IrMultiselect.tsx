import { Listbox, ListboxProps } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { UseFormReturnType } from "@mantine/form";
import React from "react";
import ErrorLabel from "./ErrorLabel";

type Props = {
  form: UseFormReturnType<any, (values: any) => any>;
  field: string;
  options: { id: string; name: string }[];
  placeholder: string;
  error?: string;
};

function IrMultiselect({
  form,
  field,
  options,
  placeholder,
  error,
  ...rest
}: Props &
  Omit<ListboxProps<"div", string, { value: string; label: string }>, "form">) {
  return (
    <Listbox as="div" {...rest} multiple className="relative my-4 max-w-7xl ">
      <Listbox.Button className="relative flex flex-wrap w-full max-w-7xl cursor-default  bg-white  pl-3 pr-10 text-left  rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-none sm:text-sm">
        <span className="leading-6">
          {placeholder}
          {form.values[field].map((opt: any, idx: number) => (
            <span className="bg-blue-50/50 rounded-lg mx-1 px-2 py-1" key={idx}>
              {opt.name}
            </span>
          ))}
        </span>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </span>
      </Listbox.Button>
      <ErrorLabel error={error} />
      <Listbox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto bg-white text-base rounded-md border-0 py-1.5 text-gray-900 shadow-lg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-none sm:text-sm">
        {options.map((ct: any, idx: number) => (
          <Listbox.Option
            key={idx}
            className={({ active }) =>
              `relative cursor-default select-none py-2 pl-10 pr-4 text-gray-900 ${
                active ? "bg-blue-50/50" : ""
              }`
            }
            value={ct}
          >
            {({ selected }) => (
              <>
                <span
                  className={`block truncate ${
                    selected ? "font-bold" : "font-normal"
                  }`}
                >
                  {ct.name}
                </span>
                {selected ? (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-300">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                ) : null}
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}

export default IrMultiselect;
