"use client";
import HeroCercaSection from "@/components/HeroCercaSection";
import { useRef, useState } from "react";

const progetti = [
  {
    progetto: "Lindsay Walton",
    location: "Roma",
    email: "lindsay.walton@example.com",
    data: "15-09-2014",
  },
  {
    progetto: "Lindsay Walton",
    location: "Roma",
    email: "lindsay.walton@example.com",
    data: "15-09-2014",
  },
  {
    progetto: "Lindsay Walton",
    location: "Roma",
    email: "lindsay.walton@example.com",
    data: "15-09-2014",
  },
  {
    progetto: "Lindsay Walton",
    location: "Roma",
    email: "lindsay.walton@example.com",
    data: "15-09-2014",
  },
  {
    progetto: "Lindsay Walton",
    location: "Roma",
    email: "lindsay.walton@example.com",
    data: "15-09-2014",
  },
  {
    progetto: "Lindsay Walton",
    location: "Roma",
    email: "lindsay.walton@example.com",
    data: "15-09-2014",
  },
  {
    progetto: "Lindsay Walton",
    location: "Roma",
    email: "lindsay.walton@example.com",
    data: "15-09-2014",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ApplicationList() {
  const checkbox = useRef<HTMLInputElement>(null);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedProgetto, setSelectedProgetto] = useState(progetti);
  const [addProgetto, SetAddProgetto] = useState({
    progetto: "",
    location: "",
    email: "",
    data: "",
  });

  /*   useLayoutEffect(() => {
    const isIndeterminate =
      selectedProgetto.length > 0 && selectedProgetto.length < progetti.length;
    setChecked(selectedProgetto.length === progetti.length);
    setIndeterminate(isIndeterminate);
    if (checkbox.current) {
      checkbox.current.indeterminate = isIndeterminate;
    }
  }, [selectedProgetto]); */

  const handleAddChange = (e:any) => {
    e.preventDefault();
    const fieldName = e.target.getAttribute("name");
    const fieldValue = e.target.value;
    const newAddProgetto = { ...addProgetto };
    //@ts-ignore
    newAddProgetto[fieldName] = fieldValue;
    SetAddProgetto(newAddProgetto);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    const newProgetto = {
      progetto: addProgetto.progetto,
      location: addProgetto.location,
      email: addProgetto.email,
      data: addProgetto.data,
    };
    const newProgetti = [...progetti, newProgetto];
    //@ts-ignore
    SetAddProgetto(newProgetti);
  };

  function toggleAll() {
    setSelectedProgetto(checked || indeterminate ? [] : progetti);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  return (
    <div>
      <HeroCercaSection title="Progetti List" image="/impact2.jpg" />
      <div className="pt-16 bg-white h-full w-full md:max-w-[100rem] mx-auto">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold leading-6 text-gray-900">
                Progetti
              </h1>
              <p className="mt-2 text-base text-gray-700">
                Inserisci il tuo progetto
              </p>
              <div className="flex flex-col gap-y-2 mt-4 w-[20rem]">
                <input
                  type="text"
                  name="progetto"
                  required
                  placeholder="Inserisci il nome del progetto"
                  onChange={handleAddChange}
                />
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="Inserisci la location del progetto"
                  onChange={handleAddChange}
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Inserisci una email"
                  onChange={handleAddChange}
                />
                <input
                  type="text"
                  name="data"
                  required
                  placeholder="Inserisci una data"
                  onChange={handleAddChange}
                />
              </div>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                onClick={handleOnSubmit}
                type="submit"
                className="block rounded-md bg-indigo-600 px-3 py-1.5 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Aggiungi Progetto
              </button>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="relative">
                  {selectedProgetto.length > 0 && (
                    <div className="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-white sm:left-12">
                      <button
                        type="button"
                        className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                      >
                        Bulk edit
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                      >
                        Delete all
                      </button>
                    </div>
                  )}
                  <table className="min-w-full table-fixed divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="relative px-7 sm:w-12 sm:px-6"
                        >
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                            ref={checkbox}
                            checked={checked}
                            onChange={toggleAll}
                          />
                        </th>
                        <th
                          scope="col"
                          className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                        >
                          Progetti
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        ></th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Location
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Indirizzo Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Data
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                        >
                          <span className="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {progetti.map((progetto) => (
                        <tr
                          key={progetto.email}
                          className={
                            selectedProgetto.includes(progetto)
                              ? "bg-gray-50"
                              : undefined
                          }
                        >
                          <td className="relative px-7 sm:w-12 sm:px-6">
                            {selectedProgetto.includes(progetto) && (
                              <div className="absolute inset-y-0 left-0 w-0.5 bg-indigo-600" />
                            )}
                            <input
                              type="checkbox"
                              className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer"
                              value={progetto.email}
                              checked={selectedProgetto.includes(progetto)}
                              onChange={(e) =>
                                setSelectedProgetto(
                                  e.target.checked
                                    ? [...selectedProgetto, progetto]
                                    : selectedProgetto.filter(
                                        (p) => p !== progetto
                                      )
                                )
                              }
                            />
                          </td>
                          <td
                            className={classNames(
                              "whitespace-nowrap py-4 pr-3 text-sm font-medium",
                              selectedProgetto.includes(progetto)
                                ? "text-indigo-600"
                                : "text-gray-900"
                            )}
                          >
                            {progetto.progetto}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {progetto.progetto}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {progetto.location}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {progetto.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {progetto.data}
                          </td>
                          <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
