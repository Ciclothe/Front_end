import { useTheme } from "@/context/ThemeContext";
import { mdiCheckBold, mdiSwapHorizontalHidden } from "@mdi/js";
import { Icon } from "@mdi/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { conditionColors } from "@/components/Utils/format";

type Garment = {
  id: number;
  name: string;
  condition: string;
  color: string;
  size: string;
  brand: string;
  selected: boolean;
  mainImage: string;
  token: string;
};

type Props = {
  token: string | unknown;
  setOferArray: (garments: { receiver: Garment[]; sender: Garment[] }) => void;
};

const originalData = {
  offerReceiverCloset: [
    {
      id: 1,
      token: "X9WL32TVKMZPR8A6UFQYC7NJE",
      name: "Hoodie Laine",
      condition: "as_new",
      color: "black",
      size: "M",
      brand: "Essentials",
      selected: true,
      mainImage:
        "https://images1.vinted.net/t/01_024d8_rJxsGHRmhRbPNiAeo1u5P9uV/f800/1737119064.jpeg?s=ef165b5a936035c351468701c2258462f645e076",
    },
    {
      id: 2,
      token: "c3ViamVctLTAwMDQ=",
      name: "Hoodie Laine",
      condition: "as_new",
      color: "black",
      size: "M",
      brand: "Essentials",
      selected: true,
      mainImage:
        "https://images1.vinted.net/t/01_024d8_rJxsGHRmhRbPNiAeo1u5P9uV/f800/1737119064.jpeg?s=ef165b5a936035c351468701c2258462f645e076",
    },
  ],
  offerSenderCloset: [
    {
      id: 1,
      token: "X9WL32TVKMZPR8A6UFQYC7NJE",
      name: "Essentials fear of God",
      condition: "new",
      color: "Caqui",
      size: "L",
      brand: "Essentials",
      selected: false,
      mainImage:
        "https://images1.vinted.net/t/04_000ca_x3XdW621URwVKT8kQHjgVBVm/f800/1744196832.jpeg?s=fdfeba230eb064d1f32a8871ab0d42e52e5b7a18",
    },
    {
      id: 2,
      token: "c3ViamV0LTAwMDQ=",
      name: "Essentials 1977 hoodie",
      condition: "new",
      color: "Grey",
      size: "M",
      brand: "Essentials",
      selected: false,
      mainImage:
        "https://images1.vinted.net/t/04_005aa_zzXoBAbnrvroKR69vXvr5Kyq/f800/1744137466.jpeg?s=48bc3c3392329879e0be03444d40baaf415b1480",
    },
    {
      id: 3,
      token: "c3ViamV0LTAwMDQ=",
      name: "Chaqueta acolchada GAP",
      condition: "as_new",
      color: "black",
      size: "XL",
      brand: "GAP",
      selected: false,
      mainImage:
        "https://images1.vinted.net/t/02_00365_iQuDJTKefa66LcMcrs2kKhCi/f800/1734377032.jpeg?s=08501415ecd9a2ea70523c4cd32014c86e0196f9",
    },
    {
      id: 4,
      token: "c3ViamV0LTAwMDQ=",
      name: "Nike x Corteiz",
      condition: "very_used",
      color: "Grey",
      size: "M",
      brand: "Nike",
      selected: false,
      mainImage:
        "https://images1.vinted.net/t/04_01c9e_WvFTPeLwMzKkXo4a6RGhwf1K/f800/1744061622.jpeg?s=7b60e1baae72a454cc3bf0aa86cb4c4040f7fc1d",
    },
    {
      id: 5,
      token: "c3ViamV0LTAwMDQ=",
      name: "Nike x Corteiz",
      condition: "used",
      color: "Grey",
      size: "M",
      brand: "Nike",
      selected: false,
      mainImage:
        "https://images1.vinted.net/t/04_01c9e_WvFTPeLwMzKkXo4a6RGhwf1K/f800/1744061622.jpeg?s=7b60e1baae72a454cc3bf0aa86cb4c4040f7fc1d",
    },
  ],
};

