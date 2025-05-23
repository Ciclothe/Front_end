import { Icon } from "@mdi/react";
import { mdiCheckBold, mdiClose, mdiHanger, mdiStar } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useModal } from "@/context/ModalContext";
import { conditionColors } from "@/components/Utils/format";
import { useState } from "react";

interface Garment {
  id: number;
  title: string;
  color: string;
  size: string;
  brand: string;
  condition: string;
  mainImage: string;
  token: string;
  selected?: boolean;
}

interface EventData {
  token: string;
  rules: {
    eventStyle: string;
    garmentLimitPerPerson: number;
    minimumGarmentPerPerson: number;
  };
  closet: Garment[];
}

const eventData: EventData[] = [
  {
    token: "a9X3vB1cD4pE5sQ7mN8wZ6yT2kR0uLf",
    rules: {
      eventStyle: "StreetWear",
      garmentLimitPerPerson: 5,
      minimumGarmentPerPerson: 2,
    },
    closet: [
      {
        id: 1,
        token: "X9WL32TVKMZPR8A6UFQYC7NJE",
        title: "Puma vintage track jacket",
        condition: "as_new",
        color: "Purple",
        size: "L",
        brand: "Puma",
        selected: false,
        mainImage:
          "https://images1.vinted.net/t/02_00314_eGXMszKxuYWKCdVtu1AS4H4w/f800/1743443816.jpeg?s=c8f670a12fb13ef62847dc60113e3fb61546e874",
      },
      {
        id: 2,
        token: "4158249710d=",
        title: "Jordan Hoodie L",
        condition: "used",
        color: "Black",
        size: "M",
        brand: "Jordan",
        selected: false,
        mainImage:
          "https://images1.vinted.net/t/02_02196_WBeUtv3tRHrhaqDqUyTrBZ2W/f800/1744230137.jpeg?s=454abe26c5eefba50132717c3b0444b6fbf7e28c",
      },
    ],
  },
];

