import { useTheme } from "@/context/ThemeContext";

import { UserHeader } from "@/components/Common/Post/UserHeader";
import { PostImageCarousel } from "@/components/Common/Post/PostImageCarousel";
import { PostInfoOverlay } from "@/components/Common/Post/PostInfoOverlay";
import { PostOffers } from "@/components/Common/Post/PostOffers";
import { PostActions } from "@/components/Common/Post/PostActions";

const postsFeedData = [
  {
    id: 1,
    postType: "swap",
    userData: {
      id: 1,
      profilePicture:
        "https://i.pinimg.com/736x/15/4c/c1/154cc1b2916a59a0a2e2f2c7983329b8.jpg",
      username: "grifoMmm",
    },
    posData: {
      id: 1,
      distance: "2 km",
      createdAt: "2025-04-05T13:00:00Z",
      condition: "Used",
      title: "Chaqueta piel vintage",
      color: "Brown",
      size: "M",
      brand: "Vintage Dressing",
      imagesOrientation: "vertical",
      images: [
        {
          id: 1,
          url: "https://images1.vinted.net/t/01_021d5_SkeTiZUZDMRpdKoVXgmBNx3x/f800/1743677672.jpeg?s=c95d1909f0b8ae0de4e724cb7b14ceb6c6bcf2f5",
        },
        {
          id: 2,
          url: "https://images1.vinted.net/t/03_00fd5_wsJvSkW8xY7oczocZjdycsbc/f800/1743677672.jpeg?s=dc198e138d51d9c09c5884a5d276869264debd1b",
        },
      ],
    },
    totalOffers: 4,
    liked: true,
    offerSended: false,
    offers: [
      {
        id: 1,
        userData: {
          id: 2,
          avatar:
            "https://i.pinimg.com/736x/08/2b/3b/082b3bb51cbf0722329080827f8e4a48.jpg",
        },
      },
      {
        id: 2,
        userData: {
          id: 45,
          avatar:
            "https://i.pinimg.com/736x/55/fa/1f/55fa1f9583becaa51044fa7e0d768fe4.jpg",
        },
      },
    ],
  },
  {
    id: 2,
    postType: "swap",
    userData: {
      id: 1,
      profilePicture:
        "https://i.pinimg.com/736x/15/4c/c1/154cc1b2916a59a0a2e2f2c7983329b8.jpg",
      username: "grifoMmm",
    },
    posData: {
      id: 2,
      distance: "2 km",
      createdAt: "2025-04-05T13:00:00Z",
      condition: "Used",
      title: "Chaqueta piel vintage",
      color: "Brown",
      size: "M",
      brand: "Vintage Dressing",
      imagesOrientation: "horizontal",
      images: [
        {
          id: 1,
          url: "https://images1.vinted.net/t/01_0220b_wHL4hpigNZe4wNMwHsnBrUnV/f800/1743759228.jpeg?s=d7fbc8137ed6adc25cda0a77870acbdec53150d9",
        },
        {
          id: 2,
          url: "https://images1.vinted.net/t/02_024e0_MEdUCweKnoC167r7W24EwRFm/f800/1743759228.jpeg?s=fa5b233debd259a9420adb658a944337989bf6f4",
        },
        {
          id: 3,
          url: "https://images1.vinted.net/t/04_01867_3aKubvJ3CheimvbarCEHHYQp/f800/1743759228.jpeg?s=1ebac5d47a9da90e119c56fbf076e02fad526635",
        },
        {
          id: 4,
          url: "https://images1.vinted.net/t/03_00402_r4TGUsjLj4jLLtdvrxfuS76i/f800/1743759228.jpeg?s=d2e71065a1f26741c0c51603ddcf57e3ee9ca08e",
        },
        {
          id: 5,
          url: "https://images1.vinted.net/t/04_00046_1XirRZcpaMvR56iq87vGYUJk/f800/1743759228.jpeg?s=2de924e6bc831d6dd8727f41997fbf5e6d55d57f",
        },
      ],
    },
    totalOffers: 4,
    liked: false,
    offerSended: false,
    offers: [
      {
        id: 1,
        userData: {
          id: 2,
          avatar:
            "https://i.pinimg.com/736x/08/2b/3b/082b3bb51cbf0722329080827f8e4a48.jpg",
        },
      },
      {
        id: 2,
        userData: {
          id: 45,
          avatar:
            "https://i.pinimg.com/736x/55/fa/1f/55fa1f9583becaa51044fa7e0d768fe4.jpg",
        },
      },
    ],
  },
];

export const HomePage = () => {
  const { themeMode } = useTheme();

  return (
    <div className="md:px-4 lg:px-10 py-5 md:pt-0">
      {postsFeedData.map((post) => (
        <div
          key={post.id}
          className={`${
            themeMode === "light"
              ? "md:bg-white text-black"
              : "md:bg-[#222423] text-white"
          } pb-10 sm:p-5 md:mb-5 rounded-2xl`}
        >
          <UserHeader
            userData={post.userData}
            posData={post.posData}
            isMobile
          />
          <div className="relative">
            <PostImageCarousel
              images={post.posData.images}
              orientation={post.posData.imagesOrientation}
            />
            <UserHeader
              userData={post.userData}
              posData={post.posData}
              isMobile={false}
            />
            <PostInfoOverlay {...post.posData} />
          </div>
          <div className="mt-4 flex items-center w-full justify-between gap-2">
            <div className="truncate">
              <PostOffers offers={post.offers} totalOffers={post.totalOffers} />
            </div>
            <PostActions liked={post.liked} offerSended={post.offerSended} />
          </div>
        </div>
      ))}
    </div>
  );
};
