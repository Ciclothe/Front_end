import { useState } from "react";
import CardComponent from "./components/Card";
import TutorialOverlat from "./components/TutorialOverlay";

import Icon from "@mdi/react";
import { mdiClose, mdiSwapHorizontal } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";

type Card = {
  userId: number;
  id: number;
  url: string;
  userName: string;
  condition: string;
  size: string;
  brand: string;
  color: string;
  title: string;
  profilePicture: string;
  location: {
    lat: number;
    lng: number;
  };
};

// TODO: #65 Get data from API and remove mock data
const cardData: Card[] = [
  {
    userId: 1,
    id: 1,
    condition: "new",
    url: "https://images1.vinted.net/t/02_006c8_ivwSAKQj9mSXaHV7WHHGB4TD/f800/1744981667.jpeg?s=28d5eee354ec89a4a118431b82bf32ea9543d8e8",
    userName: "goods__arch",
    size: "M",
    color: "Blue",
    brand: "Supreme",
    title: "Supreme Gore Tex Jacket Royal L",
    profilePicture:
      "https://i.pinimg.com/280x280_RS/59/f0/77/59f07721cc9792292d159244cdc6b9e6.jpg",
    location: { lat: -0.4039672, lng: 39.4676153 },
  },
  {
    userId: 2,
    id: 2,
    condition: "used",
    url: "https://images1.vinted.net/t/01_01224_QtvHmJBtKZvbavUQyCcSU1eS/f800/1733047105.jpeg?s=506a943f3f9976fe29b84d7291e7d7e5fee78a13",
    userName: "randybrood",
    size: "41",
    color: "Black",
    brand: "Nike",
    title: "Nike Infinityrn 4 FP - talla 41",
    profilePicture:
      "https://i.pinimg.com/280x280_RS/91/ba/80/91ba809095988caccd09ab290e5ee196.jpg",
    location: { lat: 39.4676153, lng: -0.4039672 },
  },
  {
    userId: 3,
    id: 3,
    condition: "as_new",
    url: "https://images1.vinted.net/t/02_00091_o8pEN7jMbZZ99HYrNVyqXaHP/f800/1733508064.jpeg?s=f0421751d49b19bc786edadd2d470ea75f24d5a7",
    userName: "l_jh7",
    size: "M",
    color: "Black",
    brand: "Represent",
    title: "Pantalón corto Represent",
    profilePicture:
      "https://images1.vinted.net/t/02_014e5_CtEDSisrSLqGFoavFdHszsbE/f800/1733506895.jpeg?s=6a2ed55ae31f25b09a4ebc83a105ee56e33c285d",
    location: { lat: 39.4676153, lng: -0.4039672 },
  },
  {
    userId: 4,
    id: 4,
    condition: "very_used",
    url: "https://images1.vinted.net/t/04_011f2_FvVKEfaUaRFmaGJF5G32Bodm/f800/1744981825.jpeg?s=84315e19ee4c9fbc2efad34854e37a84b704c6be",
    userName: "janeiroc",
    size: "L",
    color: "Grey",
    brand: "Represent",
    title: "Sudadera Represent",
    profilePicture:
      "https://i.pinimg.com/280x280_RS/c5/0b/25/c50b259274901b27316e6537150c786a.jpg",
    location: { lat: 39.4676153, lng: -0.4039672 },
  },
  {
    userId: 5,
    id: 5,
    condition: "used",
    url: "https://images1.vinted.net/t/04_015e9_QwdGPHEu8STTsMJDsyTKshpS/f800/1743769603.jpeg?s=a729a3f50f21668002cf72e5e6f6fc2c53b16fd0",
    userName: "panting_babbl",
    size: "One Size",
    color: "Black",
    brand: "Balenciaga",
    title: "Balenciaga hat",
    profilePicture:
      "https://i.pinimg.com/280x280_RS/c9/82/40/c9824002f425c9a41bfc0caa5c51f81e.jpg",
    location: { lat: 39.4676153, lng: -0.4039672 },
  },
];

export const SwipePage = () => {
  const [cards, setCards] = useState<Card[]>(cardData);
  const { themeMode } = useTheme();

  const [isTutorialVisible, setIsTutorialVisible] = useState(true);

  // TODO: #70 Create accept/reject functionality for cards based on swipe direction and make API call to update data
  const handleReject = (id: number) => {
    console.log(`Card with id ${id} was rejected`);
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const handleAccept = (id: number) => {
    console.log(`Card with id ${id} was accepted`);
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };

  const handleTutorialChange = (isVisible: boolean) => {
    setIsTutorialVisible(isVisible);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 md:px-0 h-full overflow-hidden pb-4">
      <div className="flex-1 grid place-items-center h-full relative w-full">
        <TutorialOverlat onTutorialChange={handleTutorialChange} />
        {cards.map((card) => (
          <CardComponent
            key={card.id}
            cards={cards}
            setCards={setCards}
            {...card}
          />
        ))}
      </div>
      <div className="items-center gap-3 hidden md:flex">
        <button
          className={`${
            themeMode ? "hover:text-white" : "hover:text-black"
          } rounded-full p-2 bg-[rgba(188,13,13,0.1)] text-[#bc0d0d] hover:bg-[#bc0d0d] ${
            cards.length == 0 || isTutorialVisible
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={cards.length == 0 || isTutorialVisible}
          onClick={() => handleReject(cards[cards.length - 1].id)}
        >
          <Icon path={mdiClose} size={1.5} />
        </button>
        <button
          className={`${
            themeMode ? "hover:text-white" : "hover:text-black"
          } rounded-full p-2 border-2 border-[#0DBC73] text-[#0DBC73] hover:bg-[#0DBC73] bg-[rgba(13,188,115,0.1)] ${
            cards.length == 0 || isTutorialVisible
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={cards.length == 0 || isTutorialVisible}
          onClick={() => handleAccept(cards[cards.length - 1].id)}
        >
          <Icon path={mdiSwapHorizontal} size={1.5} />
        </button>
      </div>
    </div>
  );
};
