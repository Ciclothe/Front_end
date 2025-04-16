import MapLocation from "@/components/Common/MapLocation";

import Icon from "@mdi/react";
import { mdiAlertCircle, mdiMapMarker, mdiWalk } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";

//TODO: fetch data from API
const exchangeData = {
  exchangePlace: "Valencia, Spain",
  exchangeType: "In person",
};

export const StepTwo = () => {
  const eventLocation = { lat: 39.4699, lng: -0.3763 };
  const { themeMode } = useTheme();

  return (
    <div className={`flex flex-col gap-6 h-full`}>
      {/* Notification Swap */}
      <div className="p-2 rounded-2xl bg-[rgba(42,171,251,0.1)] text-[#2AABFB] flex gap-4 w-full">
        <div>
          <Icon path={mdiAlertCircle} size={1} />
        </div>
        <p>
          Al continuar, estás aceptando formalmente realizar este intercambio
          bajo las condiciones establecidas. Te comprometes a enviar la prenda
          exacta que ofreciste, en el estado descrito, y a recibir la prenda del
          otro usuario en iguales condiciones.
        </p>
      </div>
      <div className="w-full h-[20em] flex-grow bg-[#F7F7F7] rounded-2xl">
        <MapLocation eventLocation={eventLocation} zoom={11} />
      </div>
      {/* Swap Information */}
      <div className="flex flex-col md:flex-row gap-4">
        <div
          className={`${
            themeMode === "light"
              ? "bg-black text-white"
              : "bg-white text-black"
          } flex p-4 gap-4 rounded-2xl items-center w-[100%] md:w-[50%]`}
        >
          <div
            className={`${
              themeMode === "light"
                ? "bg-white text-black"
                : "bg-black text-white"
            } p-2 rounded-full`}
          >
            <Icon path={mdiMapMarker} size={1} />
          </div>
          <div>
            <p className="font-semibold">Exchange place</p>
            <p className="opacity-50">{exchangeData?.exchangePlace}</p>
          </div>
        </div>
        <div
          className={`${
            themeMode === "light"
              ? "bg-black text-white"
              : "bg-white text-black"
          } flex p-4 gap-4 rounded-2xl items-center w-[100%] md:w-[50%]`}
        >
          <div
            className={`${
              themeMode === "light"
                ? "bg-white text-black"
                : "bg-black text-white"
            } p-2 rounded-full`}
          >
            <Icon path={mdiWalk} size={1} />
          </div>
          <div>
            <p className="font-semibold">Exchange type</p>
            <p className="opacity-50">{exchangeData?.exchangeType}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
