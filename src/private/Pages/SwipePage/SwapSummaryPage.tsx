import React, { useState, useEffect } from "react";
import { useModal } from "@/context/ModalContext";
import { useTheme } from "@/context/ThemeContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@mdi/react";
import {
  mdiArrowLeft,
  mdiChevronRight,
  mdiSwapHorizontalHidden,
} from "@mdi/js";

import { useTranslation } from "react-i18next";
import { FaCopy } from "react-icons/fa6";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { formatDate, getCityAndCountry } from "@/components/Utils/format";

const summaryData = [
  {
    swapData: {
      id: 1,
      token: "cGe2aa0fMjM=",
      code: "CICLO-9283",
      status: "accepted",
      accepted_at: "2025-04-24T13:00:00Z",
      counter__offers: 0,
      swap_city: { lat: 39.4676153, lng: -0.4039672 },
      swap_method: "In person",
      sender: {
        id: 1,
        name: "John Doe",
        username: "johndoe",
        avatar:
          "https://images1.vinted.net/t/02_00314_eGXMszKxuYWKCdVtu1AS4H4w/f800/1743443816.jpeg?s=c8f670a12fb13ef62847dc60113e3fb61546e874",
        rating: 4.5,
        rating_count: 10,
        location: { lat: 36.51543, lng: -4.88583 },
        last_online: "2025-04-24T07:38:00Z",
        is_verified: false,
        totalSwapsCompleted: 18,
      },
    },
    receiverCloset: [
      {
        id: 1,
        token: "cf62aa0fMjM=",
        title: "Puma vintage track jacket",
        condition: "as_new",
        color: "purple",
        size: "L",
        brand: "Puma",
        mainImage:
          "https://images1.vinted.net/t/02_00314_eGXMszKxuYWKCdVtu1AS4H4w/f800/1743443816.jpeg?s=c8f670a12fb13ef62847dc60113e3fb61546e874",
      },
    ],
    senderCloset: [
      {
        id: 1,
        title: "Essentials fear of God",
        token: "cG9zdC0xMjM=",
        condition: "new",
        color: "Caqui",
        size: "L",
        brand: "Essentials",
        mainImage:
          "https://images1.vinted.net/t/04_000ca_x3XdW621URwVKT8kQHjgVBVm/f800/1744196832.jpeg?s=fdfeba230eb064d1f32a8871ab0d42e52e5b7a18",
      },
    ],
  },
];

