import { useTheme } from "@/context/ThemeContext";
import {
  mdiAccountGroup,
  mdiArrowLeft,
  mdiCalendarBlank,
  mdiHanger,
  mdiHeartOutline,
  mdiMapMarker,
  mdiStar,
} from "@mdi/js";
import Icon from "@mdi/react";
import Masonry from "@mui/lab/Masonry";
import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { PostInfoOverlay } from "@/components/Common/Post/PostInfoOverlay";
import MapLocation from "@/components/Common/MapLocation";
import { useTranslation } from "react-i18next";
import {
  conditionColors,
  formatDate,
  formatTime,
  getCityAndCountry,
  getFullAddress,
} from "@/components/Utils/format";
import { UserHeader } from "@/components/Common/Post/UserHeader";
import { useModal } from "@/context/ModalContext";
import { EventOffer } from "@/components/Event/EventOffer";

const eventTestData = [
  {
    id: 2,
    postType: "event",
    token: "a9X3vB1cD4pE5sQ7mN8wZ6yT2kR0uLf",
    userData: {
      userId: 1,
      profilePicture:
        "https://i.pinimg.com/736x/a3/c0/40/a3c040ee9e0cb3a06684a603c1a06a9c.jpg",
      userName: "grifoMmm",
    },
    eventData: {
      id: 1,
      isJoined: false,
      createdAt: "2025-04-05T13:00:00Z",
      privacity: "private",
      eventTitle: "Retro Revival Night: Fashion & Music",
      description:
        "Join a unique event where streetwear and sneakers enthusiasts come together to trade second-hand fashion. Bring your best pre-loved pieces, discover new treasures, and connect with a community that values creativity and style. Give your wardrobe a fresh look while making meaningful connections!",
      category: "Vintage",
      eventRules: {
        participantLimit: 50,
        garmentLimitPerPerson: 5,
        garmentMinimumPerPerson: 2,
      },
      date: "2025-05-25",
      time: "19:00:00",
      location: { lat: 39.46765698570767, lng: -0.4039782285690308 },
      members: { current: 12, total: 80 },
      verified: false,
    },
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
    eventPosts: [
      {
        token: 1,
        postedBy: "jaimemarzzoo",
        profilePicture:
          "https://i.pinimg.com/736x/74/9a/f8/749af809fe85c36f23297ac9829f83e1.jpg",
        condition: "used",
        title: "Boxy fit hoodie",
        color: "Gray",
        size: "M",
        brand: "Gap",
        imagesOrientation: "vertical",
        mainImages: {
          id: 1,
          url: "https://images1.vinted.net/t/04_020f9_3c1rcHdCEbxjXb2HZGFEVH4L/f800/1743196825.jpeg?s=2d64ab3223dd941c7e68dc114b4cd4ae6f2adc4a",
        },
      },
      {
        token: 2,
        postedBy: "chauhan",
        profilePicture:
          "https://i.pinimg.com/736x/58/1e/99/581e999a1c1ab0119de6285577325015.jpg",
        condition: "used",
        title: "Leather Jacket",
        color: "Brown",
        size: "L",
        brand: "Vintage Dressing",
        imagesOrientation: "horizontal",
        mainImages: {
          id: 1,
          url: "https://images1.vinted.net/t/01_01dfc_AzXpGCE5eCzAuEzbRR9aCzSw/f800/1726925285.jpeg?s=3d6e049f0e87862c33a5cfef645a42022409ff64",
        },
      },
      {
        token: 3,
        postedBy: "dougie94",
        profilePicture:
          "https://i.pinimg.com/736x/f9/3f/c8/f93fc8fc32053c7f0f7454acf309bc6d.jpg",
        condition: "used",
        title: "White Ralph Lauren Polo neck sweatshirt",
        color: "White",
        size: "M",
        brand: "Ralph Lauren",
        imagesOrientation: "vertical",
        mainImages: {
          id: 1,
          url: "https://images1.vinted.net/t/04_00b88_LVvL1m3zhPnsuF7i1AYv3An9/f800/1743789841.jpeg?s=c666acb294d89370908b3561aa0e87c5d85358d6",
        },
      },
      {
        token: 4,
        postedBy: "djmo1980",
        profilePicture:
          "https://i.pinimg.com/736x/cb/0e/31/cb0e31261af7c6fd3e3a9076489c46de.jpg",
        condition: "used",
        title: "Zapatillas El Ganso",
        color: "Brown",
        size: "44",
        brand: "EL GANSO",
        imagesOrientation: "horizontal",
        mainImages: {
          id: 1,
          url: "https://images1.vinted.net/t/04_0233b_9375uGyQCqm7mmz3PoR9Eosj/f800/1743261831.jpeg?s=1ea0774f1501dd074b2129a6b32eccb780913ea6",
        },
      },
    ],
  },
];

