import { PostInfoOverlay } from "@/components/Common/Post/PostInfoOverlay";
import { useTheme } from "@/context/ThemeContext";
import Icon from "@mdi/react";
import { mdiPencil } from "@mdi/js";
import Masonry from "@mui/lab/Masonry";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { conditionColors } from "@/components/Utils/format";
import { PiSwapFill } from "react-icons/pi";

const testProducsData = [
  {
    idGarment: 1,
    swapped: true,
    token: "X9WL32TVKMZPR8A6UFQYC7NJE",
    title: "Boxy Fit Hoodie",
    distance: "2 km",
    createdAt: "2025-04-05T13:00:00Z",
    color: "Brown",
    size: "M",
    brand: "Levi's",
    condition: "used",
    userData: {
      userId: 1,
      userName: "grifoMmm",
      profilePicture:
        "https://i.pinimg.com/736x/15/4c/c1/154cc1b2916a59a0a2e2f2c7983329b8.jpg",
    },
    category: "hoodie",
    picOrientation: "portrait",
    mainPic:
      "https://images1.vinted.net/t/04_00c90_MRBRdcAp1QUzDByCZ3oaaf2Q/f800/1734704789.jpeg?s=6a00536c82c882254c7ef7f780e7b7d93e83c744",
  },
  {
    idGarment: 2,
    swapped: false,
    token: "X9WL32TVKMZPR8A6UFQYC7NJE",
    title: "Chaqueta de cuero negra",
    distance: "2 km",
    createdAt: "2025-04-05T13:00:00Z",
    color: "Negro",
    size: "M",
    brand: "Zara",
    condition: "used",
    userData: {
      userId: 2,
      userName: "sofia92",
      profilePicture:
        "https://images1.vinted.net/t/04_01af8_a8hL6pTQnwZeX5YiCkirD238/f800/1741333455.jpeg?s=bc3def815569f9d22fd38d8a54281b7995110676",
    },
    category: "jackets",
    picOrientation: "portrait",
    mainPic:
      "https://images1.vinted.net/t/02_005f1_HWLDYmSpegSD1GhRz3RydmvQ/f800/1746084272.jpeg?s=fabb2cbfbbb488c27f633d3b077571b4fc994418",
  },
  {
    idGarment: 3,
    swapped: false,
    token: "T83MZQAXP92CWFKLRVNJ7UBYE",
    title: "Pantalón vaquero slim fit",
    distance: "2 km",
    createdAt: "2025-04-05T13:00:00Z",
    color: "Azul",
    size: "L",
    brand: "Levi's",
    condition: "used",
    userData: {
      userId: 3,
      userName: "alexito",
      profilePicture:
        "https://images1.vinted.net/t/04_01af8_a8hL6pTQnwZeX5YiCkirD238/f800/1741333455.jpeg?s=bc3def815569f9d22fd38d8a54281b7995110676",
    },
    category: "jeans",
    picOrientation: "landscape",
    mainPic:
      "https://images1.vinted.net/t/04_025a0_WUQStv7VUsFyjLJX2mw4eJuV/f800/1745914616.jpeg?s=01302d2d1753855d2e4181f485cb053a895036ba",
  },
  {
    idGarment: 4,
    swapped: false,
    token: "ZK3WT9ULFQX28VCMPRYBJ67AE",
    title: "Camiseta estampada oversize",
    distance: "2 km",
    createdAt: "2025-04-05T13:00:00Z",
    color: "Blanco",
    size: "XL",
    brand: "Pull&Bear",
    condition: "as_new",
    userData: {
      userId: 4,
      userName: "carla_moda",
      profilePicture:
        "https://images1.vinted.net/t/04_01af8_a8hL6pTQnwZeX5YiCkirD238/f800/1741333455.jpeg?s=bc3def815569f9d22fd38d8a54281b7995110676",
    },
    category: "tshirt",
    picOrientation: "portrait",
    mainPic:
      "https://images1.vinted.net/t/04_01a76_udyoqS7DigXC7D7cEU2tXZd2/f800/1745571530.jpeg?s=d619272594bbed698b5577b0417992d53906e624",
  },
];

export const ClosetView = () => {
  const { t } = useTranslation();
  const { themeMode } = useTheme();
  const navigate = useNavigate();

  return (
    <Masonry columns={{ xs: 2, md: 3, lg: 4 }} spacing={2} sequential>
      {testProducsData.map((garment, index) => (
        <div
          key={index}
          className={`${
            themeMode === "light"
              ? "xl:bg-white xl:hover:bg-[#EDEDED]"
              : "xl:bg-[#222423] xl:hover:bg-[#323332]"
          } cursor-pointer xl:rounded-xl flex flex-col gap-2 xl:gap-4 xl:p-2`}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/swapDetails/${garment.token}`);
          }}
        >
          {/* Imagen */}
          <div
            className={`rounded-md overflow-hidden relative aspect-[2/3] xl:aspect-[4/5]`}
          >
            <img
              src={garment?.mainPic}
              alt={garment?.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            {/* Info inferior */}
            {!garment?.swapped && (
              <div className="hidden xl:block">
                <PostInfoOverlay
                  condition={garment?.condition}
                  title={garment?.title}
                  color={garment?.color}
                  size={garment?.size}
                  brand={garment?.brand}
                />
              </div>
            )}
            {garment?.swapped && (
              <div className="absolute top-0 right-0 bg-black/60 w-full h-full flex flex-col gap-2 items-center justify-center text-white">
                <PiSwapFill size={50} />
                <p className="text-[1.1em] font-bold">Swapped</p>
              </div>
            )}
            {!garment?.swapped && (
              <div className="absolute top-2 right-2 bg-black/60 w-fit h-fit flex items-center justify-center text-white p-2 rounded-full">
                <Icon path={mdiPencil} size={0.8} />
              </div>
            )}
          </div>
          <div className="xl:hidden">
            <div className="flex items-center gap-2 justify-between">
              <p
                className="font-semibold"
                style={{ color: conditionColors[garment?.condition] }}
              >
                {t(`mainLayout.${garment?.condition}`)}
              </p>
            </div>
            <p className="text-[1.1em] font-bold truncate text-start">
              {garment?.title}
            </p>
            <p className="opacity-50 font-semibold text-md truncate text-start">
              {garment?.color} | {garment?.size} | {garment?.brand}
            </p>
          </div>
        </div>
      ))}
    </Masonry>
  );
};
