import { Icon } from "@mdi/react";
import { mdiCheckBold, mdiSwapHorizontalHidden, mdiArrowLeft } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useModal } from "@/context/ModalContext";
import { useEffect, useState } from "react";
import { useAlert } from "@/context/AlertContext";
import CircularProgress from "@mui/material/CircularProgress";
import { conditionColors } from "@/components/Utils/format";
import { useNavigate } from "react-router-dom";

type Garment = {
  id: number;
  title: string;
  condition: string;
  color: string;
  size: string;
  brand: string;
  selected: boolean;
  mainImage: string;
  token: string;
};

const offerSwapData = [
  {
    token: "cGe2aa0fMjM=",
    offerMadeBy: {
      id: 1,
      username: "lielcita1230",
      ranting: 4.5,
      totalRantings: 20,
      profilePicture:
        "https://i.pinimg.com/736x/3f/4f/e9/3f4fe92639ea9d5980ef1760212e7b86.jpg",
    },
    offerReceiverCloset: [
      {
        id: 1,
        token: "cf62aa0fMjM=",
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
      {
        id: 3,
        token: "sa4gY49710d=",
        title: "Tennis nike",
        condition: "as_new",
        color: "White",
        size: "38",
        brand: "Nike",
        selected: false,
        mainImage:
          "https://images1.vinted.net/t/04_00351_rSfJPwof4gycFPwsTq8Vav8f/f800/1745137478.jpeg?s=d3025eb459ae032d453690b70e829d02c74cc061",
      },
    ],
    offerSenderCloset: [
      {
        id: 1,
        title: "Essentials fear of God",
        token: "X9WL32TVKMZPR8A6UFQYC7NJE",
        condition: "new",
        color: "Caqui",
        size: "L",
        brand: "Essentials",
        mainImage:
          "https://images1.vinted.net/t/04_000ca_x3XdW621URwVKT8kQHjgVBVm/f800/1744196832.jpeg?s=fdfeba230eb064d1f32a8871ab0d42e52e5b7a18",
      },
    ],
  },
];

export const SwapCounterOffer = () => {
  const { closeModal, params, popContent } = useModal();
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const [receiverGarments, setReceiverGarments] = useState<Garment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const token = params?.token;
  const data = offerSwapData.find((e) => e.token === token);

  useEffect(() => {
    const data = offerSwapData.find((e) => e.token === token);
    if (data) setReceiverGarments(data.offerReceiverCloset);
  }, [token]);

  const toggleGarmentSelection = (token: string) => {
    const updated = receiverGarments.map((garment) =>
      garment.token === token
        ? { ...garment, selected: !garment.selected }
        : garment
    );
    setReceiverGarments(updated);
  };

  const handleSendCounteroffer = async () => {
    if (!data) return;
    setIsLoading(true);

    // const counterOffer = {
    //   token: data.token,
    //   offerSenderCloset: data.offerSenderCloset,
    //   offerReceiverCloset: receiverGarments.filter((g) => g.selected),
    // };

    try {
      const success = await new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(true), 5000)
      );

      if (success) {
        closeModal();
        showAlert("Contra oferta enviada exitosamente", "success");
        navigate("/"); // Redirige a la ruta base
      } else {
        showAlert(t("mainLayout.error_sending_offer"), "error");
      }
    } catch (error) {
      console.error(error);
      showAlert(t("mainLayout.connection_error"), "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full md:max-h-[80vh] md:pb-4">
      {/* HEADER */}
      <div className="flex items-center justify-between py-4">
        <div
          className={`${
            themeMode === "light" ? "bg-[#EDEDED]" : "bg-[#222423]"
          } p-2 rounded-full cursor-pointer`}
          onClick={popContent}
        >
          <Icon path={mdiArrowLeft} size={1} />
        </div>

        <p className="flex-1 text-center text-[1.2em] font-bold">
          {t("mainLayout.counteroffers")}
        </p>

        {/* Espacio invisible del mismo tamaño que el botón para balancear */}
        <div className="p-2 invisible">
          <Icon path={mdiArrowLeft} size={1} />
        </div>
      </div>

      <div className="flex flex-col flex-grow overflow-hidden">
        {/* Receive */}
        <div
          className={`rounded-2xl p-4 border overflow-y-auto md:flex-1 min-h-0 ${
            themeMode === "light"
              ? "bg-white border-black/5"
              : "bg-[#222423] border-white/5"
          }`}
        >
          <div className="flex justify-between items-center">
            <p className="font-semibold text-[1.1em]">
              {t("mainLayout.you_will_receive")}
            </p>
            <p className="opacity-50 text-md">
              {receiverGarments.filter((g) => g.selected).length}{" "}
              {receiverGarments.filter((g) => g.selected).length === 1
                ? t("mainLayout.garment")
                : t("mainLayout.garment_plural")}
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {receiverGarments.map((garment) => (
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
                  toggleGarmentSelection(garment.token);
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

        {/* Divider */}
        <div className="flex justify-center items-center -mt-2 -mb-2 z-20">
          <div
            className={`p-2 aspect-square flex items-center justify-center rounded-full ${
              themeMode === "light" ? "bg-white" : "bg-[#222423]"
            }`}
            style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
          >
            <Icon
              path={mdiSwapHorizontalHidden}
              size={1}
              className="rotate-90"
            />
          </div>
        </div>

        {/* Send */}
        <div
          className={`rounded-2xl p-4 overflow-y-auto border md:flex-1 min-h-0 ${
            themeMode === "light"
              ? "bg-white border-black/5"
              : "bg-[#222423] border-white/5"
          }`}
        >
          <div className="flex justify-between items-center gap-4">
            <p className="font-semibold text-[1.1em] truncate">
              {t("mainLayout.you_will_give")}
            </p>
            <p className="opacity-50 text-md">
              {data?.offerSenderCloset.length}{" "}
              {data?.offerSenderCloset.length
                ? t("mainLayout.garment")
                : t("mainLayout.garment_plural")}
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {data?.offerSenderCloset.map((garment) => (
              <div
                key={garment.id}
                className={
                  "bg-[rgba(13,188,115,0.1)] text-[#0DBC73] border-[#0DBC73] flex justify-between border-2 w-full items-center p-4 rounded-lg gap-4 truncate cursor-pointer"
                }
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
                {/* <p
                  className="font-semibold text-[#0DBC73] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(garment.token, "details", {
                      state: { navigatedInternally: true },
                    });
                  }}
                >
                  {t("mainLayout.details")}
                </p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer fijo */}
      <div className="flex-shrink-0 space-y-4 mt-4">
        {/* Acciones */}
        <div
          className={`px-5 py-3 w-full rounded-xl flex items-center justify-center font-bold
           bg-[#0DBC73] transition-all duration-300
          ${
            !receiverGarments.filter((g) => g.selected).length
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }
          ${
            receiverGarments.filter((g) => g.selected).length
              ? themeMode === "light"
                ? "text-white"
                : "text-black"
              : "bg-[#0DBC73]/10 text-[#0DBC73]"
          }
          `}
          onClick={handleSendCounteroffer}
        >
          {isLoading ? (
            <CircularProgress
              size={20}
              sx={{ color: themeMode === "light" ? "white" : "black" }}
            />
          ) : (
            <p>{t("mainLayout.send_counteroffer")}</p>
          )}
        </div>
      </div>
    </div>
  );
};
