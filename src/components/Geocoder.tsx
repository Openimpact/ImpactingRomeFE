import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import L from "leaflet";

type GeocoderProps = {
  positionInfos: { address: string }[];
};

export default function Geocoder(props: GeocoderProps) {
  const map = useMap();
  const { positionInfos } = props;

  useEffect(() => {
    // creaet Geocoder nominatim
    //@ts-ignore
    var geocoder = L.Control.Geocoder.nominatim();
    // for every positionInfo
    // get the geocordinates of the address in the positionInfo
    // use the latitude and longitude to create a marker
    // and add it the map
    positionInfos.map((positionInfo) => {
      const address = positionInfo.address;
      if (address) {
        geocoder.geocode(address, (resultArray: any) => {
          if (resultArray.length > 0) {
            const result = resultArray[0];
            console.log(result);
            const latlng = result.center;
            L.marker(latlng).addTo(map).bindPopup(result.name);
            map.fitBounds(result.bbox);
          }
        });
      }
    });
  });

  return null;
}
