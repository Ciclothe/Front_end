import { useTheme } from "@/context/ThemeContext";
import { LanguageSwitch } from "@/components/Common/LanguageSwitch";
import { useNavigate } from "react-router-dom";
import { Imagotipo } from "../../../../public/Logos/Imagotipo";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { SendCode } from "./Views/SendCode";
import { OtpStep } from "./Views/OtpStep";
import { NewPassword } from "./Views/NewPassword";

export const RecoveryPassword = () => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>([]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isStep1Valid = email.trim() !== "";
  const isStep2Valid = otp.join("") === "1234";
  const passwordConditions = {
    length: newPassword.length >= 8,
    upper: /[A-Z]/.test(newPassword),
    lower: /[a-z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword),
    match: newPassword === confirmPassword && confirmPassword.length > 0,
  };
  const isStep3Valid = Object.values(passwordConditions).every(Boolean);

  const handleNext = () => {
    if (step === 1 && isStep1Valid) {
      console.log("Send email code to:", email);
      setStep(2);
    } else if (step === 2 && isStep2Valid) {
      console.log("Validate OTP:", otp.join(""));
      setStep(3);
    } else if (step === 3 && isStep3Valid) {
      console.log(
        "Reset password for:",
        email,
        "with new password:",
        newPassword
      );
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate("/signIn");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-10">
      <div className="absolute right-2 top-2 z-20">
        <LanguageSwitch
          showPlanetIcon={false}
          showTitle={false}
          backgroundColor={themeMode === "light" ? "#FFFFFF" : "#121212"}
          hoverColor={themeMode === "light" ? "#E2E2E2" : "#323332"}
          selectedColor={themeMode === "light" ? "#E2E2E2" : "#323332"}
        />
      </div>

      <div
        className={`${
          themeMode === "light" ? "bg-white" : "bg-[#222423]"
        } md:rounded-3xl flex justify-center flex-col gap-4 h-full md:h-fit p-4 relative w-full md:w-fit md:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%] shadow-lg`}
      >
        <div
          className="relative flex items-center justify-start cursor-pointer"
          onClick={() => navigate("/signIn")}
        >
          <Imagotipo height={"3em"} color={"#0DBC73"} />
        </div>
        <div
          className="relative flex items-center justify-center mb-10 md:hidden cursor-pointer"
          onClick={() => navigate("/signIn")}
        >
          <Imagotipo height={"4em"} color={"#0DBC73"} />
        </div>

        {step === 1 && <SendCode email={email} setEmail={setEmail} />}
        {step === 2 && <OtpStep email={email} otp={otp} setOtp={setOtp} />}
        {step === 3 && (
          <NewPassword
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
        )}

        <div
          className={`${themeMode === "light" ? "text-white" : "text-black"} ${
            (step === 1 && !isStep1Valid) ||
            (step === 2 && !isStep2Valid) ||
            (step === 3 && !isStep3Valid)
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          } bg-[#0DBC73] font-semibold px-5 py-3 w-full rounded-xl text-center`}
          onClick={() => {
            if (
              (step === 1 && isStep1Valid) ||
              (step === 2 && isStep2Valid) ||
              (step === 3 && isStep3Valid)
            ) {
              handleNext();
            }
          }}
        >
          {step === 1 && t("mainLayout.send_code")}
          {step === 2 && t("mainLayout.verify_code")}
          {step === 3 && t("mainLayout.reset_password")}
        </div>

        <div
          className={`${
            themeMode === "light" ? "text-black" : "text-white"
          } font-semibold px-5 py-3 w-full text-center cursor-pointer`}
          onClick={handleBack}
        >
          {t("mainLayout.back")}
        </div>
      </div>
    </div>
  );
};
