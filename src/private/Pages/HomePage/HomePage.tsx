import { useTheme } from "@/context/ThemeContext";
import { useCategoryTabs } from "@/context/CategoryTabsContext";
import { UserHeader } from "@/components/Common/Post/UserHeader";
import { PostImageCarousel } from "@/components/Common/Post/PostImageCarousel";
import { PostInfoOverlay } from "@/components/Common/Post/PostInfoOverlay";
import { PostOffers } from "@/components/Common/Post/PostOffers";
import { PostActions } from "@/components/Common/Post/PostActions";
import { useModal } from "@/context/ModalContext";
import { useEffect } from "react";
import { mdiCards, mdiHandshake } from "@mdi/js";
import { PiSwapFill } from "react-icons/pi";

// TODO: Remove this mock data and fetch it from the API
const postsFeedData = [
  {
    id: 1,
    postType: "swap",
    token: "cG9zdC0xMjM=",
    userData: {
      id: 1,
      profilePicture:
        "https://i.pinimg.com/736x/15/4c/c1/154cc1b2916a59a0a2e2f2c7983329b8.jpg",
      username: "grifoMmm",
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
    offerSent: false,
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
    postType: "event",
    token: "c3dhcC0yMzQ=",
    eventTitle: "Retro Revival Night: Fashion & Music",
    userData: {
      id: 1,
      profilePicture:
        "https://i.pinimg.com/736x/a3/c0/40/a3c040ee9e0cb3a06684a603c1a06a9c.jpg",
      username: "grifoMmm",
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
      id: 1,
      profilePicture:
        "https://i.pinimg.com/736x/15/4c/c1/154cc1b2916a59a0a2e2f2c7983329b8.jpg",
      username: "grifoMmm",
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

type TabType =
  | {
      icon: string;
      name: string;
      type: string;
      href: string;
      selected: boolean;
      isComponent?: false;
    }
  | {
      icon: JSX.Element;
      name: string;
      type: string;
      href: string;
      selected: boolean;
      isComponent: true;
    };

const categoryTabs: TabType[] = [
  {
    icon: mdiCards,
    name: "all",
    type: "all",
    href: "/",
    selected: true,
  },
  {
    icon: <PiSwapFill size={18} />,
    name: "swaps",
    type: "swap",
    href: "/swaps",
    selected: false,
    isComponent: true,
  },
  {
    icon: mdiHandshake,
    name: "events",
    type: "event",
    href: "/events",
    selected: false,
  },
  // {
  //   icon: mdiAccountSupervisor,
  //   name: "communities",
  //   href: "/communities",
  //   selected: false,
  // },
];

export const HomePage = () => {
  const { themeMode } = useTheme();
  const { openModal } = useModal();
  const { setShowTabs, setTabs } = useCategoryTabs();
  const { tabs } = useCategoryTabs();
  const selectedTab = tabs.find((tab) => tab.selected);
  const selectedType = selectedTab?.type;

  const filteredPosts =
    selectedType === "all"
      ? postsFeedData
      : postsFeedData.filter((post) => post.postType === selectedType);

  useEffect(() => {
    setShowTabs(true);
    setTabs(categoryTabs);
  }, [setShowTabs, setTabs]);

  const handleOpenDetails = (post: {
    postType: string;
    postId: number;
    token: string;
  }) => {
    if (post.postType === "swap") {
      openModal(post.token, post.postType, "details");
    } else {
      openModal(post.token, post.postType, "details");
    }
  };

  return (
    <div className="md:px-4 lg:px-10">
      {filteredPosts.map((post) => {
        const cardClassName = `${
          themeMode === "light"
            ? "md:bg-white md:hover:bg-[#EDEDED] text-black"
            : "md:bg-[#222423] text-white md:hover:bg-[#323332]"
        } py-5 border-b border-black/5 md:border-none sm:p-5 md:mb-5 md:rounded-2xl cursor-pointer`;

        return (
          <div
            key={post.id}
            className={cardClassName}
            onClick={() =>
              handleOpenDetails({
                postId: post.id,
                postType: post.postType,
                token: post.token,
              })
            }
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
                  postType={post.postType}
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
