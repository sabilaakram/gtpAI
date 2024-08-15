"use client";
import React, { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { getmapkey } from "@/lib/utils";

const containerStyle = {
  width: "100%", // Full width
  height: "100%", // Full vertical height
  minHeight: "350px",
};

const GtpMaps = ({
  lats,
  longs,
  names,
}: {
  lats: string[];
  longs: string[];
  names: string[];
}) => {
  const apikey = getmapkey();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_KEY!,
  });

  const [map, setMap] = useState(null);
  const [zoom, setZoom] = useState<number>(10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setZoom(9);
      } else {
        setZoom(10);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: Number(lats[0]), lng: Number(longs[0]) }}
      zoom={zoom}
    >
      {lats.map((lat, index) => (
        <Marker
          key={index}
          position={{ lat: Number(lat), lng: Number(longs[index]) }}
          label={{
            text: names[index],
            color: "black",
            fontSize: "8px",
            fontWeight: "bold",
          }}
        />
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default GtpMaps;
