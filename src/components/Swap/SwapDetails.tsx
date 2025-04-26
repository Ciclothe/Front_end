import { UserHeader } from "@/components/Common/Post/UserHeader";
import {
  mdiArrowLeft,
  mdiChevronRight,
  mdiClose,
  mdiDotsHorizontal,
} from "@mdi/js";
import { Icon } from "@mdi/react";
import { PostImageCarousel } from "@/components/Common/Post/PostImageCarousel";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Navigate, useLocation } from "react-router-dom";
import { useModal } from "@/context/ModalContext";
import { OfferBtn } from "@/components/Common/OfferBtn";
import { LikeBtn } from "@/components/Common/LikeBtn";
import { useTheme } from "@/context/ThemeContext";
import { getCityAndCountry } from "@/components/Utils/format";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

// TODO: Remove this test data and fetch from API
const swapPostTestData = [
  {
    id: 1,
    postType: "swap",
    token: "cG9zdC0xMjM=",
    userData: {
      id: 1,
      profilePicture:
        "https://i.pinimg.com/736x/15/4c/c1/154cc1b2916a59a0a2e2f2c7983329b8.jpg",
      username: "grifoMmm",
      ranting: 4.5,
      totalRantings: 25,
    },
    postData: {
      id: 2,
      distance: "2 km",
      location: { lat: 39.4676153, lng: -0.4039672 },
      createdAt: "2025-04-05T13:00:00Z",
      condition: "used",
      title: "Leather Bomber Jacket Made in Italy🇮🇹",
      color: "Brown",
      colorCode: "#A48C47",
      size: "M",
      fabric: "100% Leather",
      brand: "Levi's",
      description:
        "Chaqueta de piel auténtica muy buena no tienen ningún desperfecto y es muy buena calidad además es de una marca muy buena y es de un color marrón muy bonito.",
      imagesOrientation: "vertical",
      images: [
        {
          id: 1,
          url: "https://i.pinimg.com/736x/5d/f0/f0/5df0f01d2d7d2e8a6124cdb955c8eb7b.jpg",
        },
        {
          id: 2,
          url: "https://i.pinimg.com/736x/9e/2c/47/9e2c47ec7708c2e5f60f5f09f44b1191.jpg",
        },
        {
          id: 3,
          url: "https://i.pinimg.com/736x/e7/12/f5/e712f596d4ebb1cef1b6e757f271ec47.jpg",
        },
        {
          id: 4,
          url: "https://i.pinimg.com/736x/5b/f5/21/5bf5218ecd93acb739b5188f8fa31be6.jpg",
        },
        {
          id: 1,
          url: "https://i.pinimg.com/736x/5d/f0/f0/5df0f01d2d7d2e8a6124cdb955c8eb7b.jpg",
        },
        {
          id: 2,
          url: "https://i.pinimg.com/736x/9e/2c/47/9e2c47ec7708c2e5f60f5f09f44b1191.jpg",
        },
      ],
    },
    totalOffers: 4,
    liked: false,
    offerSent: false,
  },
  {
    id: 2,
    postType: "swap",
    token: "cf62aa0fMjM=",
    userData: {
      id: 2,
      profilePicture:
        "https://i.pinimg.com/736x/3f/4f/e9/3f4fe92639ea9d5980ef1760212e7b86.jpg",
      username: "lielcita1230",
      ranting: 4.5,
      totalRantings: 20,
    },
    postData: {
      id: 2,
      distance: "5 km",
      location: { lat: 39.4676153, lng: -0.4039672 },
      createdAt: "2025-04-20T13:00:00Z",
      condition: "as_new",
      title: "Puma vintage track jacket",
      color: "purple",
      colorCode: "#993BF8",
      size: "L",
      fabric: "100% Leather",
      brand: "Puma",
      description:
        "Sudadera puma vintage Artículo en perfecto estado salvo una manchita que tiene 🔝",
      imagesOrientation: "vertical",
      images: [
        {
          id: 1,
          url: "https://images1.vinted.net/t/04_010c4_BLrMjWxUesyfc53uXaDRVQXv/f800/1743443816.jpeg?s=526862abc3d0d7c9015fc2ab35e21d1063090372",
        },
        {
          id: 2,
          url: "https://images1.vinted.net/t/02_00314_eGXMszKxuYWKCdVtu1AS4H4w/f800/1743443816.jpeg?s=c8f670a12fb13ef62847dc60113e3fb61546e874",
        },

        {
          id: 3,
          url: "https://images1.vinted.net/t/04_02428_B9gnmRRacjzizuvvvDLbcUU3/f800/1743443816.jpeg?s=9d29e8cc51d1ad4843aab144b29e68412dbfd917",
        },
        {
          id: 4,
          url: "https://images1.vinted.net/t/02_0177c_cY3hJJWDk5YUTQ5PckC9VDpD/f800/1743443816.jpeg?s=71f9dc50b16b1cf77497c2b462a4e19e6f329929",
        },
        {
          id: 5,
          url: "https://images1.vinted.net/t/04_025e6_Xnb1qjHxfRLv2TwZLETuECYA/f800/1743443816.jpeg?s=3f44d4b2c8f0ff6ddd8a2e98f78795b054ce3b1d",
        },
      ],
    },
    totalOffers: 7,
    liked: false,
    offerSent: false,
  },
  {
    id: 3,
    postType: "swap",
    token: "4158249710d=",
    userData: {
      id: 2,
      profilePicture:
        "https://i.pinimg.com/736x/3f/4f/e9/3f4fe92639ea9d5980ef1760212e7b86.jpg",
      username: "lielcita1230",
      ranting: 4.5,
      totalRantings: 20,
    },
    postData: {
      id: 2,
      distance: "5 km",
      location: { lat: 39.4676153, lng: -0.4039672 },
      createdAt: "2025-04-20T13:00:00Z",
      condition: "as_new",
      title: "Jordan Hoodie L",
      color: "Black",
      colorCode: "#000000",
      size: "M",
      fabric: "100% Cotton",
      brand: "Jordan",
      description:
        "Felpa Jordan nera. Felpa senza cappuccio nera della jordan perfetta per occasioni abbastanza eleganti s per uno stile streetwear e y2k. Utilizzabile anche a fare sport 🏀 Prezzo TRATTABILE",
      imagesOrientation: "vertical",
      images: [
        {
          id: 1,
          url: "https://images1.vinted.net/t/02_02196_WBeUtv3tRHrhaqDqUyTrBZ2W/f800/1744230137.jpeg?s=454abe26c5eefba50132717c3b0444b6fbf7e28c",
        },
        {
          id: 2,
          url: "https://images1.vinted.net/t/04_00084_TNA9LZ6pkk9bVgFXX9zfGNeE/f800/1744230137.jpeg?s=d7bac0f9dc79b8ee933751ca494a194d67abbcf1",
        },

        {
          id: 3,
          url: "https://images1.vinted.net/t/03_022fd_XqTbXyzCQyJaKH32MZbZjdyq/f800/1744230137.jpeg?s=f561e61b9ac5aa24f34180dfec1f8604ca3738fe",
        },
        {
          id: 4,
          url: "https://images1.vinted.net/t/03_02579_DvSZNAKfNwA4X1b7gZEqAkpL/f800/1744230137.jpeg?s=3c673951c81e364907bd68b3841eddb53e5a2099",
        },
      ],
    },
    totalOffers: 4,
    liked: false,
    offerSent: false,
  },
  {
    id: 4,
    postType: "swap",
    token: "sa4gY49710d=",
    userData: {
      id: 2,
      profilePicture:
        "https://i.pinimg.com/736x/3f/4f/e9/3f4fe92639ea9d5980ef1760212e7b86.jpg",
      username: "lielcita1230",
      ranting: 4.5,
      totalRantings: 20,
    },
    postData: {
      id: 2,
      distance: "5 km",
      location: { lat: 39.4676153, lng: -0.4039672 },
      createdAt: "2025-01-20T13:00:00Z",
      condition: "as_new",
      title: "Tennis nike",
      color: "White",
      colorCode: "#FFFFFF",
      size: "38",
      fabric: "100% Cotton",
      brand: "Nike",
      description: "Porte quelques fois",
      imagesOrientation: "vertical",
      images: [
        {
          id: 1,
          url: "https://images1.vinted.net/t/04_00351_rSfJPwof4gycFPwsTq8Vav8f/f800/1745137478.jpeg?s=d3025eb459ae032d453690b70e829d02c74cc061",
        },
        {
          id: 2,
          url: "https://images1.vinted.net/t/02_01f8c_TwpH3vnCe4bAi5JKLhEqhWRv/f800/1745137478.jpeg?s=8d08245c2b9df023f95d692d6d7e0aa46a072daa",
        },

        {
          id: 3,
          url: "https://images1.vinted.net/t/02_01f8c_TwpH3vnCe4bAi5JKLhEqhWRv/f800/1745137478.jpeg?s=8d08245c2b9df023f95d692d6d7e0aa46a072daa",
        },
        {
          id: 4,
          url: "https://images1.vinted.net/t/04_007fe_qA6SD5Cj6c5VPHhDMNgVJwjQ/f800/1745137478.jpeg?s=09dc6a6b97dd12d0c8abe4a706af36e3f243cab5",
        },
        {
          id: 5,
          url: "https://images1.vinted.net/t/04_0268f_vTthrnyz5h8beWHCBrnemuRo/f800/1745137478.jpeg?s=3c8c76dd3f81cf0eaca73e570d1195830b2c0281",
        },
      ],
    },
    totalOffers: 4,
    liked: false,
    offerSent: false,
  },
];

