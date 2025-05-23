import { useEffect, useState } from "react";
import { SelectCountry } from "./Components/SelectCountry";
import { SelectCity } from "./Components/SelectCity";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_API_KEY;

type LocationProps = {
  location: {
    name: string;
    latitude: number;
    longitude: number;
  } | null;
  onSelectLocation?: (
    name: string,
    latitude: number,
    longitude: number
  ) => void;
};

type Feature = {
  place_type: string[];
  text: string;
  properties?: {
    short_code?: string;
  };
};

export const Location = ({ location, onSelectLocation }: LocationProps) => {
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<{
    name: string;
    lat: number;
    lng: number;
  } | null>(null);

  // Obtener país por coordenadas desde Mapbox
  useEffect(() => {
    if (!location) return;

    const fetchLocationInfo = async () => {
      const { name, latitude, longitude } = location;

      try {
        const res = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}&language=en`
        );
        const data = await res.json();

        if (!data.features || data.features.length === 0) return;

        const countryFeature = data.features.find((f: Feature) =>
          f.place_type.includes("country")
        );

        if (countryFeature?.properties?.short_code) {
          setCountry(countryFeature.properties.short_code.toUpperCase());
        } else {
          setCountry("");
        }

        setCity({
          name: name,
          lat: latitude,
          lng: longitude,
        });
      } catch (error) {
        console.error("Error al obtener la ubicación:", error);
        setCountry("");
      }
    };

    fetchLocationInfo();
  }, [location]);

  const handleCountryChange = (iso: string) => {
    setCountry(iso);
    setCity(null);
  };

  const handleCityChange = (city: {
    name: string;
    lat: number;
    lng: number;
  }) => {
    setCity(city);
    if (onSelectLocation) {
      onSelectLocation(city.name, city.lat, city.lng);
    }
  };

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex flex-col py-2 text-start">
        <p className="text-[1.4em] font-bold">¿Dónde vives?</p>
        <p className="opacity-50">
          Nos ayuda a mostrarte intercambios cercanos.
        </p>
      </div>

      <SelectCountry country={country} setCountry={handleCountryChange} />

      {country && (
        <SelectCity
          country={country}
          city={city?.name || ""}
          setCity={handleCityChange}
        />
      )}
    </div>
  );
};
