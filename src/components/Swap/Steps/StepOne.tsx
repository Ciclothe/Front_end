import { useTheme } from "@/context/ThemeContext";
import { mdiCheckBold, mdiSwapHorizontalHidden } from "@mdi/js";
import { Icon } from "@mdi/react";
import { useEffect, useState } from "react";

type Garment = {
  id: number;
  name: string;
  condition: string;
  color: string;
  size: string;
  brand: string;
  selected: boolean;
  mainImage: string;
};

type Props = {
  postId: number;
  setOferArray: (garments: { receiver: Garment[]; sender: Garment[] }) => void;
};

const originalData = {
  offerReceiverCloset: [
    {
      id: 1,
      name: "Hoodie Laine",
      condition: "As new",
      color: "black",
      size: "M",
      brand: "Essentials",
      selected: true,
      mainImage:
        "https://images1.vinted.net/t/01_024d8_rJxsGHRmhRbPNiAeo1u5P9uV/f800/1737119064.jpeg?s=ef165b5a936035c351468701c2258462f645e076",
    },
    {
      id: 2,
      name: "Leather Bomber Jacket Made in Italy🇮🇹",
      condition: "Used",
      color: "Brown",
      size: "M",
      brand: "Levi's",
      selected: false,
      mainImage:
        "https://images1.vinted.net/t/04_01373_LdPC5VvcV6xdk9AVWpHim9vR/f800/1742928811.jpeg?s=58f3763f00ade9932b262aaf9d458ac4ae331119",
    },
  ],
  offerSenderCloset: [
    {
      id: 1,
      name: "Essentials fear of God",
      condition: "As new",
      color: "Caqui",
      size: "L",
      brand: "Essentials",
      selected: false,
      mainImage:
        "https://images1.vinted.net/t/04_000ca_x3XdW621URwVKT8kQHjgVBVm/f800/1744196832.jpeg?s=fdfeba230eb064d1f32a8871ab0d42e52e5b7a18",
    },
    {
      id: 2,
      name: "Essentials 1977 hoodie",
      condition: "New",
      color: "Grey",
      size: "M",
      brand: "Essentials",
      selected: false,
      mainImage:
        "https://images1.vinted.net/t/04_005aa_zzXoBAbnrvroKR69vXvr5Kyq/f800/1744137466.jpeg?s=48bc3c3392329879e0be03444d40baaf415b1480",
    },
    {
      id: 3,
      name: "Chaqueta acolchada GAP",
      condition: "As new",
      color: "black",
      size: "XL",
      brand: "GAP",
      selected: false,
      mainImage:
        "https://images1.vinted.net/t/02_00365_iQuDJTKefa66LcMcrs2kKhCi/f800/1734377032.jpeg?s=08501415ecd9a2ea70523c4cd32014c86e0196f9",
    },
    {
      id: 4,
      name: "Nike x Corteiz",
      condition: "Used",
      color: "Grey",
      size: "M",
      brand: "Nike",
      selected: false,
      mainImage:
        "https://images1.vinted.net/t/04_01c9e_WvFTPeLwMzKkXo4a6RGhwf1K/f800/1744061622.jpeg?s=7b60e1baae72a454cc3bf0aa86cb4c4040f7fc1d",
    },
    {
      id: 5,
      name: "Nike x Corteiz",
      condition: "Used",
      color: "Grey",
      size: "M",
      brand: "Nike",
      selected: false,
      mainImage:
        "https://images1.vinted.net/t/04_01c9e_WvFTPeLwMzKkXo4a6RGhwf1K/f800/1744061622.jpeg?s=7b60e1baae72a454cc3bf0aa86cb4c4040f7fc1d",
    },
  ],
};

