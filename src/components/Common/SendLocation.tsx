import { useCallback, useEffect, useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { DefaultModal } from "../Modals/DefaultModal";
import { SearchBar } from "./SearchBar";
import Map, { Marker } from "react-map-gl/mapbox";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";
import { useTranslation } from "react-i18next";

type ChatConversationProps = {
  closeChat: () => void;
  onLocationSelected: (location: {
    name: string;
    coordinates: { lat: number; lng: number };
  }) => void;
};

export const SendLocation = ({
  closeChat,
  onLocationSelected,
}: ChatConversationProps) => {
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_API_KEY;

  const { themeMode } = useTheme();
  const { t } = useTranslation();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [viewState, setViewState] = useState<{
    longitude: number;
    latitude: number;
    zoom: number;
  } | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{
    name: string;
    coordinates: { lat: number; lng: number };
  } | null>(null);

  useEffect(() => {
    const getApproximateLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setUserLocation({ lat: data.latitude, lng: data.longitude });
      } catch {
        setUserLocation({ lat: 39.4699, lng: -0.3763 });
      }
    };

    getApproximateLocation();
  }, []);

  useEffect(() => {
    if (userLocation && !selectedLocation) {
      setViewState({
        longitude: userLocation.lng,
        latitude: userLocation.lat,
        zoom: 11,
      });
    }
  }, [selectedLocation, userLocation]);

  useEffect(() => {
    if (selectedLocation) {
      setViewState({
        longitude: selectedLocation.coordinates.lng,
        latitude: selectedLocation.coordinates.lat,
        zoom: 14,
      });
    }
  }, [selectedLocation]);

  const fetchSuggestions = useCallback(
    (text: string) => {
      if (!text || !window.google || !window.google.maps || !userLocation)
        return;

      const service = new window.google.maps.places.AutocompleteService();

      service.getPlacePredictions(
        {
          input: text,
          language: "es",
          types: ["establishment"],
          location: new window.google.maps.LatLng(
            userLocation.lat,
            userLocation.lng
          ),
          radius: 20000,
        },
        (predictions, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            setSuggestions(predictions);
          } else {
            setSuggestions([]);
          }
        }
      );
    },
    [userLocation]
  );

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchSuggestions(query);
    }, 300);
    return () => clearTimeout(delay);
  }, [query, fetchSuggestions]);

  const handleSelectPlace = (placeId: string, description: string) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ placeId }, (results, status) => {
      if (
        status === window.google.maps.GeocoderStatus.OK &&
        results &&
        results[0].geometry &&
        results[0].geometry.location
      ) {
        const location = results[0].geometry.location;
        setSelectedLocation({
          name: description,
          coordinates: {
            lat: location.lat(),
            lng: location.lng(),
          },
        });
        setQuery("");
        setSuggestions([]);
      }
    });
  };

  return (
    <DefaultModal onClose={closeChat}>
      <div className="flex flex-col h-full md:h-auto pb-2 md:pb-4">
        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <div
            className={`${
              themeMode === "light" ? "bg-[#EDEDED]" : "bg-[#222423]"
            } p-2 rounded-full cursor-pointer`}
            onClick={closeChat}
          >
            <Icon path={mdiClose} size={1} />
          </div>

          <p className="flex-1 text-center text-[1.2em] font-bold">
            {t("mainLayout.search_location")}
          </p>

          {/* Espacio invisible del mismo tamaño que el botón para balancear */}
          <div className="p-2 invisible">
            <Icon path={mdiClose} size={1} />
          </div>
        </div>

        <div className="relative">
          <SearchBar value={query} onChange={(e) => setQuery(e.target.value)} />
          {suggestions.length > 0 && (
            <div
              className={`${
                themeMode === "light"
                  ? "bg-white text-black"
                  : "bg-[#222423] text-white"
              } absolute z-10 w-full max-h-60 scrollbar-hidden overflow-y-auto shadow-md rounded-2xl mt-2`}
            >
              {suggestions.map((place) => (
                <div
                  key={place.place_id}
                  className={`${
                    themeMode === "light"
                      ? "hover:bg-gray-100"
                      : "hover:bg-[#323332]"
                  } px-2 py-4 cursor-pointer text-sm`}
                  onClick={() =>
                    handleSelectPlace(place.place_id, place.description)
                  }
                >
                  {place.description}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="w-full h-full md:aspect-[21/9] rounded-xl overflow-hidden my-4">
          {viewState && (
            <Map
              {...viewState}
              onMove={(evt) => setViewState(evt.viewState)}
              mapStyle={`mapbox://styles/alejospinar/${
                themeMode === "light"
                  ? "cmacqekcf00oy01s4azpa7juh"
                  : "cm9ziyszq00cc01si7b97dqp2"
              }`}
              mapboxAccessToken={MAPBOX_TOKEN}
            >
              {selectedLocation && (
                <Marker
                  longitude={selectedLocation.coordinates.lng}
                  latitude={selectedLocation.coordinates.lat}
                  anchor="bottom"
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
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
              )}
            </Map>
          )}
        </div>

        <div
          onClick={() => {
            if (selectedLocation) {
              onLocationSelected(selectedLocation);
            }
          }}
          className="px-5 py-3 w-full rounded-xl flex items-center justify-center gap-2 font-bold cursor-pointer bg-[rgba(13,188,115,0.1)] text-[#0DBC73]"
        >
          <p className="cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis">
            {t("mainLayout.send_location")}
          </p>
        </div>
      </div>
    </DefaultModal>
  );
};
