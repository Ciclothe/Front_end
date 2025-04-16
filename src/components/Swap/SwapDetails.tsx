import { UserHeader } from "@/components/Common/Post/UserHeader";
import { mdiArrowLeft, mdiChevronRight, mdiDotsHorizontal } from "@mdi/js";
import { Icon } from "@mdi/react";
import { PostImageCarousel } from "@/components/Common/Post/PostImageCarousel";
import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Navigate } from "react-router-dom";
import { useModal } from "@/context/ModalContext";
import { OfferBtn } from "@/components/Common/OfferBtn";
import { SwapOfferSteps } from "./SwapOfferSteps";
import { LikeBtn } from "@/components/Common/LikeBtn";
import { useTheme } from "@/context/ThemeContext";

type SwapDetailsProps = {
  postId: number;
};

// TODO: Remove this test data and fetch from API
const swapPostTestData = [
  {
    id: 1,
    postType: "swap",
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
      condition: "Used",
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
    offerSent: true,
  },
];

export const SwapDetails = ({ postId }: SwapDetailsProps) => {
  const { closeModal, openModal } = useModal();
  const { themeMode } = useTheme();

  const data = swapPostTestData.find((e) => e.id === postId);

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
              themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#2A2B2A]"
            } p-1 rounded-full cursor-pointer`}
            onClick={closeModal}
          >
            <Icon path={mdiArrowLeft} size={1} />
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
                    themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#2A2B2A]"
                  } w-[20%] aspect-[1/1] flex items-center justify-center rounded-lg text-center`}
                >
                  <p className="text-sm font-bold">
                    +{data?.postData?.images.length - 2} <br /> more
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
                themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#2A2B2A]"
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
                  <p className="opacity-50">Size</p>
                  <p className="font-semibold">{data?.postData?.size}</p>
                </div>
                <div className="flex w-full justify-between">
                  <p className="opacity-50">Condition</p>
                  <p className="font-semibold">{data?.postData?.condition}</p>
                </div>
                <div className="flex w-full justify-between">
                  <p className="opacity-50">Brand</p>
                  <p className="font-semibold">{data?.postData?.brand}</p>
                </div>
                <div className="flex w-full justify-between">
                  <p className="opacity-50">Color</p>
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
                  <p className="opacity-50">Fabric</p>
                  <p className="font-semibold">{data?.postData?.fabric}</p>
                </div>
              </div>
            </div>
            {/* User Info */}
            <div
              className={`${
                themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#2A2B2A]"
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
                  <p className="opacity-50">Location</p>
                  <p className="font-semibold">
                    {data?.postData?.location?.lat}
                  </p>
                </div>
                <div className="flex w-full justify-between">
                  <p className="opacity-50">Offers</p>
                  <p className="font-semibold">{data?.totalOffers}</p>
                </div>
              </div>
            </div>
            {/** Swap Actions */}
            <div className="col-span-12 flex items-center gap-2 sticky -bottom-2 md:bottom-auto md:relative px-2 py-4 md:py-0 md:px-0 md:bg-none">
              {/** Swap Button */}
              <OfferBtn
                offerSent={data?.offerSent}
                onClick={() => {
                  if (data?.offerSent) {
                    console.log("Hola Chica");
                  } else {
                    openModal(<SwapOfferSteps postId={data?.postData?.id} />);
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
          </div>
        </div>
      </div>
    </>
  );
};
