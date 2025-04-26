import MapLocation from "@/components/Common/MapLocation";
import { useTranslation } from "react-i18next";
import Icon from "@mdi/react";
import { mdiAlertCircle, mdiMapMarker, mdiWalk } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";
import { getCityAndCountry } from "@/components/Utils/format";
import { useEffect, useState } from "react";

//TODO: fetch data from API
const exchangeData = {
  exchangePlace: { lat: 39.4699, lng: -0.3763 },
  exchangeType: "in_person",
};

export const StepTwo = () => {
  const { themeMode } = useTheme();
  const { t, i18n } = useTranslation();

  const [locationText, setLocationText] = useState("");

  useEffect(() => {
    const fetchLocation = async () => {
      const result = await getCityAndCountry(
        exchangeData?.exchangePlace.lat,
        exchangeData?.exchangePlace.lng,
        i18n.language
      );
      setLocationText(result);
    };

    fetchLocation();
  }, [i18n.language]);

  return (
    <div className={`flex flex-col gap-6 h-full`}>
      {/* Notification Swap */}
      <div className="p-2 rounded-2xl bg-[rgba(42,171,251,0.1)] text-[#2AABFB] flex gap-4 w-full">
        <div>
          <Icon path={mdiAlertCircle} size={1} />
        </div>
        <p>{t("mainLayout.swap_commitment")}</p>
      </div>

      <div className="w-full flex-grow h-0 md:min-h-60 rounded-2xl overflow-hidden">
        <MapLocation location={exchangeData.exchangePlace} zoom={11} />
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
            <p className="font-semibold">{t("mainLayout.exchange_place")}</p>
            <p className="opacity-50">{locationText}</p>
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
            <p className="font-semibold">{t("mainLayout.exchange_type")}</p>
            <p className="opacity-50">
              {t(`mainLayout.${exchangeData?.exchangeType}`)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
