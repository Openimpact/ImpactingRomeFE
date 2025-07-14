"use client";
import React from "react";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { IState } from "./FiltersReducer";
import { Carousel, Slide } from "./Carousel/Carousel";
import generateEvents from "./generateEvents";
import Link from "next/link";
import { directus_url } from "@/repos";
import { Operatori, Spazi } from "@/repos/types";

type Props = {
  data: Spazi[];
};

function Map({ data }: Props) {
  return (
    <MapContainer
      center={[41.9, 12.49]}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      className=" "
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.maptiler.com/maps/basic-v2-light/256/{z}/{x}/{y}@2x.png?key=mNKhs326ZvuNgO29HyFl"
      />
      {data.map((item, idx) => {
        return (
          <Marker
            position={[
              //@ts-ignore
              item.coordinates.coordinates[1],
              //@ts-ignore
              item.coordinates.coordinates[0],
            ]}
            key={item.id}
          >
            <Popup>
              <div className="relative -left-[21px]  -top-[15px] h-auto w-[348px] flex flex-col rounded-xl overflow-hidden">
                <div className="h-full w-full object-cover">
                  <Carousel showDots={true}>
                    {item.images.map((image, idx) => (
                      <Slide
                        key={idx}
                        className=" md:flex-[0_0_80%] flex-[0_0_100%]"
                      >
                        <img
                          src={`${directus_url}/assets/${image.directus_files_id}`}
                          alt="/"
                          style={{
                            borderRadius: ".2rem",
                            objectFit: "cover",
                            width: "100%",
                            aspectRatio: "4/3",
                          }}
                          className="relative"
                        />
                      </Slide>
                    ))}
                  </Carousel>
                </div>
                <div className="flex flex-col px-4 py-2">
                  <Link
                    href={`/profile/${item.id}`}
                    className="font-bold text-xl"
                  >
                    {item.name}
                  </Link>
                  <div className="text-slate-600">
                    {/* <h2 className="text-lg uppercase">{item.type}</h2>
                      <div className="flex text-base">
                        {item.facilities?.map((f, idx) => (
                          <div className="pr-2" key={idx}>
                            <p>{f}</p>
                          </div>
                        ))}
                      </div> */}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default Map;
