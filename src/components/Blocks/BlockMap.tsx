"use client";
import React from "react";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import BlockTitle from "./BlockTitle";
import BlockWrapper from "./BlockWrapper";

type Props = {};

function BlockMap({}: Props) {
  return (
    <BlockWrapper>
      <BlockTitle>Position</BlockTitle>
      <MapContainer
        center={[41.5, 12.5]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        className="rounded-xl "
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </BlockWrapper>
  );
}

export default BlockMap;
