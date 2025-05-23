import Icon from "@mdi/react";
import {
  mdiCheck,
  mdiCheckAll,
  mdiCircleSmall,
  mdiClose,
  mdiMapMarker,
  mdiUpdate,
} from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";
import {
  formatDate,
  formatTime,
  getFullAddress,
} from "@/components/Utils/format";
import i18n from "@/i18n";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// TODO: Fetch events from the server
const eventData = [
  {
    token: "a9X3vB1cD4pE5sQ7mN8wZ6yT2kR0uLf",
    status: "completed",
    name: "Retro Revival Night: Fashion & Music",
    date: "2025-04-27",
    category: "Fashion & Music",
    time: "19:00:00",
    location: { lat: 39.46765698570767, lng: -0.4039782285690308 },
    participants: [
      {
        userId: 1,
        userName: "lielcita1230",
        profilePicture:
          "https://i.pinimg.com/736x/3f/4f/e9/3f4fe92639ea9d5980ef1760212e7b86.jpg",
      },
      {
        userId: 2,
        userName: "marcRios24",
        profilePicture:
          "https://i.pinimg.com/236x/b6/8e/30/b68e309a658594c01061445ab3af0c4b.jpg",
      },
      {
        userId: 3,
        userName: "jorgeTD",
        profilePicture:
          "https://i.pinimg.com/236x/82/45/4b/82454b6a835f263fcf57df6dfc09a069.jpg",
      },
      {
        userId: 4,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/4f/d6/84/4fd684c1a9624fd229acd7d55723c80d.jpg",
      },
      {
        userId: 5,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/90/aa/6e/90aa6e00e120a7a14d33bb084cfc8521.jpg",
      },
      {
        userId: 6,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/f1/dc/46/f1dc46fc4ca36a6495de11a81678ecbd.jpg",
      },
      {
        userId: 7,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/e8/6d/e8/e86de8b545d822f7d4540ac9f5d16728.jpg",
      },
      {
        userId: 8,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/7e/b9/c6/7eb9c60e8dc84c468f51b01a19008b03.jpg",
      },
      {
        userId: 9,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/21/82/92/218292401378795be0c77d60a4d4b726.jpg",
      },
      {
        userId: 10,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/3e/e6/65/3ee6651c67b1353727c893ab4bea3003.jpg",
      },
      {
        userId: 11,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/39/bb/a6/39bba69f18afbb964eb01c7efa468ae9.jpg",
      },
      {
        userId: 12,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/34/ea/39/34ea39c6986e9b723fb62e2967930389.jpg",
      },
    ],
  },
  {
    token: "cGe2aa0fMjM=",
    status: "active",
    name: "CicloTrendy Market",
    category: "Fashion & Music",
    date: "2025-09-05",
    time: "14:00:00",
    location: { lat: 39.46765698570767, lng: -0.4039782285690308 },
    participants: [
      {
        userId: 5,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/90/aa/6e/90aa6e00e120a7a14d33bb084cfc8521.jpg",
      },
      {
        userId: 6,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/f1/dc/46/f1dc46fc4ca36a6495de11a81678ecbd.jpg",
      },
      {
        userId: 7,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/e8/6d/e8/e86de8b545d822f7d4540ac9f5d16728.jpg",
      },
      {
        userId: 8,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/7e/b9/c6/7eb9c60e8dc84c468f51b01a19008b03.jpg",
      },
    ],
  },
  {
    token: "cGe2aa0fMjM=",
    status: "canceled",
    name: "Chic & Chill: Picnic de Intercambio",
    date: "2025-03-13",
    category: "Fashion & Music",
    time: "22:00:00",
    location: { lat: 39.46765698570767, lng: -0.4039782285690308 },
    participants: [
      {
        userId: 4,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/4f/d6/84/4fd684c1a9624fd229acd7d55723c80d.jpg",
      },
      {
        userId: 7,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/e8/6d/e8/e86de8b545d822f7d4540ac9f5d16728.jpg",
      },
      {
        userId: 8,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/7e/b9/c6/7eb9c60e8dc84c468f51b01a19008b03.jpg",
      },
      {
        userId: 9,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/21/82/92/218292401378795be0c77d60a4d4b726.jpg",
      },
      {
        userId: 10,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/474x/3e/e6/65/3ee6651c67b1353727c893ab4bea3003.jpg",
      },
      {
        userId: 11,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/236x/39/bb/a6/39bba69f18afbb964eb01c7efa468ae9.jpg",
      },
      {
        userId: 12,
        userName: "Maria_goya",
        profilePicture:
          "https://i.pinimg.com/736x/34/ea/39/34ea39c6986e9b723fb62e2967930389.jpg",
      },
    ],
  },
];

type EventStatus = "active" | "canceled" | "completed";

const statusConfig = {
  active: {
    label: "active",
    color: "#0DBC73",
    icon: mdiCheck,
  },
  canceled: {
    label: "canceled",
    color: "#DC3545",
    icon: mdiClose,
  },
  completed: {
    label: "completed",
    color: "#353172",
    icon: mdiCheckAll,
  },
};

export const JoinedEventsView = () => {
  const { themeMode } = useTheme();
  const [addresses, setAddresses] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchAddresses = async () => {
      const newAddresses: Record<string, string> = {};

      for (const event of eventData) {
        const fullAddress = await getFullAddress(
          event.location.lat,
          event.location.lng,
          i18n.language
        );
        newAddresses[event.token] = fullAddress;
      }

      setAddresses(newAddresses);
    };

    fetchAddresses();
  }, []);

  return (
    <div className="w-full mx-auto h-full pb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...eventData]
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .map((event) => {
            const status = statusConfig[event.status as EventStatus];

            return (
              <div
                key={event.token}
                className={`${
                  themeMode === "light"
                    ? "bg-white text-black"
                    : "bg-[#222423] text-white"
                } flex flex-col gap-2 rounded-2xl p-4 cursor-pointer`}
              >
                <div className="flex flex-col gap-2 font-semibold">
                  <div className="text-start">
                    <p className="opacity-50">{event.category}</p>
                    <p className="truncate w-full text-[1.2em]">{event.name}</p>
                  </div>

                  <div className="flex items-center gap-1 text-start">
                    <Icon path={mdiUpdate} size={1} />
                    <p className="whitespace-nowrap">
                      {formatTime(event.time)}
                    </p>
                    <Icon path={mdiCircleSmall} size={1} />
                    <p className="truncate w-full">
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
                      {addresses[event.token] || "Cargando dirección..."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full mt-2 gap-2">
                  <div
                    className="px-4 h-full rounded-lg font-semibold flex items-center gap-2 w-fit"
                    style={{
                      backgroundColor: `${status.color}1A`,
                      color: status.color,
                    }}
                  >
                    <Icon path={status.icon} size={1} color={status.color} />
                    {t(`mainLayout.${status.label}`)}
                  </div>
                  <button
                    className={`${
                      themeMode === "dark"
                        ? "bg-[#F7F7F7] text-black"
                        : "bg-[#171717] text-white"
                    } px-4 py-2 font-bold rounded-md w-full truncate`}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/eventDetails/${event.token}`);
                    }}
                  >
                    {t("mainLayout.event_details")}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
