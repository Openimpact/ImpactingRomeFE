"use client";

import { useState, useEffect } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import L, { latLng } from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { ReactOsmGeocoding } from "@paraboly/react-osm-geocoding";
import "@paraboly/react-osm-geocoding/dist/index.css";

const MiniMap = ({ addr, children }: any) => {
  return (
    <MapContainer
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
      className="rounded-xl "
      center={addr}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </MapContainer>
  );
};

const GeocodedMap = (props: any) => {
  const { positionInfos } = props;
  const [addr, setAddr] = useState<{ lat: 0.0; lng: 0.0 } | undefined>();
  // get the location from geolocation

  return (
    <div className="w-full h-60 mt-16">
      <ReactOsmGeocoding
        callback={(data: any) => {
          setAddr({ ...data, lng: data.lon });
        }}
        city={""}
        countrycodes=""
      />
      {addr && (
        <MiniMap addr={addr}>
          {addr && addr.lat && addr.lng && (
            <Marker position={[addr.lat, addr.lng]}></Marker>
          )}
        </MiniMap>
      )}
    </div>
  );
};

export default GeocodedMap;
