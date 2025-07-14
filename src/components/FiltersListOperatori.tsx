"use client";
import { useEffect, useMemo, useReducer, useState } from "react";
import reducer, { ActionTypes, initialState } from "./FiltersReducer";
import HeroCercaSection from "./HeroCercaSection";
import { useOperatori } from "@/app/hooks/swrHooks";
import { Operatori } from "@/repos/types";
import { directus_url } from "@/repos";
import ProfileOperatori from "./ProfileOperatori";
import SearchInput from "./SearchImput";
import FiltersTypes from "./FiltersType";

export default function FiltersListOperatori() {
  const [selectedOperatore, setSelectedOperatore] = useState<Operatori>();
  const [openProfile, setOpenProfile] = useState(true);
  const [state, dispatch] = useReducer(reducer<Operatori>, initialState);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<string[]>([]);
  const [skill, setSkill] = useState<string[]>([]);
  const [prof, setProf] = useState<string[]>([]);
  const {
    data: op,
    isLoading: isLoadingOp,
    error: errorOp,
  } = useOperatori<Operatori[]>({
    revalidateIfStale: true,
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  useEffect(() => {
    console.log(op);
    if (op) {
      dispatch({
        type: ActionTypes.LOAD_DATA,
        payload: op,
      });
    }
  }, [op]);

  const uniqueTypes = useMemo(
    () =>
      Array.from(
        new Set(
          state.filteredData.map(function (item: Operatori, index: number) {
            return item.campoType[0].campo_type_id.name ?? null;
          })
        )
      ) as string[],

    [state]
  );

  const skillTypes = useMemo(
    () =>
      Array.from(
        new Set(
          state.filteredData.map(function (item: Operatori, index: number) {
            return item.skillType[0].skill_type_id.name ?? null;
          })
        )
      ) as string[],
    [state]
  );

  const profTypes = useMemo(
    () =>
      Array.from(
        new Set(
          state.filteredData.map(function (item: Operatori, index: number) {
            return item.professionType[0].profession_type_id.name ?? null;
          })
        )
      ) as string[],
    [state]
  );

  const filteredData = useMemo(() => {
    return state
      .filteredData!.filter((item) => {
        //@ts-ignore
        return item?.name?.toLowerCase().includes(search);
      })
      .filter((item) => !!activeFilter.length
          ? //@ts-ignore
            activeFilter.includes(item.campoType[0].campo_type_id.name)
          : true
      )
      .filter((item) => !!skill.length
          ? //@ts-ignore
            skill.includes(item.skillType[0].skill_type_id.name)
          : true
      )
      .filter((item) => !!prof.length
          ? //@ts-ignore
            prof.includes(item.professionType[0].profession_type_id.name)
          : true
      );
  }, [state, activeFilter, search, skill, prof, op]);

  return (
    <div className="bg-white">
      <div>
        <HeroCercaSection title="Cerca un operatore" image="/operatore2.jpg" />
        <main className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-12">
              <div className="col-span-4">
                <SearchInput
                  placeholder="Cerca un operatore"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSearch(e.target.value)
                  }
                />
              </div>
              <div className="col-span-12 row-start-2">
                <div className="flex flex-wrap">
                  {uniqueTypes.map((a, idx) => {
                    return (
                      <div className="mx-1 mb-2" key={idx}>
                        <FiltersTypes
                          name={a}
                          isActive={activeFilter.includes(a)}
                          onClick={() => {
                            !activeFilter.includes(a)
                              ? setActiveFilter([...activeFilter, a])
                              : setActiveFilter(
                                  activeFilter.filter((x) => x != a)
                                );
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-span-12 row-start-3">
                <div className="flex flex-wrap">
                  {skillTypes.map((b, idx) => {
                    return (
                      <div className="mx-1 mb-2" key={idx}>
                        <FiltersTypes
                          name={b}
                          isActive={skill.includes(b)}
                          onClick={() => {
                            !skill.includes(b)
                              ? setSkill([...skill, b])
                              : setSkill(skill.filter((x) => x != b));
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-span-12 row-start-4">
                <div className="flex flex-wrap">
                  {profTypes.map((c, idx) => {
                    return (
                      <div className="mx-1 mb-2" key={idx}>
                        <FiltersTypes
                          name={c}
                          isActive={prof.includes(c)}
                          onClick={() => {
                            !prof.includes(c)
                              ? setProf([...prof, c])
                              : setProf(prof.filter((x) => x != c));
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Filters */}
              {/*<div className="relative lg:col-span-2">
                <FiltersAccordion
                  dispatch={dispatch}
                  filters={state.availableFilters}
                  className="hidden lg:block px-4 sticky top-20  flex flex-col overflow-y-auto bg-white h-screen"
                ></FiltersAccordion>
              </div>*/}
              {/* Product grid */}
              <div className="lg:col-span-10 text-black grid grid-cols-4 gap-4 py-8 ">
                {state.loading && <div className="text-center">Loading...</div>}
                {!!state.filteredData.length &&
                  state.filteredData
                    .filter((x) => x.main_image)
                    .map((item, idx) => {
                      return (
                        <div
                          onClick={() => {
                            setSelectedOperatore(item);
                            setOpenProfile(true);
                          }}
                          key={item.id}
                          className="pb-12 basis-[14rem] max-w-[14rem] grow border rounded-xl overflow-hidden cursor-pointer"
                        >
                          <div className="relative isolate flex flex-col justify-end overflow-hidden bg-white  mb-4">
                            {item.main_image && <img
                                src={`${directus_url}/assets/${ typeof item.main_image != "string" && item.main_image.id}`}
                                alt="/"
                                style={{
                                  objectFit: "cover",
                                  width: "100%",
                                  aspectRatio: "1/1",
                                }}
                                className="relative"
                            />}
                          </div>
                          <div className="grid grid-cols-4 gap-4 gap-y-1 overflow-hidden text-sm leading-6 text-gray-900 px-4">
                            <div className="font-bold text-xl">
                              {item?.name}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                {!state.loading && !state.filteredData.length && (
                  <h2>Sorry, nothing to see here</h2>
                )}
              </div>
            </div>
          </section>
        </main>
        {typeof selectedOperatore != "undefined" && (
          <ProfileOperatori
            operatore={selectedOperatore}
            open={openProfile}
            setOpen={setOpenProfile}
          ></ProfileOperatori>
        )}
      </div>
    </div>
  );
}
