import { Icon } from "@mdi/react";
import {
  mdiAlertCircle,
  mdiChevronRight,
  mdiClose,
  mdiSwapHorizontalHidden,
} from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useModal } from "@/context/ModalContext";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import { useAlert } from "@/context/AlertContext";
import PressAndHoldButton from "./Components/PressAndHoldButton";
import { useNavigate } from "react-router-dom";

const offerSwapData = {
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
      color: "purple",
      size: "L",
      brand: "Puma",
      mainImage:
        "https://images1.vinted.net/t/02_00314_eGXMszKxuYWKCdVtu1AS4H4w/f800/1743443816.jpeg?s=c8f670a12fb13ef62847dc60113e3fb61546e874",
    },
  ],
  offerSenderCloset: [
    {
      id: 1,
      title: "Essentials fear of God",
      token: "cG9zdC0xMjM=",
      condition: "new",
      color: "Caqui",
      size: "L",
      brand: "Essentials",
      mainImage:
        "https://images1.vinted.net/t/04_000ca_x3XdW621URwVKT8kQHjgVBVm/f800/1744196832.jpeg?s=fdfeba230eb064d1f32a8871ab0d42e52e5b7a18",
    },
  ],
};

export const SwapOfferReceived = () => {
  const { goBack, openModal, closeModal } = useModal();
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { showAlert } = useAlert();

  const handleDeclineOffer = async () => {
    try {
      const success = await new Promise<boolean>((resolve) =>
        setTimeout(() => resolve(true), 5000)
      );

      if (success) {
        closeModal();
        showAlert("Has declinado la oferta de Swap", "warning");
      } else {
        showAlert(t("mainLayout.error_sending_offer"), "error");
      }
    } catch (error) {
      console.error(error);
      showAlert(t("mainLayout.connection_error"), "error");
    }
  };

  return (
    <div className="flex flex-col h-full w-full md:max-h-[80vh] gap-4">
      <div className="relative flex justify-center items-center h-10">
        {/* Botón cerrar a la izquierda */}
        <div
          className={`absolute left-0 ${
            themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#222423]"
          } p-1 rounded-full cursor-pointer w-fit`}
          onClick={goBack}
        >
          <Icon path={mdiClose} size={1} />
        </div>

        {/* Texto centrado */}
        <p className="text-center text-[1.2em] font-bold">
          {t("mainLayout.new_swap_offer")}
        </p>
      </div>

      <div className="flex flex-col flex-grow overflow-hidden">
        {/* Receive */}
        <div
          className={`rounded-2xl p-4 overflow-y-auto border md:flex-1 min-h-0 ${
            themeMode === "light"
              ? "bg-[#F7F7F7] border-black/5"
              : "bg-[#222423] border-white/5"
          }`}
        >
          <div className="flex justify-between items-center">
            <p className="font-semibold text-[1.1em]">
              {t("mainLayout.you_will_receive")}
            </p>
            <p className="opacity-50 text-sm">
              {offerSwapData?.offerReceiverCloset.length}{" "}
              {offerSwapData?.offerReceiverCloset.length
                ? t("mainLayout.garment")
                : t("mainLayout.garment_plural")}
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {offerSwapData?.offerReceiverCloset.map((garment) => (
              <div
                key={garment.id}
                className={`${
                  themeMode === "light" ? "bg-white" : "bg-[#121212]"
                } flex justify-between w-full items-center p-4 rounded-lg gap-4 truncate`}
              >
                <div className="flex gap-4 h-full max-w-full truncate">
                  <img
                    src={garment.mainImage}
                    alt="garment"
                    className="w-20 aspect-square object-cover rounded-md"
                  />
                  <div className="flex flex-col justify-center">
                    <p className="font-bold text-[#E5D04B]">
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
                <p
                  className="text-[#0DBC73] flex-shrink-0 font-semibold cursor-pointer"
                  onClick={() => {
                    openModal(garment.token, "details");
                  }}
                >
                  {t("mainLayout.details")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex justify-center items-center -mt-2 -mb-2 z-20">
          <div
            className={`p-2 aspect-square flex items-center justify-center rounded-full ${
              themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#222423]"
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
              ? "bg-[#F7F7F7] border-black/5"
              : "bg-[#222423] border-white/5"
          }`}
        >
          <div className="flex justify-between items-center gap-4">
            <p className="font-semibold text-[1.1em] truncate">
              {t("mainLayout.you_will_give")}
            </p>
            <p className="opacity-50 text-sm">
              {offerSwapData?.offerSenderCloset.length}{" "}
              {offerSwapData?.offerSenderCloset.length
                ? t("mainLayout.garment")
                : t("mainLayout.garment_plural")}
            </p>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {offerSwapData?.offerSenderCloset.map((garment) => (
              <div
                key={garment.id}
                className={`${
                  themeMode === "light" ? "bg-white" : "bg-[#121212]"
                } flex justify-between w-full items-center p-4 rounded-lg gap-4 truncate`}
              >
                <div className="flex gap-4 h-full max-w-full truncate">
                  <img
                    src={garment.mainImage}
                    alt="garment"
                    className="w-20 aspect-square object-cover rounded-md"
                  />
                  <div className="flex flex-col justify-center">
                    <p className="font-bold text-[#E5D04B]">
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
                <p
                  className="text-[#0DBC73] flex-shrink-0 font-semibold cursor-pointer"
                  onClick={() => {
                    openModal(garment.token, "details");
                  }}
                >
                  {t("mainLayout.details")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer fijo */}
      <div className="flex-shrink-0 space-y-4">
        {/* Notificación de counteroffer */}
        <div
          className={`${
            themeMode === "light"
              ? "bg-[#F7F7F7] text-black"
              : "bg-[#222423] text-white"
          } rounded-2xl flex flex-col gap-4 w-full overflow-hidden`}
        >
          {/* User Rating */}
          <div>
            <div
              className={`${
                themeMode === "light"
                  ? "hover:bg-[#e2e2e2]"
                  : "hover:bg-[#323332]"
              } flex items-center justify-between cursor-pointer p-4`}
            >
              <div className="flex items-center gap-2">
                <Avatar
                  variant="rounded"
                  src={offerSwapData?.offerMadeBy?.profilePicture}
                  className="h-full aspect-square"
                />
                <div>
                  <p className="font-bold">
                    @{offerSwapData?.offerMadeBy?.username}
                  </p>
                  <div className="flex gap-1 items-center">
                    <Stack spacing={1}>
                      <Rating
                        name="half-rating"
                        defaultValue={offerSwapData?.offerMadeBy?.ranting}
                        precision={0.5}
                        readOnly
                        style={{
                          color: "#0DBC73",
                          fontSize: "1.2em",
                        }}
                      />
                    </Stack>
                    <p className="opacity-50">
                      {offerSwapData?.offerMadeBy?.totalRantings}
                    </p>
                  </div>
                </div>
              </div>
              <div className="opacity-50">
                <Icon path={mdiChevronRight} size={1} />
              </div>
            </div>
            <hr className="opacity-10" />
          </div>
          <div className="px-4 pb-4 flex flex-col gap-4">
            <div className="flex gap-4">
              <div>
                <Icon path={mdiAlertCircle} size={1} />
              </div>
              <p>
                {t("mainLayout.counteroffer_reminder")}{" "}
                <span className="font-semibold">
                  @{offerSwapData?.offerMadeBy?.username}
                </span>{" "}
                {t("mainLayout.his_closet")}
              </p>
            </div>
            <div
              className={`${
                themeMode === "light"
                  ? "bg-[#EBEBEB] hover:bg-black hover:text-white"
                  : "bg-[#2A2B2A] hover:bg-white hover:text-black"
              } px-5 py-2 w-full rounded-full flex items-center justify-center font-bold transition-all duration-300 cursor-pointer`}
              onClick={() => {
                openModal(offerSwapData?.token, "swap", "counterOffer");
              }}
            >
              <p>{t("mainLayout.counteroffers")}</p>
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-col-reverse md:flex-row items-center gap-4">
          <PressAndHoldButton
            buttonText={"decline_offer"}
            duration={3000}
            onCompleteHold={() => handleDeclineOffer()}
            bgGeneralColor={"transparent"}
            progressBgColor="rgba(188,13,13,1)"
            textColor={themeMode === "light" ? "black" : "white"}
            textColorOnHold={themeMode === "light" ? "white" : "black"}
          />
          <PressAndHoldButton
            buttonText={"accept_offer"}
            duration={3000}
            onCompleteHold={() => {
              if (offerSwapData?.token) {
                navigate(
                  `/swaps/offer/accepted/${offerSwapData.token}/summary`
                );
              } else {
                console.warn("No token found in offerSwapData");
              }
            }}
            bgGeneralColor={"rgba(13,188,115,0.1)"}
            progressBgColor="rgba(13,188,115,1)"
            textColor={"rgba(13,188,115,1)"}
            textColorOnHold={themeMode === "light" ? "white" : "black"}
          />
        </div>
      </div>
    </div>
  );
};
