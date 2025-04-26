import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { mdiArrowLeft, mdiDrawPen, mdiHanger } from "@mdi/js";
import Icon from "@mdi/react";
import { StepOne } from "./Steps/StepOne";
import { StepTwo } from "./Steps/StepTwo";
import PrimaryActionButton from "@/components/Common/PrimaryActionButton";
import PressAndHoldButton from "./Components/PressAndHoldButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useModal } from "@/context/ModalContext";
import { useAlert } from "@/context/AlertContext";

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

const steps = [{ icon: mdiHanger }, { icon: mdiDrawPen }];

export const SwapOfferSteps = ({ token }: { token: string }) => {
  const { themeMode } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const { t } = useTranslation();
  const { closeModal } = useModal();
  const { showAlert } = useAlert();

  const navigate = useNavigate();

  const [offer, setOffer] = useState<{
    receiver: Garment[];
    sender: Garment[];
  }>({ receiver: [], sender: [] });

  useEffect(() => {
    setIsNextButtonEnabled(
      offer.sender.length > 0 && offer.receiver.length > 0
    );
  }, [offer]);

  // TODO: change this to a real API call
  const postData = async () => {
    console.log("Enviando datos de la oferta:", offer);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const simulatedResponse = { success: true };

      if (simulatedResponse.success) {
        closeModal();
        showAlert(t("mainLayout.offer_sent_successfully"), "success");
        return true;
      } else {
        showAlert(t("mainLayout.error_sending_offer"), "error");
        return false;
      }
    } catch (error) {
      console.error("Error en la simulación del post:", error);
      showAlert(t("mainLayout.connection_error"), "error");
      return false;
    }
  };

  return (
    <div className="w-full gap-4 flex flex-col h-full md:max-h-[80vh] overflow-hidden">
      {/* HEADER DE PASOS */}
      <div
        className={`${
          themeMode === "light" ? "bg-white" : "bg-[#121212]"
        } flex w-full items-center py-2 z-10 relative`}
      >
        {/* Flecha a la izquierda */}
        <div
          className={`${
            themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#222423]"
          } p-1 rounded-full cursor-pointer w-fit z-20`}
          onClick={() => {
            if (currentStep === 0) {
              navigate(-1);
            } else {
              setCurrentStep(currentStep - 1);
            }
          }}
        >
          <Icon path={mdiArrowLeft} size={1} />
        </div>

        {/* Pasos centrados */}
        <div className="flex-1 flex justify-center absolute left-0 right-0">
          <div className="flex items-center">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center text-center relative"
              >
                <button
                  onClick={() => {
                    if (index === 1 && !isNextButtonEnabled) return;
                    setCurrentStep(index);
                  }}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center 
              ${
                index === currentStep
                  ? "bg-[#0DBC73]/20 text-[#0DBC73] border-[#0DBC73]"
                  : index < currentStep
                  ? themeMode === "light"
                    ? "bg-[#0DBC73] text-white"
                    : "bg-[#0DBC73] text-black"
                  : themeMode === "light"
                  ? "bg-[#F9F9F9] text-black"
                  : "bg-[#323332] text-white"
              } transition-all duration-300`}
                >
                  <Icon path={step.icon} size={1} />
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`h-[2px] w-20 ${
                      index < currentStep
                        ? "bg-[#0DBC73]"
                        : themeMode === "light"
                        ? "bg-[#F9F9F9]"
                        : "bg-[#323332]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMPONENTES DE CADA PASO */}
      <div className="flex flex-col flex-grow overflow-y-auto">
        {currentStep === 0 ? (
          <StepOne token={token} setOferArray={setOffer} />
        ) : (
          <StepTwo />
        )}
      </div>

      <div className="pb-2">
        {/* BOTÓN DE AVANZAR A PASO 2 */}
        {currentStep === 0 ? (
          <PrimaryActionButton
            label="next"
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!isNextButtonEnabled}
          />
        ) : (
          <>
            <PressAndHoldButton
              buttonText={"press_to_send_offer"}
              duration={3000}
              onCompleteHold={postData}
              textColorOnHold={"rgba(13,188,115,1)"}
              textColor={themeMode === "light" ? "black" : "white"}
            />
            <div>
              <p className="text-md mt-2">
                <span
                  className={`${
                    themeMode === "light" ? "text-gray-500" : "text-gray-200"
                  }`}
                >
                  {t("mainLayout.by_sending_offer")}{" "}
                </span>
                <a
                  href="/terminos-y-condiciones"
                  className={`underline ${
                    themeMode === "light" ? "text-blue-800" : "text-blue-400"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("mainLayout.terms_and_conditions")}
                </a>{" "}
                <span
                  className={`${
                    themeMode === "light" ? "text-gray-500" : "text-gray-200"
                  }`}
                >
                  {t("mainLayout.digital_signature_notice")}
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
