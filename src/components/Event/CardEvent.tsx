import { Icon } from "@mdi/react";
import { mdiCircleSmall, mdiUpdate, mdiMapMarker } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext.js";
import { useState, useEffect, MouseEventHandler } from "react";
import { useTranslation } from "react-i18next";
import {
  formatTime,
  formatDate,
  getFullAddress,
} from "@/components/Utils/format";
import { EventType } from "@/types/index";
import { AssistantsAvatars } from "@/components/Common/AssistantsAvatars";
import { useNavigate } from "react-router-dom";

interface CardEventProps {
  event: EventType;
  showActionButton?: boolean;
  onClickEvent?: MouseEventHandler<HTMLDivElement>;
}

export const CardEvent: React.FC<CardEventProps> = ({
  event,
  showActionButton = true,
  onClickEvent,
}) => {
  const { themeMode } = useTheme();
  const { i18n, t } = useTranslation();
  const [address, setAddress] = useState<string>("");
  const navigate = useNavigate();

  const willGoText =
    event.participants.length === 1
      ? "mainLayout.will_go_singular"
      : "mainLayout.will_go_plural";

  useEffect(() => {
    const fetchAddress = async () => {
      const fullAddress = await getFullAddress(
        event.location.lat,
        event.location.lng,
        i18n.language
      );
      setAddress(fullAddress);
    };

    fetchAddress();
  }, [event.location.lat, event.location.lng, i18n.language]);

  return (
    <div
      className={`${
        themeMode === "light"
          ? "bg-white text-black"
          : "bg-[#222423] text-white"
      } flex flex-col gap-2 rounded-2xl p-4 cursor-pointer min-w-full sm:min-w-1/2 lg:min-w-1/3`}
      onClick={(e) => {
        e.stopPropagation();
        if (showActionButton) {
          onClickEvent?.(e);
        } else {
          navigate(`/eventDetails/${event.token}`);
        }
      }}
    >
      <AssistantsAvatars
        firstAssistants={event.participants.slice(0, 2)}
        total={event.participants.length}
        actionText={willGoText}
      />

      <div className="flex flex-col gap-2 font-semibold">
        <div className="text-start">
          <p className="opacity-50">{event.category}</p>
          <p className="truncate w-full text-[1.2em]">{event.eventName}</p>
        </div>
        <div className="flex items-center gap-1 text-start">
          <Icon path={mdiUpdate} size={1} />
          <p className="whitespace-nowrap">{formatTime(event.time)}</p>
          <Icon path={mdiCircleSmall} size={1} />
          <p className="truncate w-full ">
            {formatDate(event.date, i18n.language)}
          </p>
        </div>
        <div
          className={`${
            themeMode === "light" ? "bg-[#EBEBEB]" : "bg-[#313131]"
          } w-[80%] opacity-50 rounded-lg p-2 flex items-center gap-2`}
        >
          <Icon path={mdiMapMarker} size={1} />
          <p className="truncate w-full text-start">
            {address || "Cargando dirección..."}
          </p>
        </div>
      </div>
      {showActionButton && (
        <div className="flex items-center justify-between w-full mt-2">
          <button
            className={`${
              themeMode === "dark"
                ? "bg-[#F7F7F7] text-black"
                : "bg-[#171717] text-white"
            }  px-5 py-3 w-full rounded-xl font-bold gap-2`}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/eventDetails/${event.token}`);
            }}
          >
            <p>{t(`mainLayout.view_event`)}</p>
          </button>
        </div>
      )}
    </div>
  );
};
