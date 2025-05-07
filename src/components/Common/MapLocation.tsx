import { useEffect, useRef, useState } from "react";
import Map, { Marker } from "react-map-gl/mapbox";
import { useTheme } from "@/context/ThemeContext.js";

const MapLocation = ({
  location,
  zoom,
}: {
  location: { lat: number; lng: number };
  zoom: number;
}) => {
  const { themeMode } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Solo necesitamos cargarlo una vez
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-6 h-full overflow-hidden"
    >
      {isVisible && (
        <Map
          initialViewState={{
            longitude: location.lng,
            latitude: location.lat,
            zoom: zoom,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle={`mapbox://styles/mapbox/${
            themeMode === "dark" ? "dark-v11" : "light-v11"
          }`}
          mapboxAccessToken="pk.eyJ1IjoiYWxlam9zcGluYXIiLCJhIjoiY20wa2lreDMxMTk5eDJrb2F0N3NtNHBkMyJ9.LV8h87QAtrtHZ2U2FP4V1g"
          dragPan={false}
          scrollZoom={false}
          doubleClickZoom={false}
          touchZoomRotate={false}
          keyboard={false}
        >
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
      )}
    </div>
  );
};

export default MapLocation;
