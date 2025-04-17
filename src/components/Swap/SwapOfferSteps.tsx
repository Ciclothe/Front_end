import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { mdiDrawPen, mdiHanger } from "@mdi/js";
import Icon from "@mdi/react";
import { StepOne } from "./Steps/StepOne";
import { StepTwo } from "./Steps/StepTwo";
import PrimaryActionButton from "@/components/Common/PrimaryActionButton";
import OfferSubmitButton from "./Components/OfferSubmitButton";
import { useTranslation } from "react-i18next";

type Props = {
  postId: number;
};

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

export const SwapOfferSteps = ({ postId }: Props) => {
  const { themeMode } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [isNextButtonEnabled, setIsNextButtonEnabled] = useState(false);
  const { t } = useTranslation();

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
      // Simulación de un delay como si fuera una solicitud a la API
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula un retraso de 2 segundos

      // Respuesta simulada
      const simulatedResponse = { success: true }; // Cambia esto a false para probar el error

      // Lógica simulada de éxito o fracaso
      if (simulatedResponse.success) {
        return true; // Simula un post exitoso
      } else {
        return false; // Simula un post fallido
      }
    } catch (error) {
      console.error("Error en la simulación del post:", error);
      return false; // Retorna false si ocurre un error
    }
  };

  return (
    <div className="w-full gap-4 flex flex-col md:max-h-[80vh]">
      {/* HEADER DE PASOS */}
      <div
        className={`${
          themeMode === "light" ? "bg-white" : "bg-[#222423]"
        } flex w-full justify-center py-2 z-10`}
      >
        {steps.map((step, index) => (
          <div key={index} className="flex items-center text-center relative">
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

      {/* COMPONENTES DE CADA PASO */}
      <div className="flex flex-col flex-grow h-[60vh] overflow-y-auto">
        {currentStep === 0 ? (
          <StepOne postId={postId} setOferArray={setOffer} />
        ) : (
          <StepTwo />
        )}
      </div>

      {/* BOTÓN DE AVANZAR A PASO 2 */}
      {currentStep === 0 ? (
        <PrimaryActionButton
          label="next"
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={!isNextButtonEnabled}
        />
      ) : (
        <>
          <OfferSubmitButton postData={postData} />
          <div>
            <p className="text-sm">
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
              {t("mainLayout.digital_signature_notice")}
            </p>
          </div>
        </>
      )}
    </div>
  );
};
