import React from "react";
import { Event } from "./FiltersReducer";
import Link from "next/link";
import { Carousel, Slide } from "./Carousel/Carousel";
import generateEvents from "./generateEvents";
import { Operatori, Spazi } from "@/repos/types";
import { directus_url } from "@/repos";

type Props = {
  item: Spazi;
};

function Card({ item }: Props) {
  return (
    <div
      key={item.id}
      className="basis-[10rem] max-w-[15rem] grow border rounded-xl overflow-hidden bg-white"
    >
      <div className="relative isolate flex flex-col justify-end overflow-hidden bg-white  mb-4">
        {item.images?.length ? (
          <Carousel showDots={true}>
            {item.images?.map((image, idx) => (
              <Slide key={idx} className=" md:flex-[0_0_90%] flex-[0_0_100%]">
                <img
                  src={`${directus_url}/assets/${image.directus_files_id}`}
                  alt="/"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    aspectRatio: "1/1",
                  }}
                  className="relative"
                />
              </Slide>
            ))}
          </Carousel>
        ) : (
          <img
            src={`${directus_url}/assets/${item.main_image}`}
            alt="/"
            style={{
              objectFit: "cover",
              width: "100%",
              aspectRatio: "1/1",
            }}
            className="relative"
          />
        )}
      </div>
      <div className="flex flex-col items-start gap-y-1 overflow-hidden text-sm leading-6 text-gray-900 px-4">
        {item?.type[0]?.spazi_type_id?.name && (
          <p className="text-sm font-bold text-gray-600">
            {item.type[0].spazi_type_id.name}
          </p>
        )}
        <Link href={"/profile/" + item.id} className="font-bold text-xl">
          {item.name}
        </Link>
        <div className="leading-[1.1rem] text-slate-600">
          {item.formatted_address && (
            <p className="text-sm text-gray-800">{item.formatted_address}</p>
          )}
          {item.description && item.description != "-" && (
            <h2 className="text-lg uppercase">{item.description}</h2>
          )}
          {/* <div className="flex text-base">
            {item.facilities?.map((f, idx) => (
              <div className="pr-2" key={idx}>
              <p>{f}</p>
              </div>
              ))}
            </div> */}
          <div className="grid grid-cols-2 pt-2">
            {/* {item.halls?.map((h, idx) => (
              <div className="flex flex-col pr-2 text-base" key={idx}>
                <p className="underline">{h.name}</p>

                <p>
                  capacity:<span className="font-bold">{h.capacity}</span>
                </p>
                <p>
                  price:<span className="font-bold">{h.price}</span>
                </p>
              </div>
            ))} */}
          </div>
          {/* <div className="flex flex-col">
      <p>{item.opening_hours?.monday}</p>
      <p>{item.opening_hours?.tuesday}</p>
      <p>{item.opening_hours?.wednesday}</p>
      <p>{item.opening_hours?.thursday}</p>
      <p>{item.opening_hours?.friday}</p>
      <p>{item.opening_hours?.saturday}</p>
      <p>{item.opening_hours?.sunday}</p>
    </div> */}
        </div>
      </div>
    </div>
  );
}

export default Card;
