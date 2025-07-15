/*
  This Detail requires some changes to your config:

  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useState } from "react";
import { Dialog, Listbox, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarDaysIcon,
  CreditCardIcon,
  EllipsisVerticalIcon,
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  UserCircleIcon,
  XMarkIcon as XMarkIconMini,
} from "@heroicons/react/20/solid";
import {
  BellIcon,
  XMarkIcon as XMarkIconOutline,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const navigation = [
  { name: "Home", href: "#" },
  { name: "Invoices", href: "#" },
  { name: "Clients", href: "#" },
  { name: "Expenses", href: "#" },
];
const invoice = {
  subTotal: "8,800.00 €",
  tax: "1,760.00 €",
  total: "10,560.00 €",
  items: [
    {
      id: 1,
      title: "Aumento dell'accesso ai servizi essenziali",
      hours: "20.0",
      stakeholder: "anziani e persone con disabilità",
      price: "2,000.00 €",
    },
    {
      id: 2,
      title: "Aumento della conoscenza sulla salute sessuale e riproduttiva",
      hours: "52.0",
      stakeholder: "adolescenti",
      price: "5,200.00 €",
    },
    {
      id: 3,
      title: "Aumento della consapevolezza sull'uguaglianza di genere",
      hours: "12.0",
      stakeholder: "persone con disabilità",
      price: "1,200.00 €",
    },
  ],
};

const moods = [
  {
    name: "Excited",
    value: "excited",
    icon: FireIcon,
    iconColor: "text-white",
    bgColor: "bg-red-500",
  },
  {
    name: "Loved",
    value: "loved",
    icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-pink-400",
  },
  {
    name: "Happy",
    value: "happy",
    icon: FaceSmileIcon,
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Sad",
    value: "sad",
    icon: FaceFrownIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "Thumbsy",
    value: "thumbsy",
    icon: HandThumbUpIcon,
    iconColor: "text-white",
    bgColor: "bg-blue-500",
  },
  {
    name: "I feel nothing",
    value: null,
    icon: XMarkIconMini,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Detail() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selected, setSelected] = useState(moods[5]);

  return (
    <>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 mt-16">
          <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* Invoice summary */}
            <div className="lg:col-start-3 lg:row-end-1">
              <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
                <dl className="flex flex-col flex-wrap">
                  <div className="flex-auto pl-6 pt-6">
                    <dt className="text-sm font-semibold leading-6 text-gray-900">
                      Budget
                    </dt>
                    <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
                      10,560.00 €
                    </dd>
                  </div>
                  <div className="flex-auto pl-6 pt-6">
                    <dt className="text-sm font-semibold leading-6 text-gray-900">
                      Net Social Value
                    </dt>
                    <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
                      30,560.00 €
                    </dd>
                  </div>
                  <div className="flex-auto pl-6 pt-6">
                    <dt className="text-sm font-semibold leading-6 text-gray-900">
                      SROI
                    </dt>
                    <dd className="mt-1 text-base font-semibold leading-6 text-gray-900">
                      3.25
                    </dd>
                  </div>

                  <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
                    <dt className="flex-none">
                      <span className="sr-only">Organizzazione</span>
                      <UserCircleIcon
                        className="h-6 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd className="text-sm font-medium leading-6 text-gray-900">
                      Nome Utente
                    </dd>
                  </div>
                  <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
                    <dt className="flex-none">
                      <span className="sr-only">Data di inizio</span>
                      <CalendarDaysIcon
                        className="h-6 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd className="text-sm leading-6 text-gray-500">
                      <time dateTime="2023-01-31">31 Gennaio 2024</time>
                    </dd>
                  </div>
                </dl>
                <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
                  <a
                    href="#"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Sarica scheda progetto{" "}
                    <span aria-hidden="true">&darr;</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Invoice */}
            <div className="-mx-4 px-4 py-8 shadow-sm ring-none ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pb-20 xl:pt-16">
              <h2 className="text-2xl font-semibold leading-6 text-gray-900">
                Nome del progetto{" "}
                <span className="rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-600/20">
                  Avviato
                </span>
              </h2>
              <dl className="mt-6 grid grid-cols-1 text-sm leading-6 sm:grid-cols-2">
                <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                  <dt className="font-semibold text-gray-900">
                    Operatore responsabile del progetto
                  </dt>
                  <dd className="mt-2 text-gray-500">
                    <span className="font-medium text-gray-900">
                      Nome Associazione
                    </span>
                    <br />
                    via dei mille, 5
                    <br />
                    Roma, Italia
                  </dd>
                </div>
              </dl>
              <table className="mt-16 w-full whitespace-nowrap text-left text-sm leading-6">
                <colgroup>
                  <col className="w-full" />
                  <col />
                  <col />
                  <col />
                </colgroup>
                <thead className="border-b border-gray-200 text-gray-900">
                  <tr>
                    <th scope="col" className="px-0 py-3 font-semibold">
                      Outcome
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
                    >
                      Stakeholder
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3 pl-8 pr-0 text-right font-semibold sm:table-cell"
                    >
                      Target
                    </th>
                    <th
                      scope="col"
                      className="py-3 pl-8 pr-0 text-right font-semibold"
                    >
                      Net Social Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoice.items.map((item: any) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="max-w-0 px-0 py-5 align-top">
                        <div className="truncate font-medium text-gray-900">
                          {item.title}
                        </div>
                        <div className="truncate text-gray-500">
                          {item.description}
                        </div>
                      </td>
                      <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                        {item.stakeholder}
                      </td>
                      <td className="hidden py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700 sm:table-cell">
                        {item.hours}
                      </td>
                      <td className="py-5 pl-8 pr-0 text-right align-top tabular-nums text-gray-700">
                        {item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
