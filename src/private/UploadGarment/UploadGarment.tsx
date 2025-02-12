import { useState } from "react";
import { GarmentInformation } from "./Step1";
import "./UploadGarment.css";

export const UploadGarment = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const goToNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  return (
    <div className="upload-garment-content">
      <h1 className="font-bold">Sube tu prenda</h1>
      {currentStep === 1 && <GarmentInformation goToNextStep={goToNextStep} />}
    </div>
  );
};
