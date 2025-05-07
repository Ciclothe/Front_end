import { CardEvent } from "@/components/Event/CardEvent";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";
import { EventType } from "@/types/index";

const events: EventType[] = [
  {
    id: 1,
    token: "a9X3vB1cD4pE5sQ7mN8wZ6yT2kR0uLf",
    isJoined: false,
    eventName: "1",
    createdBy: "lielcite",
    category: "Vintage",
    date: "2025-01-15",
    time: "19:00:00",
    location: { lat: 39.4676153, lng: -0.4039672 },
    members: { current: 12, total: 80 },
    garments: 20,
    verified: true,
    participants: [
      {
        userId: 1,
        userName: "lielcita1230",
        profilePic:
          "https://i.pinimg.com/736x/dd/43/e9/dd43e93f36e61a85d2a0c9ec5304dc66.jpg",
      },
      {
        userId: 2,
        userName: "marcRios24",
        profilePic:
          "https://i.pinimg.com/236x/b6/8e/30/b68e309a658594c01061445ab3af0c4b.jpg",
      },
      {
        userId: 3,
        userName: "jorgeTD",
        profilePic:
          "https://i.pinimg.com/236x/82/45/4b/82454b6a835f263fcf57df6dfc09a069.jpg",
      },
      {
        userId: 4,
        userName: "Maria_goya",
        profilePic:
          "https://i.pinimg.com/736x/4f/d6/84/4fd684c1a9624fd229acd7d55723c80d.jpg",
      },
      {
        userId: 5,
        userName: "Maria_goya",
        profilePic:
          "https://i.pinimg.com/736x/90/aa/6e/90aa6e00e120a7a14d33bb084cfc8521.jpg",
      },
      {
        userId: 6,
        userName: "Maria_goya",
        profilePic:
          "https://i.pinimg.com/474x/f1/dc/46/f1dc46fc4ca36a6495de11a81678ecbd.jpg",
      },
      {
        userId: 7,
        userName: "Maria_goya",
        profilePic:
          "https://i.pinimg.com/236x/e8/6d/e8/e86de8b545d822f7d4540ac9f5d16728.jpg",
      },
      {
        userId: 8,
        userName: "Maria_goya",
        profilePic:
          "https://i.pinimg.com/736x/7e/b9/c6/7eb9c60e8dc84c468f51b01a19008b03.jpg",
      },
      {
        userId: 9,
        userName: "Maria_goya",
        profilePic:
          "https://i.pinimg.com/236x/21/82/92/218292401378795be0c77d60a4d4b726.jpg",
      },
      {
        userId: 10,
        userName: "Maria_goya",
        profilePic:
          "https://i.pinimg.com/474x/3e/e6/65/3ee6651c67b1353727c893ab4bea3003.jpg",
      },
      {
        userId: 11,
        userName: "Maria_goya",
        profilePic:
          "https://i.pinimg.com/236x/39/bb/a6/39bba69f18afbb964eb01c7efa468ae9.jpg",
      },
      {
        userId: 12,
        userName: "Maria_goya",
        profilePic:
          "https://i.pinimg.com/736x/34/ea/39/34ea39c6986e9b723fb62e2967930389.jpg",
      },
    ],
    eventRules: {
      participantLimit: 50,
      garmentLimitPerPerson: 5,
      garmentMinimumPerPerson: 2,
    },
    saved: false,
    shared: false,
  },
];

export const EventList = () => {
  const { t } = useTranslation();
  const { themeMode } = useTheme();

  return (
    <>
      <div
        className={`${
          themeMode === "light" ? "text-black" : "text-white"
        } flex flex-col gap-4 w-full`}
      >
        <h3 className="font-bold text-[1.2em]">
          {t("mainLayout.next_events")}
        </h3>
        {events.map((event: EventType) => (
          <div key={event.id}>
            <CardEvent key={event.id} event={event} showActionButton={false} />
          </div>
        ))}
      </div>
    </>
  );
};
