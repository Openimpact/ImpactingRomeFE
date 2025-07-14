"use client";
import { Fragment } from "react";
import {
  ArrowDownCircleIcon,
  ArrowPathIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/20/solid";
import { Indicatori } from "@/repos/types";
import { useAtom } from "jotai";
import Image from "next/image";
import SDGdata from "../impact/SDGdata.json";
import { selectedOutcomeAtom } from "@/app/impact/OutcomesSdg";
import { selectedIndicatoriStateAtom, sroiAtom } from "@/app/impact/Outcome";
import { UseFormReturnType } from "@mantine/form";
import { ImpactGridFormType } from "../impact/ImpactGrid";

type Props = {
  indicatori: Indicatori[];
};

const statuses = {
  published: "text-green-700 bg-green-50 ring-green-600/20",
  Withdraw: "text-gray-600 bg-gray-50 ring-gray-500/10",
  Overdue: "text-red-700 bg-red-50 ring-red-600/10",
};

const days = [
  {
    date: "Today",
    dateTime: "2023-03-22",
    transactions: [
      {
        id: 1,
        href: "#",
        amount: "$7,600.00 USD",
        tax: "$500.00",
        status: "Paid",
        client: "Reform",
        icon: ArrowUpCircleIcon,
      },
      {
        id: 2,
        href: "#",
        amount: "$10,000.00 USD",
        status: "Withdraw",
        client: "Tom Cook",

        icon: ArrowDownCircleIcon,
      },
      {
        id: 3,
        href: "#",
        amount: "$2,000.00 USD",
        tax: "$130.00",
        status: "Overdue",
        client: "Tuple",

        icon: ArrowPathIcon,
      },
    ],
  },
  {
    date: "Yesterday",
    dateTime: "2023-03-21",
    transactions: [
      {
        id: 4,
        href: "#",
        amount: "$14,000.00 USD",
        tax: "$900.00",
        status: "Paid",
        client: "SavvyCal",
        icon: ArrowUpCircleIcon,
      },
    ],
  },
];

const clients = [
  {
    id: 1,
    name: "Tuple",
    imageUrl: "https://tailwindui.com/img/logos/48x48/tuple.svg",
    lastInvoice: {
      date: "December 13, 2022",
      dateTime: "2022-12-13",
      amount: "$2,000.00",
      status: "Overdue",
    },
  },
  {
    id: 2,
    name: "SavvyCal",
    imageUrl: "https://tailwindui.com/img/logos/48x48/savvycal.svg",
    lastInvoice: {
      date: "January 22, 2023",
      dateTime: "2023-01-22",
      amount: "$14,000.00",
      status: "Paid",
    },
  },
  {
    id: 3,
    name: "Reform",
    imageUrl: "https://tailwindui.com/img/logos/48x48/reform.svg",
    lastInvoice: {
      date: "January 23, 2023",
      dateTime: "2023-01-23",
      amount: "$7,600.00",
      status: "Paid",
    },
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProgettoTable({ form }: { form: ImpactGridFormType }) {
  const [outcomes] = useAtom(selectedOutcomeAtom);
  const [indicatori] = useAtom(selectedIndicatoriStateAtom);
  const [socialValue] = useAtom(sroiAtom);
  let sroi = socialValue / +form.values.budget;
  const stats = [
    {
      name: "# di outcome selezionati",
      value: outcomes.length,
      changeType: "positive",
    },
    {
      name: "# di indicatori selezionati",
      value: indicatori.indicatoriSelezionati.length,
      changeType: "positive",
    },
    /*    {
      name: "Budget",
      value: `€ ${(+form.values.budget).toFixed(0)}}`,
      changeType: "negative",
    },
    {
      name: "Social Value",
      value: socialValue.toFixed(0),
      changeType: "positive",
    },*/
    {
      name: "SROI",
      value:
        sroi > 8
          ? "Il tuo SROI è maggiore di 8"
          : sroi < 0
          ? "Il tuo SROI è negativo"
          : sroi,
      changeType: "negative",
    },
  ];
  /*const {
    data: indicatori,
    isLoading: indicatoriLoading,
    error: indicatoriError,
  } = useIndicatori<Indicatori[]>(outcome.id);*/
  // @ts-ignore
  return (
    <>
      <main className="pt-20 bg-white h-full w-full mx-auto">
        <div className="relative isolate overflow-hidden">
          <div className="border-b border-b-gray-900/1">
            <dl className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:px-2 xl:px-0">
              {stats.map((stat, statIdx) => (
                <div
                  key={stat.name}
                  className={classNames(
                    statIdx % 2 === 1
                      ? "sm:border-l"
                      : statIdx === 2
                      ? "lg:border-l"
                      : "",
                    "flex items-baseline flex-wrap justify-between gap-y-2 gap-x-4 border-t border-gray-900/5 px-4 py-10 sm:px-6 lg:border-t-0 xl:px-8"
                  )}
                >
                  <dt className="text-xl font-medium leading-6 text-gray-900">
                    {stat.name}
                  </dt>
                  <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="space-y-16 py-8 xl:space-y-20">
          {/* Recent activity table */}
          <div className="md:max-w-[80rem] mx-auto">
            <div className="mx-auto max-w-7xl my-8 px-4 sm:px-6 lg:px-8 flex justify-between">
              <h2 className="mx-auto max-w-2xl text-base font-semibold leading-6 text-gray-900 lg:mx-0 lg:max-w-none">
                Riepilogo degli outcome selezionati
              </h2>
            </div>
            {outcomes.map((outcome) => (
              <div
                key={outcome.id}
                className="mt-6 overflow-hidden border-t border-gray-100"
              >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                  <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
                    <table className="w-full text-left">
                      <tbody>
                        <Fragment>
                          <tr className="text-sm leading-6 text-gray-900">
                            <th
                              scope="colgroup"
                              colSpan={3}
                              className="relative isolate py-4 font-semibold flex items-center gap-4"
                            >
                              <Image
                                src={
                                  SDGdata.data.filter(
                                    (s) => s.id == +outcome.sdg!
                                  )[0].icon_url
                                }
                                alt=""
                                width={32}
                                height={32}
                              />
                              {outcome.name}
                              <div className="absolute inset-y-0 right-full -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                              <div className="absolute inset-y-0 left-0 -z-10 w-screen border-b border-gray-200 bg-gray-50" />
                            </th>
                          </tr>
                          {
                            //@ts-ignore
                            indicatori.indicatoriSelezionati
                              .filter((ind) => typeof ind.outcome != "string" && ind.outcome?.id! === outcome.id)
                              .map((i: Indicatori, idx: any) => (
                                <tr key={idx}>
                                  <td className="relative py-5 pr-6">
                                    <div className="flex gap-x-6">
                                      <div className="flex-auto">
                                        <div className="flex items-start gap-x-3">
                                          <div className="text-sm font-medium leading-6 text-gray-900">
                                            {i.name}
                                          </div>
                                          {/*  <div
                                      className={classNames(
                                        statuses[indicatori.status],
                                        "rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset"
                                      )}
                                    ></div> */}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                                    <div className="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
                                    {/*  <div className="text-sm leading-6 text-gray-900">
                                {transaction.client}
                              </div>
                              <div className="mt-1 text-xs leading-5 text-gray-500">
                                {transaction.description}
                              </div> */}
                                  </td>
                                  <td className="hidden py-5 pr-6 sm:table-cell">
                                    {/* <div className="flex justify-end">
                                  <a
                                    href={transaction.href}
                                    className="text-sm font-medium leading-6 text-indigo-600 hover:text-indigo-500"
                                  >
                                    View<span className="hidden sm:inline"> transaction</span>
                                    <span className="sr-only">
                                      , invoice #{transaction.invoiceNumber}, {transaction.client}
                                    </span>
                                  </a>
                                </div> */}
                                    <div className="text-sm leading-6 text-gray-900"></div>
                                  </td>
                                  <td className="py-5 text-right">
                                    <div className="flex justify-end"></div>
                                  </td>
                                </tr>
                              ))
                          }
                        </Fragment>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent client list*/}
          {/*<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Recent clients
                </h2>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                >
                  View all<span className="sr-only">, clients</span>
                </a>
              </div>
              <ul
                role="list"
                className="mt-6 grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
              >
                {clients.map((client) => (
                  <li
                    key={client.id}
                    className="overflow-hidden rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center gap-x-4 border-b border-gray-900/5 bg-gray-50 p-6">
                      <img
                        src={client.imageUrl}
                        alt={client.name}
                        className="h-12 w-12 flex-none rounded-lg bg-white object-cover ring-1 ring-gray-900/10"
                      />
                      <div className="text-sm font-medium leading-6 text-gray-900">
                        {client.name}
                      </div>
                      <Menu as="div" className="relative ml-auto">
                        <Menu.Button className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Open options</span>
                          <EllipsisHorizontalIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </Menu.Button>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-50" : "",
                                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                                  )}
                                >
                                  View
                                  <span className="sr-only">
                                    , {client.name}
                                  </span>
                                </a>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(
                                    active ? "bg-gray-50" : "",
                                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                                  )}
                                >
                                  Edit
                                  <span className="sr-only">
                                    , {client.name}
                                  </span>
                                </a>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                    <dl className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
                      <div className="flex justify-between gap-x-4 py-3">
                        <dt className="text-gray-500">Last invoice</dt>
                        <dd className="text-gray-700">
                          <time dateTime={client.lastInvoice.dateTime}>
                            {client.lastInvoice.date}
                          </time>
                        </dd>
                      </div>
                      <div className="flex justify-between gap-x-4 py-3">
                        <dt className="text-gray-500">Amount</dt>
                        <dd className="flex items-start gap-x-2">
                          <div className="font-medium text-gray-900">
                            {client.lastInvoice.amount}
                          </div>
                          <div>{client.lastInvoice.status}</div>
                        </dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ul>
            </div>
          </div>*/}
        </div>
      </main>
    </>
  );
}
