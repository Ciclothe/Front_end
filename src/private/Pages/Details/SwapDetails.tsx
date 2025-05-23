import { useTheme } from "@/context/ThemeContext";
import { Navigate, useParams } from "react-router-dom";
import { mdiArrowLeft, mdiChevronRight } from "@mdi/js";
import { Icon } from "@mdi/react";
import { PostImageCarousel } from "@/components/Common/Post/PostImageCarousel";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { LikeBtn } from "@/components/Common/LikeBtn";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import i18n from "@/i18n";
import { PiSwapFill } from "react-icons/pi";
import { SuggestedItems } from "@/components/Common/SuggestedItems";
import { useNavigate } from "react-router-dom";
import { SwapOfferSteps } from "@/components/Swap/SwapOfferSteps";
import { useModal } from "@/context/ModalContext";

// TODO: Remove this test data and fetch from API
const swapPostTestData = [
  {
    id: 1,
    postType: "swap",
    token: "X9WL32TVKMZPR8A6UFQYC7NJE",
    userData: {
      userId: 1,
      profilePicture:
        "https://i.pinimg.com/736x/6a/3b/01/6a3b01b467a751122986da4cb9764033.jpg",
      userName: "poseidon",
      ranting: 4.5,
      totalRantings: 25,
    },
    postData: {
      id: 2,
      distance: "2 km",
      location: { lat: 39.4676153, lng: -0.4039672 },
      createdAt: "2025-04-05T13:00:00Z",
      condition: "used",
      title: "Boxy Fit Hoodie",
      color: "Brown",
      colorCode: "#A48C47",
      size: "M",
      fabric: "100% Leather",
      brand: "Levi's",
      description: `Boxy fit hoodie charcoal grey
Size : L
New been worn
      
Russell, vintage, perfect hoodie, Kanye west, yzy, Yeezy gap, akimbo, velour garments, sweats collective`,
      imagesOrientation: "vertical",
      images: [
        {
          id: 1,
          url: "https://images1.vinted.net/t/04_00c90_MRBRdcAp1QUzDByCZ3oaaf2Q/f800/1734704789.jpeg?s=6a00536c82c882254c7ef7f780e7b7d93e83c744",
        },
        {
          id: 2,
          url: "https://images1.vinted.net/t/04_002f7_kz6B2QjvhThw7D6hvkZ7WfpH/f800/1734704789.jpeg?s=fa37dc8372251a3d7b4552bb326aa78d43a5753b",
        },
        {
          id: 3,
          url: "https://images1.vinted.net/t/02_0025c_rbX3UTs4YZGw84ExJpKw4m9M/f800/1734704789.jpeg?s=2ace1c16e4c05234196941aa30305a941591dae4",
        },
        {
          id: 4,
          url: "https://images1.vinted.net/t/01_01e8c_BxDshmg9ve3zDKyLDUkJRfpo/f800/1734704789.jpeg?s=9262ae72c10ec2656c89e09de6eddbdfae2d8d77",
        },
        {
          id: 5,
          url: "https://images1.vinted.net/t/03_01d7e_UgoG5Uv9EiiWs79mPqorpXGJ/f800/1734704789.jpeg?s=8b9223fa1516069006dc424182c673aad2fba207",
        },
        {
          id: 6,
          url: "https://images1.vinted.net/t/03_01d7e_UgoG5Uv9EiiWs79mPqorpXGJ/f800/1734704789.jpeg?s=8b9223fa1516069006dc424182c673aad2fba207",
        },
        {
          id: 7,
          url: "https://images1.vinted.net/t/02_01f20_T9pNTYWN6Zk2cQhxJT8htV3i/f800/1734704789.jpeg?s=d57cae7f6d07ca876e4e9ada43221b5470600af5",
        },
      ],
      hashTags: [
        "Russell",
        "vintage",
        "perfect hoodie",
        "Kanye west",
        "yzy",
        "Yeezy gap",
        "akimbo",
        "velour garments",
        "sweats collective",
      ],
    },
    totalOffers: 4,
    last_online: "2025-05-08T13:38:00Z",
    liked: false,
    chatToken: "R7LX92DBVQMTYA3KJZNEUCW4",
    offerSent: false,
  },
  {
    id: 2,
    postType: "swap",
    token: "M5ZK84HQVNTYAC9XLR3UEWJG",
    userData: {
      userId: 1,
      profilePicture:
        "https://i.pinimg.com/736x/5b/a2/62/5ba26284b03f86682056eb72d9882eba.jpg",
      userName: "Frankjones1984",
      ranting: 4,
      totalRantings: 10,
    },
    postData: {
      id: 2,
      distance: "2 km",
      location: { lat: 39.4676153, lng: -0.4039672 },
      createdAt: "2025-04-05T13:00:00Z",
      condition: "as_new",
      title: "Fear of God Essentials Pantalón Corto.",
      color: "Grey",
      colorCode: "#95928B",
      size: "S",
      fabric: "100% Cotton",
      brand: "Fear of God",
      description: `Pantalón Corto de Fear of God. Essentials
Como nuevos, sin usar. ~ Color negro grisáceo

Se ajustan perfectamente al cuerpo, talla adecuada. ~Talla: S ☑️`,
      imagesOrientation: "vertical",
      images: [
        {
          id: 1,
          url: "https://images1.vinted.net/t/04_008f3_eG6ctkAzQXn7S5JxgGRQAtjA/f800/1746548886.jpeg?s=f4db4a803d1c4ebc66a65873bc75c3a40502dad8",
        },
        {
          id: 2,
          url: "https://images1.vinted.net/t/04_02183_fTZqiX6YFesFABSWTeuaD6Wk/f800/1746548886.jpeg?s=7b50097bbe9d446033fb44c19827acb7e77227be",
        },
        {
          id: 3,
          url: "https://images1.vinted.net/t/04_02183_fTZqiX6YFesFABSWTeuaD6Wk/f800/1746548886.jpeg?s=7b50097bbe9d446033fb44c19827acb7e77227be",
        },
        {
          id: 4,
          url: "https://images1.vinted.net/t/04_0052d_ZvFX5gs9fzCTmaLbneQxRkPE/f800/1746548886.jpeg?s=9f9e05853489fb94eb797bdc482f343e9179e082",
        },
        {
          id: 5,
          url: "https://images1.vinted.net/t/04_0211e_h66pNw3ZiKH2CgSp4y9uTVXX/f800/1746548886.jpeg?s=8e759a25b2d68b66c76292a0ce283c37802cd895",
        },
      ],
      hashTags: ["Fear of God", "Essentials", "Pantalón Corto", "Como nuevos"],
    },
    totalOffers: 4,
    last_online: "2025-05-08T13:38:00Z",
    liked: false,
    chatToken: "R7LX92DBVQMTYA3KJZNEUCW4",
    offerSent: false,
  },
];