export const EventOffer = () => {
  const { params, closeModal } = useModal();
  const token = params?.token;

  const { themeMode } = useTheme();
  const { t } = useTranslation();

  const data = eventData.find((e) => e.token === token);
  const [closet, setCloset] = useState(data?.closet || []);

  const selectedCount = closet.filter((g) => g.selected).length;
  const canJoin =
    selectedCount >= (data?.rules?.minimumGarmentPerPerson ?? 0) &&
    selectedCount <= (data?.rules?.garmentLimitPerPerson ?? Infinity);

  const toggleGarmentSelection = (id: number) => {
    setCloset((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  return (
    <div className="flex flex-col h-full w-full md:max-h-[80vh] md:pb-4">
      {/* Header */}
      <div className="flex items-center justify-between py-4">
        <div
          className={`${
            themeMode === "light" ? "bg-[#EDEDED]" : "bg-[#222423]"
          } p-2 rounded-full cursor-pointer`}
          onClick={closeModal}
        >
          <Icon path={mdiClose} size={1} />
        </div>

        <p className="flex-1 text-center text-[1.2em] font-bold">
          {t("mainLayout.choose_items_to_swap")}
        </p>

        {/* Espacio invisible del mismo tamaño que el botón para balancear */}
        <div className="p-2 invisible">
          <Icon path={mdiClose} size={1} />
        </div>
      </div>

      {/* Rules Event */}
      <div
        className={`rounded-2xl p-4 overflow-y-auto border flex flex-col min-h-0 gap-4 ${
          themeMode === "light"
            ? "bg-white border-black/5"
            : "bg-[#222423] border-white/5"
        }`}
      >
        <div className="flex items-center">
          <p className="font-semibold text-[1.1em]">
            {t("mainLayout.event_details")}
          </p>
        </div>
        <div className="flex-col flex md:flex-row justify-around gap-2">
          <div className="flex items-center gap-2">
            <div
              className={`${
                themeMode === "light" ? "border-black/10" : "border-white/20"
              } border p-2 rounded-xl w-fit`}
            >
              <Icon path={mdiStar} size={1} />
            </div>
            <div>
              <p className="opacity-50">{t("mainLayout.event_style")}</p>
              <p className="font-semibold text-[1.1em]">
                {data?.rules?.eventStyle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`${
                themeMode === "light" ? "border-black/10" : "border-white/20"
              } border p-2 rounded-xl w-fit`}
            >
              <Icon path={mdiHanger} size={1} />
            </div>
            <div>
              <p className="opacity-50">{t("mainLayout.garment_limit")}</p>
              <p className="font-semibold text-[1.1em]">
                {data?.rules?.garmentLimitPerPerson} items
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div
              className={`${
                themeMode === "light" ? "border-black/10" : "border-white/20"
              } border p-2 rounded-xl w-fit`}
            >
              <Icon path={mdiHanger} size={1} />
            </div>
            <div>
              <p className="opacity-50">{t("mainLayout.minimum_of_garment")}</p>
              <p className="font-semibold text-[1.1em]">
                {data?.rules?.minimumGarmentPerPerson} items
              </p>
            </div>
          </div>
        </div>
        <div
          className={`${
            themeMode === "light" ? "text-white" : "text-black"
          } px-5 py-3 w-full rounded-xl flex items-center justify-center gap-2 font-bold cursor-pointer`}
          style={{
            backgroundColor: canJoin ? "#0DBC73" : "rgba(13, 188, 115, 0.5)",
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (!canJoin) return;
            // Lógica de "Join Event"
          }}
        >
          <p className="cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis">
            {t("mainLayout.join_event")}
          </p>
        </div>
      </div>

      {/* Closet */}
      {closet.length > 0 ? (
        <div
          className={`rounded-2xl p-4 border overflow-y-auto md:flex-1 min-h-0 mt-4 ${
            themeMode === "light"
              ? "bg-white border-black/5"
              : "bg-[#222423] border-white/5"
          }`}
        >
          <div className="flex justify-between items-center">
            <p className="font-semibold text-[1.1em]">
              {t("mainLayout.select_garments_from_your_closet")}
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {closet.map((garment) => (
              <div
                key={garment.id}
                className={`${
                  garment.selected
                    ? "bg-[rgba(13,188,115,0.1)] text-[#0DBC73] border-[#0DBC73]"
                    : themeMode === "light"
                    ? "bg-[#F7F7F7] border-transparent"
                    : "bg-[#121212] border-transparent"
                } flex justify-between border-2 w-full items-center p-4 rounded-xl gap-4 truncate cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleGarmentSelection(garment.id);
                }}
              >
                <div className="flex gap-4 h-full max-w-full truncate">
                  <img
                    src={garment.mainImage}
                    alt="garment"
                    className="w-20 aspect-square object-cover rounded-md"
                  />
                  <div className="flex flex-col justify-center">
                    <p
                      className="font-bold"
                      style={{ color: conditionColors[garment.condition] }}
                    >
                      {t(`mainLayout.${garment.condition}`)}
                    </p>
                    <div className="mt-2">
                      <p className="font-bold truncate">{garment.title}</p>
                      <p className="opacity-50 truncate">
                        {garment.color} | {garment.size} | {garment.brand}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {/* <p
                    className="p-4 font-semibold text-[#0DBC73]"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/swapDetails/${garment.token}`);
                    }}
                  >
                    {t("mainLayout.details")}
                  </p> */}

                  <div
                    className={`${
                      garment.selected
                        ? themeMode === "light"
                          ? "bg-[#0DBC73] text-white"
                          : "bg-[#0DBC73] text-black"
                        : themeMode === "light"
                        ? "bg-white"
                        : "bg-[#222423]"
                    } h-5 aspect-square rounded-md flex items-center justify-center flex-shrink-0`}
                  >
                    {garment.selected && (
                      <Icon path={mdiCheckBold} size={0.6} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`rounded-2xl p-4 overflow-y-auto border flex flex-col min-h-0 gap-4 mt-4 ${
            themeMode === "light"
              ? "bg-white border-black/5"
              : "bg-[#222423] border-white/5"
          }`}
        >
          <div className="flex flex-col gap-2 md:w-[50%] mx-auto text-center items-center">
            <p className="text-[1.1em] font-bold">
              {t("mainLayout.right_now_wardrobe_empty")}
            </p>
            <p className="opacity-50 text-sm">
              {t("mainLayout.heads_up_publish_minimum")}
            </p>
            <div
              className={`${
                themeMode === "light"
                  ? "bg-[#F7F7F7] hover:bg-[#171717] hover:text-white"
                  : "bg-[#171717] hover:bg-[#F7F7F7] hover:text-black"
              } px-5 py-3 rounded-xl flex items-center justify-center w-fit cursor-pointer`}
            >
              <p className="font-bold">{t("mainLayout.add_garment")}</p>
            </div>
          </div>
        </div>
      )}
      {closet.length > 0 && (
        <div className="text-center flex flex-col gap-2 items-center mt-4">
          <p className="font-bold">{t("mainLayout.or")}</p>
          <div
            className={`${
              themeMode === "light"
                ? "bg-white hover:bg-[#171717] hover:text-white"
                : "bg-[#222423] hover:bg-[#F7F7F7] hover:text-black"
            } px-5 py-3 rounded-xl flex items-center justify-center w-fit cursor-pointer`}
          >
            <p className="font-bold">{t("mainLayout.add_garment")}</p>
          </div>
        </div>
      )}
    </div>
  );
};
