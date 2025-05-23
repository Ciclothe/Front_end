import { useTheme } from "@/context/ThemeContext";
import { UserHeader } from "@/components/Common/Post/UserHeader";
import { PostImageCarousel } from "@/components/Common/Post/PostImageCarousel";
import { PostInfoOverlay } from "@/components/Common/Post/PostInfoOverlay";
import { PostOffers } from "@/components/Common/Post/PostOffers";
import { PostActions } from "@/components/Common/Post/PostActions";
import { useLocation, useNavigate } from "react-router-dom";

// TODO: Remove this mock data and fetch it from the API
const postsFeedData = [
  {
    id: 1,
    postType: "swap",
    token: "X9WL32TVKMZPR8A6UFQYC7NJE",
    userData: {
      userId: 1,
      profilePicture:
        "https://i.pinimg.com/736x/6a/3b/01/6a3b01b467a751122986da4cb9764033.jpg",
      userName: "poseidon",
    },
    postData: {
      id: 1,
      distance: "2 km",
      createdAt: "2025-04-05T13:00:00Z",
      condition: "used",
      title: "Chaqueta piel vintage",
      color: "Brown",
      size: "M",
      brand: "Vintage Dressing",
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
    },
    totalOffers: 4,
    liked: true,
    offerSent: false,
    offers: [
      {
        id: 1,
        userData: {
          userId: 2,
          profilePicture:
            "https://i.pinimg.com/736x/08/2b/3b/082b3bb51cbf0722329080827f8e4a48.jpg",
        },
      },
      {
        id: 2,
        userData: {
          userId: 45,
          profilePicture:
            "https://i.pinimg.com/736x/55/fa/1f/55fa1f9583becaa51044fa7e0d768fe4.jpg",
        },
      },
    ],
  },
  {
    id: 2,
    postType: "event",
    token: "a9X3vB1cD4pE5sQ7mN8wZ6yT2kR0uLf",
    eventTitle: "Retro Revival Night: Fashion & Music",
    userData: {
      userId: 1,
      profilePicture:
        "https://i.pinimg.com/736x/a3/c0/40/a3c040ee9e0cb3a06684a603c1a06a9c.jpg",
      userName: "grifoMmm",
    },
    postData: {
      id: 1,
      createdAt: "2025-04-05T13:00:00Z",
    },
    imagesOrientation: "square",
    newPostsData: [
      {
        id: 1,
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
        id: 2,
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
          url: "https://images1.vinted.net/t/03_0032d_HcXDedusssDNhGWWVyBdfQrb/f800/1743975491.jpeg?s=b1a079a023a1cc779d92179f3c251e99964714de",
        },
      },
      {
        id: 3,
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
        id: 4,
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
  {
    id: 3,
    postType: "swap",
    token: "ZXZlbnQtNDU2",
    userData: {
      userId: 1,
      profilePicture:
        "https://i.pinimg.com/736x/15/4c/c1/154cc1b2916a59a0a2e2f2c7983329b8.jpg",
      userName: "grifoMmm",
    },
    postData: {
      id: 2,
      distance: "2 km",
      createdAt: "2025-04-05T13:00:00Z",
      condition: "new",
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
    totalOffers: 0,
    liked: false,
    offerSent: false,
    offers: [],
  },
];

export const HomePage = () => {
  const { themeMode } = useTheme();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const currentType = pathSegments[1];
  const navigate = useNavigate();

  const selectedTypeFromURL =
    currentType === "events"
      ? "event"
      : currentType === "swaps"
      ? "swap"
      : "all";

  const filteredPosts =
    selectedTypeFromURL === "all"
      ? postsFeedData
      : postsFeedData.filter((post) => post.postType === selectedTypeFromURL);

  return (
    <div className="md:px-4 lg:px-10 flex flex-col items-center overflow-y-auto">
      {filteredPosts.map((post) => {
        const cardClassName = `${
          themeMode === "light"
            ? "md:bg-white md:hover:bg-[#EDEDED] text-black"
            : "md:bg-[#222423] text-white md:hover:bg-[#323332]"
        } py-5 border-b border-black/5 md:border-none sm:p-5 md:mb-5 md:rounded-3xl cursor-pointer w-full md:w-[90%] lg:w-[65%]`;

        return (
          <div
            key={post.id}
            className={cardClassName}
            onClick={() => {
              if (post.postType === "swap") {
                navigate(`/swapDetails/${post.token}`);
              } else if (post.postType === "event") {
                navigate(`/eventDetails/${post.token}`);
              }
            }}
          >
            <div className="relative flex flex-col gap-2">
              {post?.postData && (
                <UserHeader
                  postData={{
                    createdAt: post?.postData?.createdAt,
                    distance: post?.postData?.distance,
                    eventTitle: post?.eventTitle,
                  }}
                  userData={post?.userData}
                  postType={post?.postType}
                />
              )}
              <PostImageCarousel post={post} />
              {post?.postType === "swap" && (
                <PostInfoOverlay
                  condition={post?.postData?.condition}
                  title={post?.postData?.title}
                  color={post?.postData?.color}
                  size={post?.postData?.size}
                  brand={post?.postData?.brand}
                />
              )}
            </div>
            {post?.postType === "swap" && (
              <div className="mt-4 flex items-center w-full justify-between gap-2">
                <div className="truncate">
                  <PostOffers
                    offers={post?.offers}
                    totalOffers={post?.totalOffers}
                  />
                </div>
                <PostActions
                  liked={post.liked}
                  token={post.token}
                  offerSent={post.offerSent}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
