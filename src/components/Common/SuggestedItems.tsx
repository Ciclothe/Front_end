import { useTheme } from "@/context/ThemeContext";
import Masonry from "@mui/lab/Masonry";
import { useTranslation } from "react-i18next";
import { UserHeader } from "@/components/Common/Post/UserHeader";
import { PostInfoOverlay } from "@/components/Common/Post/PostInfoOverlay";
import { conditionColors } from "@/components/Utils/format";
import Icon from "@mdi/react";
import { mdiHeartOutline } from "@mdi/js";
import { useNavigate } from "react-router-dom";

// TODO: Fetch data from API
const testProducsData = [
  {
    idGarment: 1,
    token: "M5ZK84HQVNTYAC9XLR3UEWJG",
    title: "Fear of God Essentials Pantalón Corto.",
    distance: "2 km",
    createdAt: "2025-04-05T13:00:00Z",
    color: "Grey",
    size: "S",
    brand: "Fear of God",
    condition: "as_new",
    userData: {
      userId: 1,
      userName: "Frankjones1984",
      profilePicture:
        "https://i.pinimg.com/736x/5b/a2/62/5ba26284b03f86682056eb72d9882eba.jpg",
    },
    category: "pants",
    picOrientation: "portrait",
    mainPic:
      "https://images1.vinted.net/t/04_008f3_eG6ctkAzQXn7S5JxgGRQAtjA/f800/1746548886.jpeg?s=f4db4a803d1c4ebc66a65873bc75c3a40502dad8",
  },
  {
    idGarment: 2,
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
  {
    idGarment: 5,
    token: "AYJ4PLMRQTWZBNK682XCUFV9E",
    title: "Vestido largo floreado",
    distance: "2 km",
    createdAt: "2025-04-05T13:00:00Z",
    color: "Rojo",
    size: "S",
    brand: "H&M",
    condition: "used",
    userData: {
      userId: 5,
      userName: "luisa_b",
      profilePicture:
        "https://images1.vinted.net/t/04_01af8_a8hL6pTQnwZeX5YiCkirD238/f800/1741333455.jpeg?s=bc3def815569f9d22fd38d8a54281b7995110676",
    },
    category: "tshirt",
    picOrientation: "portrait",
    mainPic:
      "https://images1.vinted.net/t/03_01e7d_FAg3bjWLdfsNBQaPYHFgeH8Q/f800/1745664730.jpeg?s=5d8ae0566eb37a1eca389db11bf8000bc3563417",
  },
  {
    idGarment: 6,
    token: "PQXT3MZ6RVY9WC7NLAKJBUFE2",
    title: "Sudadera Adidas Originals",
    distance: "2 km",
    createdAt: "2025-04-05T13:00:00Z",
    color: "Gris",
    size: "M",
    brand: "Adidas",
    condition: "used",
    userData: {
      userId: 6,
      userName: "daniel_98",
      profilePicture:
        "https://images1.vinted.net/t/04_01af8_a8hL6pTQnwZeX5YiCkirD238/f800/1741333455.jpeg?s=bc3def815569f9d22fd38d8a54281b7995110676",
    },
    category: "hoodies",
    picOrientation: "landscape",
    mainPic:
      "https://images1.vinted.net/t/04_021eb_1oGX7Vo5xCtUTYavCTRreV6D/f800/1744661169.jpeg?s=0a5bd10b718a596d9006673460c5dd3850da0bab",
  },
  {
    idGarment: 7,
    token: "N49MRWJYXPCQLAKTZV7EUF68B",
    title: "Falda plisada midi",
    distance: "2 km",
    createdAt: "2025-04-05T13:00:00Z",
    color: "Verde",
    size: "M",
    brand: "Stradivarius",
    condition: "as_new",
    userData: {
      userId: 7,
      userName: "emma_style",
      profilePicture:
        "https://images1.vinted.net/t/04_01af8_a8hL6pTQnwZeX5YiCkirD238/f800/1741333455.jpeg?s=bc3def815569f9d22fd38d8a54281b7995110676",
    },
    category: "jeans",
    picOrientation: "portrait",
    mainPic:
      "https://images1.vinted.net/t/03_01064_bkmhT7doNxUX5QNNdgiLBPND/f800/1746031331.jpeg?s=028e33d2e1e9e0c6712f2621eb59edc80817ea59",
  },
  {
    idGarment: 8,
    token: "FK3VCPZNMQU9RT6WJXLYB7A2E",
    title: "Abrigo de paño camel",
    distance: "2 km",
    createdAt: "2025-04-05T13:00:00Z",
    color: "Camel",
    size: "L",
    brand: "Massimo Dutti",
    condition: "used",
    userData: {
      userId: 8,
      userName: "joaquin_dl",
      profilePicture:
        "https://images1.vinted.net/t/04_01af8_a8hL6pTQnwZeX5YiCkirD238/f800/1741333455.jpeg?s=bc3def815569f9d22fd38d8a54281b7995110676",
    },
    category: "jackets",
    picOrientation: "portrait",
    mainPic:
      "https://images1.vinted.net/t/02_0234e_mrXdVziQsFKzkAiyTXmyw1dU/f800/1745916852.jpeg?s=0742940814af27de40bd13e4967a2eb2c5a94c0c",
  },
  {
    idGarment: 9,
    token: "WQ9NXP5TK8L2RMJYFCBVAUE3Z",
    title: "Chaqueta vaquera oversize",
    distance: "2 km",
    createdAt: "2025-04-05T13:00:00Z",
    color: "Azul claro",
    size: "L",
    brand: "Bershka",
    condition: "used",
    userData: {
      userId: 9,
      userName: "mariana.arte",
      profilePicture:
        "https://images1.vinted.net/t/04_01af8_a8hL6pTQnwZeX5YiCkirD238/f800/1741333455.jpeg?s=bc3def815569f9d22fd38d8a54281b7995110676",
    },
    category: "jackets",
    picOrientation: "landscape",
    mainPic:
      "https://images1.vinted.net/t/03_0044c_B9opV9vWjoycM7Q6eUwKbKia/f800/1685637129.jpeg?s=fed0216a547fe42eec56010d1ce53ee79cbe0644",
  },
  {
    idGarment: 10,
    token: "MKQTZ3YVAF2RLBXJPCWU97E6N",
    title: "Conjunto deportivo",
    distance: "2 km",
    createdAt: "2025-04-05T13:00:00Z",
    color: "Negro",
    size: "S",
    brand: "Gymshark",
    condition: "as_new",
    userData: {
      userId: 10,
      userName: "fitgirl_90",
      profilePicture:
        "https://images1.vinted.net/t/04_01af8_a8hL6pTQnwZeX5YiCkirD238/f800/1741333455.jpeg?s=bc3def815569f9d22fd38d8a54281b7995110676",
    },
    category: "tshirt",
    picOrientation: "portrait",
    mainPic:
      "https://images1.vinted.net/t/04_01c71_9473NNknAzEjgXeqAdAU5ZoX/f800/1745253662.jpeg?s=36ea365e036564f098ea61c0f391d8ead6fd669f",
  },
  {
    idGarment: 11,
    token: "LXM3WFKA97UJYQZNTVPBRC68E",
    title: "Camisa de lino",
    distance: "2 km",
    createdAt: "2025-04-05T13:00:00Z",
    color: "Blanco",
    size: "M",
    brand: "Uniqlo",
    condition: "used",
    userData: {
      userId: 11,
      userName: "juanperez",
      profilePicture:
        "https://images1.vinted.net/t/04_01af8_a8hL6pTQnwZeX5YiCkirD238/f800/1741333455.jpeg?s=bc3def815569f9d22fd38d8a54281b7995110676",
    },
    category: "tshirt",
    picOrientation: "portrait",
    mainPic:
      "https://images1.vinted.net/t/04_00dbb_v7wi2zsmssW1KnL2Upe14ton/f800/1745023383.jpeg?s=26ed61dd53fdc82299753b00a3010df4c116434b",
  },
  {
    idGarment: 12,
    token: "PJK7V9TR2MWCXQFUB8LZNEAY3",
    title: "Top de tirantes",
    distance: "2 km",
    createdAt: "2025-04-05T13:00:00Z",
    color: "Amarillo",
    size: "XS",
    brand: "Forever 21",
    condition: "as_new",
    userData: {
      userId: 12,
      userName: "alejandra21",
      profilePicture:
        "https://images1.vinted.net/t/04_01af8_a8hL6pTQnwZeX5YiCkirD238/f800/1741333455.jpeg?s=bc3def815569f9d22fd38d8a54281b7995110676",
    },
    category: "tshirt",
    picOrientation: "portrait",
    mainPic:
      "https://images1.vinted.net/t/04_01232_Rs2rgr6zdUJiBTYwJ2kg4wZ2/f800/1745596429.jpeg?s=f9bbf677b0c07dc0fa19754f63f658230915882b",
  },
  {
    idGarment: 13,
    token: "XZP93WKVRNAYLCQ8TJ7UF6EMB",
    title: "Jersey de punto grueso",
    distance: "2 km",
    createdAt: "2025-04-05T13:00:00Z",
    color: "Beige",
    size: "M",
    brand: "Mango",
    condition: "used",
    userData: {
      userId: 13,
      userName: "irene_knit",
      profilePicture:
        "https://images1.vinted.net/t/04_01af8_a8hL6pTQnwZeX5YiCkirD238/f800/1741333455.jpeg?s=bc3def815569f9d22fd38d8a54281b7995110676",
    },
    category: "hoodies",
    picOrientation: "landscape",
    mainPic:
      "https://images1.vinted.net/t/03_00d69_DojfC39gGYtep54wPWh1z4tc/f800/1736246811.jpeg?s=d2f97e49566bd0d2a7505c92b9ccc91d79654063",
  },
  {
    idGarment: 14,
    token: "VRKQU7JXZTC2MBFYW9LPA63EN",
    title: "Pantalones de vestir",
    distance: "2 km",
    createdAt: "2025-04-05T13:00:00Z",
    color: "Gris oscuro",
    size: "L",
    brand: "Springfield",
    condition: "used",
    userData: {
      userId: 14,
      userName: "david_trend",
      profilePicture:
        "https://images1.vinted.net/t/04_01af8_a8hL6pTQnwZeX5YiCkirD238/f800/1741333455.jpeg?s=bc3def815569f9d22fd38d8a54281b7995110676",
    },
    category: "jeans",
    picOrientation: "portrait",
    mainPic:
      "https://images1.vinted.net/t/02_0117d_7kFntu9fNE4136GjJCHePgiE/f800/1745993591.jpeg?s=f770dbdfa7a4019c3f9197b87dc07b517793173a",
  },
  {
    idGarment: 15,
    token: "T6JPNZKMFQVA28LRYWCU93EXB",
    title: "Blazer de cuadros",
    distance: "2 km",
    createdAt: "2025-04-05T13:00:00Z",
    color: "Gris con negro",
    size: "M",
    brand: "Zara",
    condition: "used",
    userData: {
      userId: 15,
      userName: "lucia_formal",
      profilePicture:
        "https://images1.vinted.net/t/04_01af8_a8hL6pTQnwZeX5YiCkirD238/f800/1741333455.jpeg?s=bc3def815569f9d22fd38d8a54281b7995110676",
    },
    category: "hoodies",
    picOrientation: "portrait",
    mainPic:
      "https://images1.vinted.net/t/04_00001_fJT9td85dLzB1tv4GGTkTd4m/f800/1745833386.jpeg?s=613546eb0f6770bdb669f74938a5a945c5e66caf",
  },
];

export const SuggestedItems = () => {
  const { t } = useTranslation();
  const { themeMode } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="suggested-items-container w-full text-start">
      <p className="text-[1.4em] font-semibold">This is also your style</p>
      <Masonry columns={{ xs: 2, sm: 3 }} spacing={2} sequential>
        {testProducsData.map((garment, index) => (
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
                src={garment?.mainPic}
                alt={garment?.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />

              {/* Avatar + Nombre */}
              <div className="hidden xl:block">
                <UserHeader
                  postData={garment}
                  userData={garment?.userData}
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
  );
};
