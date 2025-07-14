"use client";
import { Fragment, useEffect, useReducer, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import FiltersAccordion from "./FiltersAccordion";
import generateEvents from "./generateEvents";
import reducer, {
  ActionTypes,
  IAction,
  IState,
  initialState,
} from "./FiltersReducer";
import Card from "./Card";
import dynamic from "next/dynamic";
import HeroCercaSection from "./HeroCercaSection";
import { Spazi } from "@/repos/types";

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export default function FiltersList() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer<Spazi>, initialState);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({
        type: ActionTypes.LOAD_DATA,
        payload: generateEvents(100).events,
      });
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}

        <HeroCercaSection title="Cerca uno spazio" image="/space.jpg" />
        <main className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
              {/* Filters */}
              <div className="relative lg:col-span-2">
                <FiltersAccordion
                  dispatch={dispatch}
                  filters={state.availableFilters}
                  className="hidden lg:block px-4 sticky top-20  flex flex-col overflow-y-auto bg-white h-screen"
                ></FiltersAccordion>
              </div>
              {/* Product grid */}
              <div className="lg:col-span-6 text-black flex flex-wrap gap-2 py-8">
                {state.loading && <div className="text-center">Loading...</div>}
                {!state.loading &&
                  state.filteredData.map((item, idx) => {
                    return <Card item={item} key={idx} />;
                  })}
              </div>

              {!!state.filteredData.length && <div className="lg:col-span-4 h-screen sticky top-0 py-0 lg:-mr-8 lg:-mt-8">
                <Map data={state.filteredData} />
              </div>}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
