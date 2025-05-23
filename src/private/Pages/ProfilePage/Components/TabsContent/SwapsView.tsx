import { useTheme } from "@/context/ThemeContext";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import { PiSwap, PiPackageFill, PiHandshakeFill } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Icon } from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";

// TODO: Fetch events from the server
const swapsData = [
  {
    token: "cGe2aa0fMjM=",
    status: "sent_offer",
    updatedDate: "2025-04-27",
    receivedGarment: [
      {
        name: "Vintage Leather Jacket",
        image:
          "https://images1.vinted.net/t/04_01d8b_Zk3mVJXRGFK2GkScnGRVeAz7/f800/1746809405.jpeg?s=e16ca0089195009047f7d65a1bc0db05decd0919",
        size: "M",
        condition: "new",
        color: "Black",
        brand: "Zara",
      },
      {
        name: "Pene",
        image:
          "https://images1.vinted.net/t/04_01d8b_Zk3mVJXRGFK2GkScnGRVeAz7/f800/1746809405.jpeg?s=e16ca0089195009047f7d65a1bc0db05decd0919",
        size: "M",
        condition: "new",
        color: "Black",
        brand: "Zara",
      },
    ],
    userData: {
      id: 1,
      userName: "alejospinaro",
      profilePicture:
        "https://i.pinimg.com/736x/3f/4f/e9/3f4fe92639ea9d5980ef1760212e7b86.jpg",
      ranting: 4,
      totalRantings: 10,
    },
  },
];

const progressSteps = [
  { icon: PiSwap, label: "offered" },
  { icon: PiHandshakeFill, label: "accepted" },
  { icon: PiPackageFill, label: "exchanged" },
];

const getStepStatus = (index: number, currentStatus: string) => {
  const statusOrder = ["sent_offer", "accepted_offer", "exchanged_offer"];
  const currentIndex = statusOrder.indexOf(currentStatus);
  if (index < currentIndex) return "completed";
  if (index === currentIndex) return "active";
  return "pending";
};

export const SwapsView = () => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const statusColors = {
    completed: "#0DBC73",
    active: "#0DBC73",
    pending: themeMode === "light" ? "#000000" : "#FFFFFF",
  };

  return (
    <div className="w-full mx-auto h-full pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...swapsData]
          .sort(
            (a, b) =>
              new Date(b.updatedDate).getTime() -
              new Date(a.updatedDate).getTime()
          )
          .map((event) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [currentIndex, setCurrentIndex] = useState(0);
            const garments = event.receivedGarment;
            const currentGarment = garments[currentIndex];

            const next = () => {
              setCurrentIndex((prev) =>
                prev === garments.length - 1 ? 0 : prev + 1
              );
            };

            return (
              <div
                key={event.token}
                className={`${
                  themeMode === "light"
                    ? "bg-white text-black"
                    : "bg-[#222423] text-white"
                } flex flex-col gap-2 rounded-2xl p-4 cursor-pointer`}
              >
                <div
                  className={`${
                    themeMode === "light" ? "border-black/5" : "border-white/10"
                  } flex justify-between items-center border-b pb-4`}
                >
                  <div className="flex items-center gap-2">
                    <Avatar
                      variant="rounded"
                      src={event?.userData?.profilePicture}
                      className="h-full aspect-square"
                    />
                    <div>
                      <p className="font-bold">@{event?.userData?.userName}</p>
                      <div className="flex gap-1 items-center">
                        <Stack spacing={1}>
                          <Rating
                            name="half-rating"
                            defaultValue={event?.userData?.ranting}
                            precision={0.5}
                            readOnly
                            style={{
                              color: "#0DBC73",
                              fontSize: "1.2em",
                            }}
                          />
                        </Stack>
                        <p className="opacity-50">
                          {event?.userData?.totalRantings}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col text-end">
                    <p className="opacity-50">
                      {t(`mainLayout.${event.status}`)}
                    </p>
                    <p className="font-semibold">{event?.updatedDate}</p>
                  </div>
                </div>

                {/* Carrusel de prendas */}
                <div className="pt-2 flex items-center justify-between gap-2">
                  <div className="w-20 shrink-0 aspect-square rounded-lg overflow-hidden">
                    <img
                      src={currentGarment?.image}
                      className="w-full h-full object-cover"
                      alt={currentGarment?.name}
                    />
                  </div>

                  <div className="flex-1 min-w-0 text-start">
                    <p className="font-semibold">
                      {t(`mainLayout.${currentGarment?.condition}`)}
                    </p>
                    <p className="text-[1.2em] font-bold truncate">
                      {currentGarment?.name}
                    </p>
                    <p className="opacity-50 truncate">
                      {currentGarment?.color} | {currentGarment?.size} |{" "}
                      {currentGarment?.brand}
                    </p>
                  </div>

                  {garments.length > 1 && (
                    <div
                      onClick={next}
                      className={`shrink-0 ${
                        themeMode === "light"
                          ? "bg-black/20 hover:bg-[#121212] hover:text-white"
                          : "bg-white/20 hover:bg-[#F7F7F7] hover:text-black"
                      } rounded-full p-0.1 cursor-pointer`}
                    >
                      <Icon path={mdiChevronRight} size={1} />
                    </div>
                  )}
                </div>

                {/* Barra de progreso visual */}
                <div className="flex items-center justify-between mt-2 gap-1">
                  {progressSteps.map((step, index) => {
                    const stepStatus = getStepStatus(index, event.status);

                    return (
                      <div
                        key={step.label}
                        className="flex items-center w-full"
                      >
                        <div className="flex flex-col items-start w-full">
                          <div className="flex items-center w-full gap-1">
                            <step.icon
                              className="text-[1.8em]"
                              style={{ color: statusColors[stepStatus] }}
                            />
                            <div
                              className="w-full h-[6px] rounded-full"
                              style={{
                                backgroundColor: statusColors[stepStatus],
                              }}
                            />
                          </div>
                          <p
                            className="text-sm font-semibold"
                            style={{ color: statusColors[stepStatus] }}
                          >
                            {t(`mainLayout.${step.label}`)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-2">
                  <button
                    className={`${
                      themeMode === "dark"
                        ? "bg-[#F7F7F7] text-black"
                        : "bg-[#171717] text-white"
                    } px-4 py-2 font-bold rounded-md w-full`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/swaps/offer/accepted/${event.token}/summary/`);
                    }}
                  >
                    {t("mainLayout.swap_details")}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