export const SwapDetails = () => {
  const { token } = useParams();
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const [location, setLocation] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();
  const { openModal } = useModal();

  const containerRef = useRef<HTMLDivElement>(null);

  dayjs.extend(relativeTime);
  dayjs.locale(i18n.language);
  const data = swapPostTestData.find((e) => e.token === token);

  useEffect(() => {
    if (data?.postData?.location) {
      setLocation(
        `${data.postData.location.lat}, ${data.postData.location.lng}`
      );
    }
  }, [data]);

  useEffect(() => {
    console.log("Scroll ref:", containerRef.current);
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [token]);

  if (!data) {
    return <Navigate to="/404" replace />;
  }

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

  return (
    <>
      <div
        ref={containerRef}
        className="w-[100%] xl:w-[75%] px-4 md:px-10 xl:px-0 mx-auto flex flex-col h-full relative overflow-auto"
      >
        {/* Garment Details */}
        <div className="flex flex-col">
          {/* Header */}
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
          <div className={`grid grid-cols-12 gap-4`}>
            {/** Post Image */}
            <div
              className={`${
                data?.postType === "event"
                  ? "col-span-12"
                  : "col-span-12 md:col-span-6 flex flex-col gap-4"
              }`}
            >
              <div className="flex flex-col gap-4 relative">
                <PostImageCarousel post={data} widthPercentage="100%" />
                <div className="absolute bottom-0 left-0 flex gap-2 overflow-auto w-fit max-w-full pr-2 rounded-xl p-2">
                  {data?.postData?.images
                    ?.slice(0, 2)
                    .map(
                      (image: { id: number; url: string }, index: number) => (
                        <img
                          key={index}
                          src={image.url}
                          alt={
                            data?.postData?.title || `Post Image ${index + 1}`
                          }
                          className={`${
                            themeMode === "light"
                              ? "border-[#F7F7F7]"
                              : "border-[#121212]"
                          } w-[15%] aspect-[1/1] object-cover rounded-xl border-3`}
                        />
                      )
                    )}
                  {data?.postData?.images?.length > 2 && (
                    <div
                      className={`${
                        themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#121212]"
                      } w-[15%] aspect-[1/1] flex items-center justify-center rounded-xl text-center`}
                    >
                      <p className="text-md font-bold">
                        +{data?.postData?.images.length - 2} <br />{" "}
                        {t("mainLayout.more")}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto flex-wrap">
                {data?.postData?.hashTags.map((tag, index) => (
                  <div
                    key={index}
                    className={`${
                      themeMode === "light"
                        ? "bg-white hover:bg-[#E2E2E2] text-black"
                        : "bg-[#222423] hover:bg-[#323332] text-white"
                    } cursor-pointer w-fit max-w-[120px] px-2 py-1 rounded-full text-sm font-semibold truncate whitespace-nowrap overflow-hidden`}
                  >
                    #{tag}
                  </div>
                ))}
              </div>
            </div>
            {/** Post Info */}
            <div
              className={`${
                data?.postType === "event"
                  ? "col-span-12"
                  : "col-span-12 md:col-span-6"
              }`}
            >
              {/** Post Info */}
              <div className={`grid grid-cols-12 gap-4`}>
                {/** Post Info */}
                <div
                  className={`${
                    themeMode === "light" ? "bg-white" : "bg-[#222423]"
                  } ${
                    data?.postType === "event"
                      ? "col-span-12 md:col-span-6 justify-center"
                      : "col-span-12"
                  } w-full rounded-xl p-4 text-start flex flex-col gap-2`}
                >
                  <div
                    className={`flex flex-col gap-2 pb-2 border-b ${
                      themeMode === "light"
                        ? "border-black/5"
                        : "border-white/10"
                    }`}
                  >
                    <p className="text-[1.8em] font-bold leading-[1.2]">
                      {data?.postData?.title}
                    </p>
                    <p className="whitespace-pre-wrap font-sans">
                      {data?.postData?.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex w-full justify-between">
                      <p className="opacity-50">{t("mainLayout.size")}</p>
                      <p className="font-semibold">{data?.postData?.size}</p>
                    </div>
                    <div className="flex w-full justify-between">
                      <p className="opacity-50">{t("mainLayout.condition")}</p>
                      <p className="font-semibold">
                        {t(`mainLayout.${data?.postData?.condition}`)}
                      </p>
                    </div>
                    <div className="flex w-full justify-between">
                      <p className="opacity-50">{t("mainLayout.brand")}</p>
                      <p className="font-semibold">{data?.postData?.brand}</p>
                    </div>
                    <div className="flex w-full justify-between">
                      <p className="opacity-50">{t("mainLayout.color")}</p>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: data?.postData?.colorCode,
                          }}
                        ></div>
                        <p className="font-semibold">{data?.postData?.color}</p>
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <p className="opacity-50">{t("mainLayout.fabric")}</p>
                      <p className="font-semibold">{data?.postData?.fabric}</p>
                    </div>
                  </div>
                </div>
                {/* User Info */}
                <div
                  className={`${
                    themeMode === "light" ? "bg-white" : "bg-[#222423]"
                  } ${
                    data?.postType === "event"
                      ? "col-span-12 md:col-span-6 p-4"
                      : "col-span-12"
                  } rounded-xl text-start overflow-y-auto max-h-[30vh]`}
                >
                  {/* User Rating */}
                  <div
                    className={`${
                      themeMode === "light"
                        ? "hover:bg-[#e2e2e2]"
                        : "hover:bg-[#323332]"
                    } flex items-center justify-between cursor-pointer p-4`}
                    onClick={() => {
                      navigate(`/profile/${data?.userData?.userName}`);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Avatar
                        variant="rounded"
                        src={data?.userData?.profilePicture}
                        className="h-full aspect-square"
                      />
                      <div>
                        <p className="font-bold">@{data?.userData?.userName}</p>
                        <div className="flex gap-1 items-center">
                          <Stack spacing={1}>
                            <Rating
                              name="half-rating"
                              defaultValue={data?.userData?.ranting}
                              precision={0.5}
                              readOnly
                              style={{
                                color: "#0DBC73",
                                fontSize: "1.2em",
                              }}
                            />
                          </Stack>
                          <p className="opacity-50">
                            {data?.userData?.totalRantings}
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
                        <p className="font-semibold">
                          {location || "Cargando..."}
                        </p>
                      </div>
                    </div>
                    <div className="flex w-full justify-between">
                      <p className="opacity-50">{t("mainLayout.offers")}</p>
                      <p className="font-semibold">{data?.totalOffers}</p>
                    </div>
                    <div className="flex w-full justify-between">
                      <p className="opacity-50">{t("mainLayout.online")}</p>
                      <p className={`font-semibold`}>
                        {getOnlineStatus(data?.last_online) || "Cargando..."}
                      </p>
                    </div>
                  </div>
                </div>
                {/** Swap Actions */}
                <div
                  className={`${
                    themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#121212]"
                  } md:bg-transparent col-span-12 flex flex-col items-center gap-2 sticky -bottom-2 md:bottom-auto md:relative px-2 py-4 md:py-0 md:px-0 md:bg-none`}
                >
                  <div className="flex items-center gap-2 w-full">
                    {/** Swap Button */}
                    <div
                      className={`${
                        themeMode === "light" ? "text-white" : "text-black"
                      } px-5 py-3 w-full rounded-xl flex items-center justify-center gap-2 font-bold cursor-pointer bg-[#0DBC73]`}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      onClick={() => {
                        if (data?.offerSent) {
                          console.log("Oferta ya enviada");
                        } else {
                          openModal(<SwapOfferSteps />, { token: data?.token });
                        }
                      }}
                    >
                      <PiSwapFill size={18} />
                      <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                        {data?.offerSent
                          ? isHovering
                            ? t("mainLayout.cancel_offer")
                            : t("mainLayout.offer_sent")
                          : t("mainLayout.offer_swap")}
                      </p>
                    </div>
                    {/** Like Button */}
                    <LikeBtn
                      liked={data?.liked}
                      onClick={() => {
                        console.log("Hola");
                      }}
                    />
                  </div>
                  {/** Message Button */}
                  <div
                    className={`${
                      themeMode === "light"
                        ? "bg-transparent text-black hover:bg-[#E2E2E2]"
                        : "bg-transparent text-white hover:bg-[#323332]"
                    } px-5 py-3 w-full rounded-xl flex items-center justify-center gap-2 font-bold cursor-pointer`}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                    onClick={() => {
                      navigate(`/messages/${data?.chatToken}`);
                    }}
                  >
                    <p className="whitespace-nowrap overflow-hidden text-ellipsis">
                      {t("mainLayout.send_message")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Recommended Garments */}
        <div className="mt-4">
          <SuggestedItems />
        </div>
      </div>
    </>
  );
};
