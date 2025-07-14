"use client";
import { useEffect, useMemo, useState } from "react";
import Card from "./Card";
import dynamic from "next/dynamic";
import HeroCercaSection from "./HeroCercaSection";
import { Spazi } from "@/repos/types";
import SearchInput from "./SearchImput";
import FiltersTypes from "./FiltersType";

const Map = dynamic(() => import("./Map"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function FiltersSpazi() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [data, setData] = useState([]);
  //const [state, dispatch] = useReducer(reducer<Spazi>, initialState);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    return data
      .filter((item) => {
        //@ts-ignore
        return item.name?.toLowerCase().includes(search);
      })
      .filter((item) =>
        !!activeFilter.length
          ? //@ts-ignore
            activeFilter.includes(item?.type[0]?.spaziType_id?.name)
          : true,
      );
  }, [data, activeFilter, search]);

  useEffect(() => {
    fetch("/api/spazi").then(async (res) => {
      const { data: payload } = await res.json();
      if (!hasLoaded) {
        setData(payload);
        console.log(payload);

        setHasLoaded(true);
      }
    });
  }, []);

  const uniqueTypes = useMemo(
    () =>
      Array.from(
        new Set(
          data.map(function (item: Spazi, index: number) {
            return item.type[0]?.spaziType_id?.name ?? null;
          }),
        ),
      ) as string[],
    [data],
  );

  /*  const handleFilter = (event: any) => {
    const searchSpazio = event.target.value;
    const newFilter = state.filteredData.filter((value) => {
      return value.name!.includes(searchSpazio);
    });
    setFilteredData(newFilter);
  }; */

  return (
    <div className="bg-gray-200">
      <div>
        {/* Mobile filter dialog */}
        <HeroCercaSection title="Cerco uno spazio" image="/space.jpg" />
        <main className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Spazi
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
              {/* Filters */}
              <div className="lg:col-span-6 h-screen sticky top-0 py-0 lg:-ml-8 lg:-mt-8">
                <Map data={filteredData} />
              </div>
              {/* Product grid */}
              <div className="lg:col-span-6 text-black flex flex-col flex-wrap gap-4 py-8">
                <div className="col-span-6 ">
                  <SearchInput
                    placeholder="Cerca uno spazio"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSearch(e.target.value)
                    }
                  />
                  <div className="my-5 flex items-center">
                    {uniqueTypes.map((a, idx) => {
                      return (
                        <div key={idx} className="px-3">
                          <FiltersTypes
                            name={a}
                            isActive={activeFilter.includes(a)}
                            onClick={() => {
                              !activeFilter.includes(a)
                                ? setActiveFilter([...activeFilter, a])
                                : setActiveFilter(
                                    activeFilter.filter((x) => x != a),
                                  );
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="row-start-2 col-span-6 lg:col-span-6 text-black grid grid-cols-4 gap-4 py-8">
                  {!data.length && (
                    <div className="text-center">Loading...</div>
                  )}
                  {filteredData &&
                    filteredData.map((item, idx) => {
                      return <Card item={item} key={idx} />;
                    })}
                </div>
              </div>
              {/*<div className="lg:col-span-2 h-screen sticky top-0 py-0 lg:-mr-8 lg:-mt-8">
                  <FiltersAccordion
                    dispatch={dispatch}
                    filters={state.availableFilters}
                    className="hidden lg:block px-4 sticky top-6  flex flex-col overflow-y-auto bg-white h-screen"
                  ></FiltersAccordion>
              </div>*/}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