export const SwapDetails = ({ token }: { token: string }) => {
  const { closeModal, openModal, goBack } = useModal();
  const { themeMode } = useTheme();
  const { i18n, t } = useTranslation();

  const data = swapPostTestData.find((e) => e.token === token);
  const [location, setLocation] = useState<string | null>(null);
  const url = useLocation();

  const isOfferReceived = url.pathname.includes("/offerReceived/");
  const isSummary = url.pathname.includes("/summary/");

  useEffect(() => {
    if (data) {
      const fetchLocation = async () => {
        const cityAndCountry = await getCityAndCountry(
          data.postData.location.lat,
          data.postData.location.lng,
          i18n.language
        );
        setLocation(cityAndCountry);
      };

      fetchLocation();
    }
  }, [data, i18n.language]);

  if (!data) {
    return <Navigate to="/404" />;
  }

  return (
    <>
      {/* //! HEADER */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 truncate text-ellipsis">
          <div
            className={`${
              themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#222423]"
            } p-1 rounded-full cursor-pointer`}
            onClick={() => {
              const action = isOfferReceived ? goBack : closeModal;
              action();
            }}
          >
            <Icon
              path={isOfferReceived || isSummary ? mdiArrowLeft : mdiClose}
              size={1}
            />
          </div>
          <UserHeader
            postData={data?.postData}
            userData={data?.userData}
            postType={data?.postType}
            isAbsolute={false}
          />
        </div>
        <div className="cursor-pointer">
          <Icon path={mdiDotsHorizontal} size={1} />
        </div>
      </div>

      {/* //! CONTENT */}
      <div className={`grid grid-cols-12 gap-4`}>
        {/** Post Image */}
        <div
          className={`${
            data?.postType === "event"
              ? "col-span-12"
              : "col-span-12 md:col-span-6"
          }`}
        >
          <div className="flex flex-col gap-4">
            <PostImageCarousel post={data} widthPercentage="100%" />

            <div className="flex gap-2">
              {data?.postData?.images
                ?.slice(0, 2)
                .map((image: { id: number; url: string }, index: number) => (
                  <img
                    key={index}
                    src={image.url}
                    alt={`Post Image ${index + 1}`}
                    className="w-[20%] aspect-[1/1] object-cover rounded-lg"
                  />
                ))}
              {data?.postData?.images?.length > 2 && (
                <div
                  className={`${
                    themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#222423]"
                  } w-[20%] aspect-[1/1] flex items-center justify-center rounded-lg text-center`}
                >
                  <p className="text-sm font-bold">
                    +{data?.postData?.images.length - 2} <br />{" "}
                    {t("mainLayout.more")}
                  </p>
                </div>
              )}
            </div>
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
                themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#222423]"
              } ${
                data?.postType === "event"
                  ? "col-span-12 md:col-span-6 justify-center"
                  : "col-span-12"
              } w-full rounded-lg p-4 text-start flex flex-col gap-2 overflow-y-auto md:max-h-[30vh]`}
            >
              <p className="text-[1.8em] font-bold leading-[1.2]">
                {data?.postData?.title}
              </p>
              <p>{data?.postData?.description}</p>
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
                themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#222423]"
              } ${
                data?.postType === "event"
                  ? "col-span-12 md:col-span-6 p-4"
                  : "col-span-12"
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
                    src={data?.userData?.profilePicture}
                    className="h-full aspect-square"
                  />
                  <div>
                    <p className="font-bold">@{data?.userData?.username}</p>
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
                    <p className="font-semibold">{location || "Cargando..."}</p>
                  </div>
                </div>
                <div className="flex w-full justify-between">
                  <p className="opacity-50">{t("mainLayout.offers")}</p>
                  <p className="font-semibold">{data?.totalOffers}</p>
                </div>
              </div>
            </div>
            {/** Swap Actions */}
            {!isOfferReceived && (
              <div
                className={`${
                  themeMode === "light" ? "bg-white" : "bg-[#121212]"
                } md:bg-transparent col-span-12 flex items-center gap-2 sticky -bottom-2 md:bottom-auto md:relative px-2 py-4 md:py-0 md:px-0 md:bg-none`}
              >
                {/** Swap Button */}
                <OfferBtn
                  offerSent={data?.offerSent}
                  onClick={() => {
                    if (data?.offerSent) {
                      console.log("Hola Chica");
                    } else {
                      openModal(token, "swap", "offer");
                    }
                  }}
                />
                {/** Like Button */}
                <LikeBtn
                  liked={data?.liked}
                  onClick={() => {
                    console.log("Hola");
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
