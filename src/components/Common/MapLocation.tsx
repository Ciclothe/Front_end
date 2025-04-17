import { useTheme } from "@/context/ThemeContext.js";
import React, { useEffect } from "react";
import Map, { Marker, useMap } from "react-map-gl/mapbox";

const MapLocation = ({
  location,
  zoom,
}: {
  location: { lat: number; lng: number };
  zoom: number;
}) => {
  const { themeMode } = useTheme();
  const [viewState] = React.useState({
    longitude: location.lng,
    latitude: location.lat,
    zoom: zoom,
  });

  const MapEventHandler = () => {
    const { current: map } = useMap();

    useEffect(() => {
      if (map) {
        map.resize();
      }
    }, [map]);

    return null;
  };

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden">
      <Map
        {...viewState}
        style={{ width: "100%", height: "100%" }}
        zoom={zoom}
        mapStyle={`mapbox://styles/alejospinar/${
          themeMode === "dark"
            ? "cm67f0g7500ha01r891ot5w96"
            : "cm67er22x002f01qzf9q3apfd"
        }`}
        mapboxAccessToken="pk.eyJ1IjoiYWxlam9zcGluYXIiLCJhIjoiY20wa2lreDMxMTk5eDJrb2F0N3NtNHBkMyJ9.LV8h87QAtrtHZ2U2FP4V1g"
      >
        <MapEventHandler />
        <Marker
          longitude={location.lng}
          latitude={location.lat}
          anchor="bottom"
        >
          <div
            style={{
              width: "35px",
              height: "35px",
              backdropFilter: "brightness(1)",
              backgroundColor: "rgba(13, 188, 115, 0.4)",
              borderRadius: "50%",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "15px",
                height: "15px",
                backgroundColor: "white",
                borderRadius: "50%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                border: "3px solid #0DBC73",
              }}
            />
          </div>
        </Marker>
      </Map>
    </div>
  );
};

export default MapLocation;
