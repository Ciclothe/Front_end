import { useAuth } from "@/context/AuthContext";
import { useParams, Navigate } from "react-router-dom";
import { useState } from "react";
import { CreatedEventsView } from "@/private/Pages/ProfilePage/Components/TabsContent/CreatedEventsView";
import { JoinedEventsView } from "@/private/Pages/ProfilePage/Components/TabsContent/JoinedEventsView";
import { SwapsView } from "@/private/Pages/ProfilePage/Components/TabsContent/SwapsView";
import { ClosetView } from "@/private/Pages/ProfilePage/Components/TabsContent/ClosetView";
import { WishlistView } from "@/private/Pages/ProfilePage/Components/TabsContent/WishlistView";
import { CoverPhoto } from "./Components/CoverPhoto";
import { ProfilePhoto } from "./Components/ProfilePhoto";
import { UserInfo } from "./Components/UserInfo";
import { ActionButtoms } from "./Components/ActionButtoms";
import { Tabs } from "./Components/Tabs";

const userData = [
  {
    userName: "aphrodite",
    portraitPicture:
      "https://i.pinimg.com/736x/a0/9c/ae/a09cae74cdf553d02e245d8589bec426.jpg",
    profilePicture:
      "https://i.pinimg.com/736x/1f/b8/27/1fb827f37413d778e56aa404692a3b30.jpg",
    bio: "Hype hunter 🔥. Always on the lookout for exclusive pieces and limited editions 🧢👟.",
    location: { lat: 39.4699, lng: -0.3763 },
    interests: [
      "Streetwear",
      "Summer",
      "Trap star",
      "Street style",
      "Skate",
      "Yeezy",
      "Adidas",
      "Sneakers",
    ],
    followers: {
      totalFollowers: 120,
      lastFollowers: [
        {
          profilePicture:
            "https://i.pinimg.com/736x/de/20/46/de2046a1bc5f789bc91ee57bcb5091c9.jpg",
        },
        {
          profilePicture:
            "https://i.pinimg.com/736x/6c/6a/eb/6c6aebcaf21905d3bd181f552916b7ad.jpg",
        },
      ],
    },
    following: {
      totalFollowing: 20,
      lastFollowing: [
        {
          profilePicture:
            "https://i.pinimg.com/736x/28/ed/4b/28ed4bfe4248b8a635d6222ccf85ec44.jpg",
        },
        {
          profilePicture:
            "https://i.pinimg.com/736x/f4/63/cd/f463cd45c3d56cc96244030c32951b04.jpg",
        },
      ],
    },
  },
  {
    userName: "poseidon",
    profilePicture:
      "https://i.pinimg.com/736x/6a/3b/01/6a3b01b467a751122986da4cb9764033.jpg",
    bio: "Ocean vibes 🌊 | Vintage surfboards collector 🏄‍♂️ | Let’s trade gear and good energy!",
    location: { lat: 34.0522, lng: -118.2437 },
    interests: [
      "Surf",
      "Vintage",
      "Beachwear",
      "Retro style",
      "California",
      "Board sports",
    ],
    followers: {
      totalFollowers: 85,
      lastFollowers: [
        {
          profilePicture:
            "https://i.pinimg.com/736x/d0/a9/0e/d0a90ec7210c6e06e478ab67e2d891a3.jpg",
        },
        {
          profilePicture:
            "https://i.pinimg.com/736x/8d/6a/1f/8d6a1f70aa13c4fe5ffb3f79e819c7e5.jpg",
        },
      ],
    },
    following: {
      totalFollowing: 14,
      lastFollowing: [
        {
          profilePicture:
            "https://i.pinimg.com/736x/9d/71/4d/9d714df98cc5b5d45ef0ec4d59cc3dba.jpg",
        },
        {
          profilePicture:
            "https://i.pinimg.com/736x/fe/bc/d5/febcd57d14adc4e818b99d6b692ea574.jpg",
        },
      ],
    },
  },
];

export const ProfileView = () => {
  const { currentUser } = useAuth();
  const { userName } = useParams<{ userName: string }>();
  const [tabSelected, setTabSelected] = useState("created");

  const user = userData.find((u) => u.userName === userName);

  if (!user) {
    return <Navigate to="/404" />;
  }

  const isUserData = currentUser?.userName === user.userName;

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="flex flex-col items-center gap-4 w-full md:w-[85%] mx-auto">
        {/* Imagen de fondo */}
        <CoverPhoto
          coverPhoto={
            user?.portraitPicture ? user.portraitPicture : user.profilePicture
          }
          userName={user?.userName}
          isCoverPhoto={user?.portraitPicture ? true : false}
        />

        {/* Foto de perfil */}
        <ProfilePhoto profilePicture={user?.profilePicture} />

        {/* Nombre de usuario y biografía */}
        <UserInfo user={user} />

        {/* Action Buttoms */}
        <ActionButtoms isUserData={isUserData} />

        {/* Tabs */}
        <Tabs setSelectedTab={setTabSelected} />

        {/* Tab content */}
        <div className="w-full px-4">
          {tabSelected === "created" && <CreatedEventsView />}
          {tabSelected === "joined" && <JoinedEventsView />}
          {tabSelected === "swaps" && <SwapsView />}
          {tabSelected === "closet" && <ClosetView />}
          {tabSelected === "wishlist" && <WishlistView />}
        </div>
      </div>
    </div>
  );
};