const THEME_STYLES = {
  light: {
    bg: "bg-white",
    border: "border-[rgba(0,0,0,0.1)]",
  },
  dark: {
    bg: "bg-[#222423]",
    border: "border-[rgba(255,255,255,0.1)]",
  },
};

const InfoItem = ({
  icon,
  label,
  value,
  themeMode,
}: {
  icon: string;
  label: string;
  value: string | number;
  themeMode: "light" | "dark";
}) => (
  <div className="flex gap-4 items-center">
    <div className={`${THEME_STYLES[themeMode].border} border p-2 rounded-md`}>
      <Icon path={icon} size={1} />
    </div>
    <div>
      <p className="text-md opacity-50">{label}</p>
      <p className="font-bold">{value}</p>
    </div>
  </div>
);

const getDateStatus = (dateString: string) => {
  const today = new Date();
  const postDate = new Date(dateString);
  const timeDiff = today.getTime() - postDate.getTime();
  const daysDiff = timeDiff / (1000 * 3600 * 24);

  const sameWeek = daysDiff <= 7 && postDate.getMonth() === today.getMonth();
  const sameMonth = postDate.getMonth() === today.getMonth();
  const isPast = daysDiff > 0;

  if (isPast) {
    return {
      status: "realized",
      textColor: "text-[#606062]",
    };
  } else if (sameWeek) {
    return {
      status: "this_week",
      textColor: "text-[#bc0d0d]",
    };
  } else if (sameMonth) {
    return {
      status: "upcoming",
      textColor: "text-[#F4803B]",
    };
  } else {
    return {
      status: "soon",
      textColor: "text-[#FFCF03]",
    };
  }
};
export const EventDetails = () => {
  const { themeMode } = useTheme();
  const navigate = useNavigate();
  const { token } = useParams();
  const { openModal } = useModal();

  const containerRef = useRef<HTMLDivElement>(null);
  const { i18n, t } = useTranslation();
  const [cityAndCountry, setCityAndCountry] = useState("Cargando...");
  const [address, setAddress] = useState("Cargando...");

  const data = eventTestData.find((e) => e.token === token);
  const styles = THEME_STYLES[themeMode];

  useEffect(() => {
    if (data) {
      const fetchLocation = async () => {
        const locationName = await getCityAndCountry(
          data.eventData.location.lat,
          data.eventData.location.lng,
          i18n.language
        );
        const locationAddress = await getFullAddress(
          data.eventData.location.lat,
          data.eventData.location.lng,
          i18n.language
        );
        setAddress(locationAddress);
        setCityAndCountry(locationName);
      };

      fetchLocation();
    }
  }, [data, i18n]);

  if (!data) {
    return <Navigate to="/404" />;
  }

  const { eventData, participants, eventPosts, userData } = data;
  const { status, textColor } = getDateStatus(eventData.date);

  const SectionHeader = ({
    title,
    count,
  }: {
    title: string;
    count: number;
  }) => (
    <div className="flex justify-between items-center">
      <p className="font-bold">{title}</p>
      <p className="opacity-50 text-md">{count}</p>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="w-[100%] xl:w-[75%] text-start px-4 pb-4 md:px-10 xl:px-0 mx-auto flex flex-col h-full relative overflow-auto"
    >
      {/** Event Details Header */}
      <div className="py-4 md:pt-0 flex items-center justify-between gap-4">
        {/** Back Bottom */}
        <div
          className={`${
            themeMode === "light" ? "bg-[#EDEDED]" : "bg-[#222423]"
          } p-2 rounded-full cursor-pointer`}
          onClick={() => navigate(-1)}
        >
          <Icon path={mdiArrowLeft} size={1} />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {/* Event Map */}
        <div className="col-span-12">
          <div className="w-full h-[20em] rounded-2xl overflow-hidden">
            <MapLocation location={eventData.location} zoom={16} />
          </div>
        </div>

        {/* Event Info */}
        <div className="col-span-12 grid grid-cols-12 gap-4 text-start">
          {/* Event Actions */}
          <div className="col-span-12">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
              <p className="text-[1.8em] font-bold leading-[1.2]">
                {eventData.eventTitle}
              </p>
              <div
                className={`${
                  themeMode === "light"
                    ? "hover:text-white"
                    : "hover:text-black"
                } ${
                  eventData.isJoined
                    ? "bg-[rgba(188,13,13,0.1)] text-[#bc0d0d] hover:bg-[#bc0d0d]"
                    : eventData.privacity === "public"
                    ? "bg-[rgba(13,188,115,0.1)] text-[#0DBC73] hover:bg-[#0DBC73]"
                    : "bg-[rgba(136,70,242,0.1)] text-[#8846F2] hover:bg-[#8846F2]"
                } px-5 py-3 w-full md:w-fit rounded-xl font-bold text-center cursor-pointer`}
                onClick={() => openModal(<EventOffer />, { token: data.token })}
              >
                {eventData.isJoined
                  ? t("mainLayout.leave_event")
                  : eventData.privacity === "public"
                  ? t("mainLayout.join_event")
                  : t("mainLayout.submit_request")}
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2 items-center">
              <p className={`${textColor} font-bold`}>
                {t(`mainLayout.${status}`)}
              </p>
              <p className="opacity-50">
                | {`${formatTime(eventData.time)} · ${cityAndCountry}`}
              </p>
            </div>
          </div>

          {/* Event Details */}
          <div
            className={`${styles.bg} col-span-12 md:col-span-6 rounded-2xl p-4 justify-center flex flex-col gap-4`}
          >
            <InfoItem
              themeMode={themeMode}
              icon={mdiStar}
              label={t("mainLayout.category")}
              value={eventData.category}
            />
            <div className="flex gap-4 items-center">
              <div
                className={`${THEME_STYLES[themeMode].border} border p-2 rounded-md`}
              >
                <Icon path={mdiCalendarBlank} size={1} />
              </div>
              <div>
                <p className="text-md opacity-50">
                  {t("mainLayout.event_date")}
                </p>
                <p className="font-bold">
                  {formatDate(eventData.date, i18n.language)}
                </p>
              </div>
            </div>
            <InfoItem
              themeMode={themeMode}
              icon={mdiMapMarker}
              label={t("mainLayout.event_location")}
              value={address}
            />
          </div>

          {/* User Info */}
          <div
            className={`${styles.bg} col-span-12 md:col-span-6 rounded-2xl p-4 flex flex-col gap-4`}
          >
            <div>
              <p className="font-bold">{t("mainLayout.event_details")}</p>
              <p className="opacity-50">{eventData.description}</p>
            </div>
            <div className="flex-col md:flex-row flex gap-2">
              <div className="flex gap-4 items-center w-full md:w-[50%] truncate">
                <InfoItem
                  themeMode={themeMode}
                  icon={mdiAccountGroup}
                  label={t("mainLayout.participant_limits")}
                  value={eventData.eventRules.participantLimit}
                />
              </div>
              <div className="flex gap-4 items-center w-full md:w-[50%] truncate">
                <InfoItem
                  themeMode={themeMode}
                  icon={mdiHanger}
                  label={t("mainLayout.garment_limit")}
                  value={eventData.eventRules.garmentLimitPerPerson}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Participants */}
        <div className="col-span-12 flex flex-col gap-4">
          <SectionHeader
            title={t("mainLayout.participants")}
            count={participants.length}
          />
          <div className="flex gap-2 flex-wrap">
            {participants.map((participant) => (
              <img
                key={participant.userId}
                src={participant.profilePicture}
                alt={participant.userName}
                className="w-[60px] h-[60px] rounded-full object-cover"
              />
            ))}
          </div>
        </div>

        {/* Event Closet */}
        <div className="col-span-12 flex flex-col gap-4">
          <SectionHeader
            title={t("mainLayout.event_closet")}
            count={eventPosts.length}
          />
          <Masonry columns={{ xs: 2, sm: 3 }} spacing={2} sequential>
            {eventPosts.map((garment, index) => (
              <div
                key={index}
                className={`${
                  themeMode === "light"
                    ? "xl:bg-white xl:hover:bg-[#EDEDED]"
                    : "xl:bg-[#222423] xl:hover:bg-[#323332]"
                } cursor-pointer xl:rounded-xl flex flex-col gap-2 xl:gap-4 xl:p-2`}
                onClick={() => {
                  navigate(`/swapDetails/${garment?.token}`);
                }}
              >
                {/* Imagen */}
                <div
                  className={`rounded-md overflow-hidden relative aspect-[2/3] xl:aspect-[4/5]`}
                >
                  <img
                    src={garment?.mainImages?.url}
                    alt={garment?.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />

                  {/* Avatar + Nombre */}
                  <div className="hidden xl:block">
                    <UserHeader
                      postData={eventData}
                      userData={userData}
                      postType={"swap"}
                      isAbsolute={true}
                    />
                  </div>

                  {/* Info inferior */}
                  <div className="hidden xl:block">
                    <PostInfoOverlay
                      condition={garment?.condition}
                      title={garment?.title}
                      color={garment?.color}
                      size={garment?.size}
                      brand={garment?.brand}
                    />
                  </div>
                </div>
                <div className="xl:hidden">
                  <div className="flex items-center gap-2 justify-between">
                    <p
                      className="font-semibold"
                      style={{ color: conditionColors[garment?.condition] }}
                    >
                      {t(`mainLayout.${garment?.condition}`)}
                    </p>
                    <Icon path={mdiHeartOutline} size={0.8} />
                  </div>
                  <p className="text-[1.1em] font-bold truncate">
                    {garment?.title}
                  </p>
                  <p className="opacity-50 font-semibold text-md truncate">
                    {garment?.color} | {garment?.size} | {garment?.brand}
                  </p>
                </div>
              </div>
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
};