export const StepOne = ({ token, setOferArray }: Props) => {
  const { themeMode } = useTheme();
  const [receiverGarments, setReceiverGarments] = useState<Garment[]>([]);
  const [senderGarments, setSenderGarments] = useState<Garment[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    setOferArray({ receiver: [], sender: [] });
  }, [setOferArray]);

  useEffect(() => {
    console.log("Token:", token);
    if (!token) return;
    const { receiver, sender } = getInitialData(token as string);
    setReceiverGarments(receiver);
    setSenderGarments(sender);
  }, [token]);

  useEffect(() => {
    const selectedReceiver = receiverGarments.filter((g) => g.selected);
    const selectedSender = senderGarments.filter((g) => g.selected);
    setOferArray({
      receiver: selectedReceiver,
      sender: selectedSender,
    });
  }, [receiverGarments, senderGarments, setOferArray]);

  const getInitialData = (token: string) => {
    const receiver = originalData.offerReceiverCloset.map((item) => {
      return {
        ...item,
        selected: item.token === token,
      };
    });

    const sender = originalData.offerSenderCloset.map((item) => ({
      ...item,
      selected: false,
    }));

    receiver.sort((a, b) =>
      a.token === token ? -1 : b.token === token ? 1 : 0
    );

    return { receiver, sender };
  };

  const toggleGarmentSelection = (
    type: "receiver" | "sender",
    index: number
  ) => {
    if (type === "receiver") {
      const updated = [...receiverGarments];
      const garment = updated[index];

      if (garment.token === token) return;

      garment.selected = !garment.selected;
      setReceiverGarments(updated);
    } else {
      const updated = [...senderGarments];
      updated[index].selected = !updated[index].selected;
      setSenderGarments(updated);
    }
  };

  const selectedCountReceiver = receiverGarments.filter(
    (g) => g.selected
  ).length;
  const selectedCountSender = senderGarments.filter((g) => g.selected).length;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Receive */}
      <div
        className={`${
          themeMode === "light"
            ? "bg-white border-black/5"
            : "bg-[#222423] border-white/5"
        } rounded-2xl p-4 border overflow-y-auto max-h-[50%]`}
      >
        <div className="flex w-full justify-between items-center">
          <p className="font-semibold text-[1.1em]">
            {t("mainLayout.you_will_receive")}
          </p>
          <p className="opacity-50 text-md">
            {selectedCountReceiver}{" "}
            {selectedCountReceiver === 1
              ? t("mainLayout.garment")
              : t("mainLayout.garment_plural")}
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {receiverGarments.map((garment, index) => (
            <div
              key={garment.id}
              className={`${
                garment.selected
                  ? "bg-[rgba(13,188,115,0.1)] text-[#0DBC73] border-[#0DBC73]"
                  : themeMode === "light"
                  ? "bg-[#F7F7F7] border-transparent"
                  : "bg-[#121212] border-transparent"
              } flex justify-between border-2 w-full items-center p-4 rounded-lg gap-4 truncate cursor-pointer`}
              onClick={(e) => {
                e.stopPropagation();
                toggleGarmentSelection("receiver", index);
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
                    <p className="font-bold truncate">{garment.name}</p>
                    <p className="opacity-50 truncate">
                      {garment.color} | {garment.size} | {garment.brand}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {/* <p
                  className="p-4 font-semibold text-[#0DBC73] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(garment.token, "details", {
                      state: { navigatedInternally: true },
                    });
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
                      ? "bg-[#F7F7F7]"
                      : "bg-[#222423]"
                  } h-5 w-5 rounded-md flex items-center justify-center flex-shrink-0`}
                >
                  {garment.selected && <Icon path={mdiCheckBold} size={0.6} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Divider */}
      <div className="w-full justify-center flex items-center -mt-2 -mb-2 z-20">
        <div
          className={`${
            themeMode === "light" ? "bg-white" : "bg-[#222423]"
          } p-2 aspect-square flex items-center justify-center rounded-full`}
          style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
        >
          <Icon path={mdiSwapHorizontalHidden} size={1} className="rotate-90" />
        </div>
      </div>
      {/* Send */}
      <div
        className={`${
          themeMode === "light"
            ? "bg-white border-black/5"
            : "bg-[#222423] border-white/5"
        } border rounded-2xl p-4 overflow-y-auto h-full`}
      >
        <div className="flex w-full justify-between items-center gap-4">
          <p className="font-semibold text-[1.1em] truncate">
            {t("mainLayout.select_garments_from_your_closet")}
          </p>
          <p className="opacity-50 text-md whitespace-nowrap">
            {selectedCountSender}{" "}
            {selectedCountSender === 1
              ? t("mainLayout.garment")
              : t("mainLayout.garment_plural")}
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {senderGarments.map((garment, index) => (
            <div
              key={garment.id}
              className={`${
                garment.selected
                  ? "bg-[rgba(13,188,115,0.1)] text-[#0DBC73] border-[#0DBC73]"
                  : themeMode === "light"
                  ? "bg-[#F7F7F7] border-transparent"
                  : "bg-[#121212] border-transparent"
              } flex justify-between border-2 w-full items-center p-4 rounded-lg gap-4 truncate cursor-pointer`}
              onClick={(e) => {
                e.stopPropagation();
                toggleGarmentSelection("sender", index);
              }}
            >
              <div className="flex gap-4 h-full truncate">
                <img
                  src={garment.mainImage}
                  alt="garment"
                  className="w-20 aspect-square object-cover rounded-md"
                />
                <div className="flex flex-col justify-center w-full">
                  <p
                    className="font-bold"
                    style={{ color: conditionColors[garment.condition] }}
                  >
                    {t(`mainLayout.${garment.condition}`)}
                  </p>
                  <div className="mt-2">
                    <p className="font-bold truncate">{garment.name}</p>
                    <p className="opacity-50 truncate">
                      {garment.color} | {garment.size} | {garment.brand}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {/* <p
                  className="p-4 font-semibold text-[#0DBC73] cursor-pointer"
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
                  {garment.selected && <Icon path={mdiCheckBold} size={0.6} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
