"use client";
import { Disclosure } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { ActionTypes, IAction } from "./FiltersReducer";

type Props = {
  className?: string;
  dispatch: React.Dispatch<IAction>;
  filters: {
    id: string;
    name: string;
    kind: string;
    options: { label: string; value: string; checked: boolean }[];
  }[];
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function FiltersAccordion({ className, dispatch, filters }: Props) {
  return (
    <form className={"sticky top-0" + " " + className}>
      {filters.map((section) => (
        <Disclosure
          as="div"
          key={section.id}
          className="border-b border-gray-200 py-6"
        >
          {({ open }) => (
            <>
              <h3 className="-my-3 flow-root">
                <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                  <span className="font-medium text-gray-900">
                    {section.name}
                  </span>
                  <span className="ml-6 flex items-center">
                    {open ? (
                      <MinusIcon className="h-5 w-5" aria-hidden="true" />
                    ) : (
                      <PlusIcon className="h-5 w-5" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </h3>
              <Disclosure.Panel className="pt-6">
                <div className="space-y-4">
                  {section.options.map((option, optionIdx) => (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${section.id}-${optionIdx}`}
                        name={`${section.id}[]`}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        onChange={(e) => {
                          const check = e.target.checked;
                          //console.log(option.label, check);
                          dispatch({
                            type: ActionTypes.SET_FILTER,
                            payload: {
                              key: section.name,
                              value: option.value,
                              kind: section.kind,
                            },
                          });
                          dispatch({
                            type: ActionTypes.FILTER_DATA,
                            payload: {},
                          });
                        }}
                      />
                      <label
                        htmlFor={`filter-${section.id}-${optionIdx}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label ?? option.value}
                      </label>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </form>
  );
}

export default FiltersAccordion;
