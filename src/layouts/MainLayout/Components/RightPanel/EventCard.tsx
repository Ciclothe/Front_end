import Icon from "@mdi/react";
import { mdiUpdate, mdiCircleSmall, mdiMapMarker } from "@mdi/js";
import { AssistantsAvatars } from "@/components/Common/AssistantsAvatars";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";

interface Assistant {
  id: number;
  name: string;
  avatar: string;
}

interface Event {
  eventName: string;
  eventCategory: string;
  eventTime: string;
  eventDate: string;
  eventLocation: string;
  firstAssistents: Assistant[];
  totalAssistents: number;
}

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { themeMode } = useTheme();
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language;

  const peopleText =
    event.totalAssistents === 1 ? "mainLayout.person" : "mainLayout.people";
  const willGoText =
    event.totalAssistents === 1
      ? "mainLayout.will_go_singular"
      : "mainLayout.will_go_plural";

  return (
    <div
      className={`${
        themeMode === "light"
          ? "bg-white text-black"
          : "bg-[#222423] text-white"
      } flex flex-col gap-2 rounded-2xl p-4 cursor-pointer`}
    >
      <AssistantsAvatars
        firstAssistents={event.firstAssistents}
        total={event.totalAssistents}
        peopleLabel={peopleText}
        actionText={willGoText}
      />

      <div className="flex flex-col gap-2 font-semibold">
        <div>
          <p className="opacity-50">{event.eventCategory}</p>
          <p className="truncate w-full text-[1.2em]">{event.eventName}</p>
        </div>
        <div className="flex items-center gap-1">
          <Icon path={mdiUpdate} size={1} />
          <p>{event.eventTime}</p>
          <Icon path={mdiCircleSmall} size={1} />
          <p className="truncate w-full">
            {new Date(event.eventDate).toLocaleDateString(currentLanguage, {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div
          className={`${
            themeMode === "light" ? "bg-[#EBEBEB]" : "bg-[#313131]"
          } w-[80%] opacity-50 rounded-lg p-2 flex items-center gap-2`}
        >
          <Icon path={mdiMapMarker} size={1} />
          <p className="truncate w-full">{event.eventLocation}</p>
        </div>
      </div>
    </div>
  );
};
