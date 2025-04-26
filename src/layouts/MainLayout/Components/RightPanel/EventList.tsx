import { EventCard } from "./EventCard";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import { useModal } from "@/context/ModalContext";

const events = [
  {
    id: 2,
    eventName: "Retro Revival Night: Fashion & Music",
    token: "c3dhcC0yMzQ=",
    eventDate: "2025-04-27",
    eventTime: "10:00:00",
    eventLocation: { lat: 39.46765698570767, lng: -0.4039782285690308 },
    eventCategory: "Vintage",
    totalAssistants: 4,
    firstAssistants: [
      {
        id: 1,
        name: "Name 1",
        avatar:
          "https://i.pinimg.com/736x/ee/c5/e7/eec5e7ce2bf4d0ee1c8381bd299c2646.jpg",
      },
      {
        id: 2,
        name: "Name 2",
        avatar:
          "https://i.pinimg.com/736x/f3/f5/88/f3f588e0e58e604202fdca493861b836.jpg",
      },
    ],
  },
];

export const EventList = () => {
  const { t } = useTranslation();
  const { themeMode } = useTheme();
  const { openModal } = useModal();

  return (
    <>
      <div
        className={`${
          themeMode === "light" ? "text-black" : "text-white"
        } flex flex-col gap-4`}
      >
        <h3 className="font-bold text-[1.2em]">
          {t("mainLayout.next_events")}
        </h3>
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => {
              openModal(event.token, "event");
            }}
          >
            <EventCard key={event.id} event={event} />
          </div>
        ))}
      </div>
    </>
  );
};