export const StepOne = ({ postId, setOferArray }: Props) => {
  const { themeMode } = useTheme();
  const [receiverGarments, setReceiverGarments] = useState<Garment[]>([]);
  const [senderGarments, setSenderGarments] = useState<Garment[]>([]);

  useEffect(() => {
    setOferArray({ receiver: [], sender: [] });
  }, [setOferArray]);

  useEffect(() => {
    const { receiver, sender } = getInitialData(postId);
    setReceiverGarments(receiver);
    setSenderGarments(sender);
  }, [postId]);

  useEffect(() => {
    const selectedReceiver = receiverGarments.filter((g) => g.selected);
    const selectedSender = senderGarments.filter((g) => g.selected);
    setOferArray({
      receiver: selectedReceiver,
      sender: selectedSender,
    });
  }, [receiverGarments, senderGarments, setOferArray]);

  const getInitialData = (postId: number) => {
    const receiver = originalData.offerReceiverCloset.map((item) => ({
      ...item,
      selected: item.id === postId,
    }));

    const sender = originalData.offerSenderCloset.map((item) => ({
      ...item,
      selected: false,
    }));

    receiver.sort((a, b) => (a.id === postId ? -1 : b.id === postId ? 1 : 0));

    return { receiver, sender };
  };

  const toggleGarmentSelection = (
    type: "receiver" | "sender",
    index: number
  ) => {
    if (type === "receiver") {
      const updated = [...receiverGarments];
      const garment = updated[index];

      if (garment.id === postId) return;

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
    <div className="flex flex-col h-full">
      {/* Receive */}
      <div
        className={`${
          themeMode === "light" ? "border-black/10" : "border-white/10"
        } border rounded-lg p-4 overflow-y-auto md:flex-[1_1_50%] min-h-0`}
      >
        <div className="flex w-full justify-between items-center">
          <p className="font-bold text-[1.2em]">You will receive</p>
          <p className="opacity-50 text-sm">{selectedCountReceiver} Garments</p>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {receiverGarments.map((garment, index) => (
            <div
              key={garment.id}
              className={`${
                themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#2A2B2A]"
              } flex justify-between w-full items-center p-4 rounded-lg gap-4 truncate ${
                garment.id === postId
                  ? "cursor-default opacity-80"
                  : "cursor-pointer"
              }`}
              onClick={() =>
                garment.id !== postId &&
                toggleGarmentSelection("receiver", index)
              }
            >
              <div className="flex gap-4 h-full max-w-full truncate">
                <img
                  src={garment.mainImage}
                  alt="garment"
                  className="w-20 aspect-square object-cover rounded-md"
                />
                <div className="flex flex-col justify-center">
                  <p className="font-bold text-[#E5D04B]">
                    {garment.condition}
                  </p>
                  <div className="mt-2">
                    <p className="font-bold truncate">{garment.name}</p>
                    <p className="opacity-50 truncate">
                      {garment.color} | {garment.size} | {garment.brand}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div
                  className={`${
                    garment.selected
                      ? themeMode === "light"
                        ? "bg-[#0DBC73] text-white"
                        : "bg-[#0DBC73] text-black"
                      : themeMode === "light"
                      ? "bg-white"
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
            themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#2A2B2A]"
          } p-2 aspect-square flex items-center justify-center rounded-full`}
          style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
        >
          <Icon path={mdiSwapHorizontalHidden} size={1} className="rotate-90" />
        </div>
      </div>
      {/* Send */}
      <div
        className={`${
          themeMode === "light" ? "border-black/10" : "border-white/10"
        } border rounded-lg p-4 overflow-y-auto md:flex-[1_1_50%] min-h-0`}
      >
        <div className="flex w-full justify-between items-center gap-4">
          <p className="font-bold text-[1.2em] truncate">
            Select Garments From Your Closet
          </p>
          <p className="opacity-50 text-sm whitespace-nowrap">
            {selectedCountSender} Garments
          </p>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {senderGarments.map((garment, index) => (
            <div
              key={garment.id}
              className={`${
                themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#2A2B2A]"
              } flex justify-between w-full items-center p-4 rounded-lg gap-4 cursor-pointer`}
              onClick={() => toggleGarmentSelection("sender", index)}
            >
              <div className="flex gap-4 h-full truncate">
                <img
                  src={garment.mainImage}
                  alt="garment"
                  className="w-20 aspect-square object-cover rounded-md"
                />
                <div className="flex flex-col justify-center w-full">
                  <p className="font-bold text-[#E5D04B]">
                    {garment.condition}
                  </p>
                  <div className="mt-2">
                    <p className="font-bold truncate">{garment.name}</p>
                    <p className="opacity-50 truncate">
                      {garment.color} | {garment.size} | {garment.brand}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex">
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