export const SwapSummaryPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const data = summaryData.find((e) => e.swapData.token === token);
  const { openModal } = useModal();
  const { themeMode } = useTheme();
  const { t, i18n } = useTranslation();
  const [location, setLocation] = useState<string | null>(null);
  const [swapLocation, setSwapLocation] = useState<string | null>(null);
  const navigate = useNavigate();

  dayjs.extend(relativeTime);
  dayjs.locale(i18n.language);

  useEffect(() => {
    if (data) {
      const fetchLocation = async () => {
        const cityAndCountry = await getCityAndCountry(
          data?.swapData?.sender?.location.lat,
          data?.swapData?.sender?.location.lng,
          i18n.language
        );
        const cityAndCountrySwap = await getCityAndCountry(
          data?.swapData?.swap_city?.lat,
          data?.swapData?.swap_city?.lng,
          i18n.language
        );
        setLocation(cityAndCountry);
        setSwapLocation(cityAndCountrySwap);
      };

      fetchLocation();
    }
  }, [data, i18n.language]);

  const getOnlineStatus = (lastSeen: string) => {
    const now = dayjs();
    const lastSeenTime = dayjs(lastSeen);
    const diffInMinutes = now.diff(lastSeenTime, "minute");

    if (diffInMinutes <= 5) {
      return "Now";
    } else {
      return `${lastSeenTime.fromNow()}`;
    }
  };

  if (!data) {
    return <Navigate to="/404" />;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data?.swapData?.code);
    alert("Código copiado");
  };

  return (
    <div
      className={`${
        themeMode === "light" ? "bg-white" : "bg-[#121212]"
      } min-h-[100vh] md:h-[100vh] flex flex-col relative md:overflow-hidden`}
    >
      {/* HEADER */}
      <div className="w-full p-2 md:px-10 md:py-5 xl:px-20 flex items-center gap-4">
        {/* Flecha a la izquierda */}
        <div
          className={`${
            themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#222423]"
          } p-1 rounded-full cursor-pointer w-fit z-20`}
          onClick={() => {
            navigate("/");
          }}
        >
          <Icon path={mdiArrowLeft} size={1} />
        </div>
        <p className="text-[1.2em] font-semibold">{t("mainLayout.summary")}</p>
      </div>
      {/* MAIN CONTENT */}
      <div className="px-2 md:px-10 xl:px-40 grid grid-cols-12 gap-4 my-4 md:flex-grow overflow-y-auto md:overflow-hidden">
        {/* Closet Swap */}
        <div className="col-span-12 md:col-span-7 xl:col-span-8 text-start flex flex-col overflow-hidden h-fit md:h-auto">
          {/* Receive */}
          <div
            className={`rounded-2xl p-4 border max-h-[50%] min-h-0 overflow-y-auto ${
              themeMode === "light"
                ? "bg-[#F7F7F7] border-black/5"
                : "bg-[#222423] border-white/5"
            }`}
          >
            <div className="flex justify-between items-center">
              <p className="font-semibold text-[1.1em]">
                {t("mainLayout.you_will_receive")}
              </p>

              <p className="opacity-50 text-sm">
                {data?.receiverCloset.length}{" "}
                {data?.receiverCloset.length
                  ? t("mainLayout.garment")
                  : t("mainLayout.garment_plural")}
              </p>
            </div>
            {/* Garments */}
            <div className="flex flex-col gap-2 mt-4">
              {data?.receiverCloset.map((garment) => (
                <div
                  key={garment.id}
                  className={`${
                    themeMode === "light" ? "bg-white" : "bg-[#121212]"
                  } flex justify-between w-full items-center p-4 rounded-lg gap-4 truncate`}
                >
                  <div className="flex gap-4 h-full max-w-full truncate">
                    <img
                      src={garment.mainImage}
                      alt="garment"
                      className="w-20 aspect-square object-cover rounded-md"
                    />
                    <div className="flex flex-col justify-center">
                      <p className="font-bold text-[#E5D04B]">
                        {t(`mainLayout.${garment.condition}`)}
                      </p>
                      <div className="mt-2">
                        <p className="font-bold truncate">{garment.title}</p>
                        <p className="opacity-50 truncate">
                          {garment.color} | {garment.size} | {garment.brand}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p
                    className="text-[#0DBC73] flex-shrink-0 font-semibold cursor-pointer"
                    onClick={() => {
                      openModal(garment.token, "details");
                    }}
                  >
                    {t("mainLayout.details")}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Divider */}
          <div className="flex justify-center items-center -mt-2 -mb-2 z-20">
            <div
              className={`p-2 aspect-square flex items-center justify-center rounded-full ${
                themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#222423]"
              }`}
              style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
            >
              <Icon
                path={mdiSwapHorizontalHidden}
                size={1}
                className="rotate-90"
              />
            </div>
          </div>
          {/* Send */}
          <div
            className={`rounded-2xl p-4 border max-h-[50%] overflow-y-auto ${
              themeMode === "light"
                ? "bg-[#F7F7F7] border-black/5"
                : "bg-[#222423] border-white/5"
            }`}
          >
            <div className="flex justify-between items-center gap-4">
              <p className="font-semibold text-[1.1em] truncate">
                {t("mainLayout.you_will_give")}
              </p>
              <p className="opacity-50 text-sm">
                {data?.senderCloset.length}{" "}
                {data?.senderCloset.length
                  ? t("mainLayout.garment")
                  : t("mainLayout.garment_plural")}
              </p>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              {data?.senderCloset.map((garment) => (
                <div
                  key={garment.id}
                  className={`${
                    themeMode === "light" ? "bg-white" : "bg-[#121212]"
                  } flex justify-between w-full items-center p-4 rounded-lg gap-4 truncate`}
                >
                  <div className="flex gap-4 h-full max-w-full truncate">
                    <img
                      src={garment.mainImage}
                      alt="garment"
                      className="w-20 aspect-square object-cover rounded-md"
                    />
                    <div className="flex flex-col justify-center">
                      <p className="font-bold text-[#E5D04B]">
                        {t(`mainLayout.${garment.condition}`)}
                      </p>
                      <div className="mt-2">
                        <p className="font-bold truncate">{garment.title}</p>
                        <p className="opacity-50 truncate">
                          {garment.color} | {garment.size} | {garment.brand}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p
                    className="text-[#0DBC73] flex-shrink-0 font-semibold cursor-pointer"
                    onClick={() => {
                      openModal(garment.token, "details");
                    }}
                  >
                    {t("mainLayout.details")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Swap Info */}
        <div
          className={`${
            themeMode === "light"
              ? "bg-[#F7F7F7] border-black/5"
              : "bg-[#222423] border-white/5"
          } rounded-2xl p-4 col-span-12 md:col-span-5 xl:col-span-4 flex flex-col gap-4 h-fit`}
        >
          <div className="w-full flex justify-between items-center text-start">
            <div>
              <p className="truncate opacity-50">
                {" "}
                {t("mainLayout.swap_code")} #
              </p>
              <p className="font-semibold">{data?.swapData?.code}</p>
            </div>
            <div onClick={copyToClipboard} className="cursor-pointer">
              <FaCopy className="w-full h-full" />
            </div>
          </div>
          {/* User Info */}
          <div
            className={`${
              themeMode === "light" ? "bg-white" : "bg-[#121212]"
            } rounded-lg text-start overflow-y-auto max-h-[30vh]`}
          >
            {/* User Rating */}
            <div
              className={`${
                themeMode === "light"
                  ? "hover:bg-[#e2e2e2]"
                  : "hover:bg-[#323332]"
              } flex items-center justify-between cursor-pointer p-4`}
            >
              <div className="flex items-center gap-2">
                <Avatar
                  variant="rounded"
                  src={data?.swapData?.sender?.avatar}
                  className="h-full aspect-square"
                />
                <div>
                  <p className="font-bold">
                    @{data?.swapData?.sender?.username}
                  </p>
                  <div className="flex gap-1 items-center">
                    <Stack spacing={1}>
                      <Rating
                        name="half-rating"
                        defaultValue={data?.swapData?.sender?.rating}
                        precision={0.5}
                        readOnly
                        style={{
                          color: "#0DBC73",
                          fontSize: "1.2em",
                        }}
                      />
                    </Stack>
                    <p className="opacity-50">
                      {data?.swapData?.sender?.rating_count}
                    </p>
                  </div>
                </div>
              </div>
              <div className="opacity-50">
                <Icon path={mdiChevronRight} size={1} />
              </div>
            </div>
            <hr className="opacity-10" />
            {/* User Location and Offers */}
            <div className="p-4 flex flex-col gap-2">
              <div className="flex w-full justify-between">
                <div className="flex w-full justify-between">
                  <p className="opacity-50">{t("mainLayout.location")}</p>
                  <p className="font-semibold">{location || "Cargando..."}</p>
                </div>
              </div>
              <div className="flex w-full justify-between">
                <p className="opacity-50">{t("mainLayout.complete_swaps")}</p>
                <p className="font-semibold">
                  {data?.swapData?.sender?.totalSwapsCompleted}
                </p>
              </div>
              <div className="flex w-full justify-between">
                <p className="opacity-50">{t("mainLayout.verified_user")}</p>
                <p
                  className={`font-semibold ${
                    data?.swapData?.sender?.is_verified
                      ? "text-[#0DBC73]"
                      : "text-[#bc0d0d]"
                  }`}
                >
                  {data?.swapData?.sender?.is_verified ? "Yes" : "No"}
                </p>
              </div>
              <div className="flex w-full justify-between">
                <p className="opacity-50">{t("mainLayout.online")}</p>
                <p className={`font-semibold`}>
                  {getOnlineStatus(data?.swapData?.sender?.last_online) ||
                    "Cargando..."}
                </p>
              </div>
            </div>
          </div>
          {/* Swap Information */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <p className="opacity-50">{t("mainLayout.items_to_receive")}</p>
              <p className="font-semibold">{data?.receiverCloset?.length}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="opacity-50">{t("mainLayout.items_to_give")}</p>
              <p className="font-semibold">{data?.senderCloset?.length}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="opacity-50">{t("mainLayout.date_of_completion")}</p>
              <p className="font-semibold">
                {" "}
                {formatDate(data?.swapData?.accepted_at, i18n.language)}
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p className="opacity-50">{t("mainLayout.counteroffers")}</p>
              <p className="font-semibold">{data?.swapData?.counter__offers}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="opacity-50">{t("mainLayout.swap_city")}</p>
              <p className="font-semibold">{swapLocation}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="opacity-50">{t("mainLayout.swap_method")}</p>
              <p className="font-semibold">{data?.swapData?.swap_method}</p>
            </div>
          </div>
          {/* Actions */}
          <div className="md:flex flex-col gap-2 hidden">
            <div
              className={`${
                themeMode === "light"
                  ? "bg-black text-white md:text-black md:bg-[#EBEBEB] md:hover:bg-black md:hover:text-white"
                  : "bg-white text-black md:text-white md:bg-[#2A2B2A] md:hover:bg-white md:hover:text-black"
              } px-5 py-2 w-full rounded-full flex items-center justify-center font-bold transition-all duration-300 cursor-pointer`}
              onClick={() => {
                console.log("Open chat");
              }}
            >
              <p>{t("mainLayout.confirm_meeting")}</p>
            </div>
            <div
              className={`${
                themeMode === "light" ? "text-black" : "text-white"
              } px-5 py-2 w-full rounded-full flex items-center justify-center font-bold transition-all duration-300 cursor-pointer`}
              onClick={() => {
                console.log("Open encuesta y review");
              }}
            >
              <p>{t("mainLayout.already_swapped")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE ACTIONS */}
      <div
        className={`${
          themeMode === "light" ? "bg-white" : "bg-[#121212]"
        } flex flex-col gap-2 w-full md:hidden sticky bottom-0 z-50 p-4 shadow-md`}
      >
        <div
          className={`${
            themeMode === "light"
              ? "bg-black text-white md:text-black md:bg-[#EBEBEB] md:hover:bg-black md:hover:text-white"
              : "bg-white text-black md:text-white md:bg-[#2A2B2A] md:hover:bg-white md:hover:text-black"
          } px-5 py-2 w-full rounded-full flex items-center justify-center font-bold transition-all duration-300 cursor-pointer`}
          onClick={() => {
            console.log("Open chat");
          }}
        >
          <p>{t("mainLayout.confirm_meeting")}</p>
        </div>
        <div
          className={`${
            themeMode === "light" ? "text-black" : "text-white"
          } px-5 py-2 w-full rounded-full flex items-center justify-center font-bold transition-all duration-300 cursor-pointer`}
          onClick={() => {
            console.log("Open encuesta y review");
          }}
        >
          <p>{t("mainLayout.already_swapped")}</p>
        </div>
      </div>
    </div>
  );
};
