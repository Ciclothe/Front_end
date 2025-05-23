import Icon from "@mdi/react";
import { mdiEmailOutline } from "@mdi/js";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";

type OtpStepProps = {
  email: string;
  otp: string[];
  setOtp: (otp: string[]) => void;
};

export const OtpStep = ({ email, otp, setOtp }: OtpStepProps) => {
  const { themeMode } = useTheme();
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    const newOtp = [...otp];
    if (/^[A-Za-z0-9]$/.test(value)) {
      newOtp[index] = value.toUpperCase();
      setOtp(newOtp);
      if (index < 3) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const key = e.key;

    if (key === "Backspace") {
      const newOtp = [...otp];

      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        newOtp[index - 1] = "";
        setOtp(newOtp);
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    } else if (key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-6">
      {/* ✅ Confirmation Banner */}
      <div className="flex justify-between items-center p-5 rounded-2xl bg-[rgba(13,188,115,0.05)]">
        <div className="flex items-center">
          <div
            className="p-3 rounded-full mr-5 flex items-center justify-center"
            style={{ backgroundColor: "rgba(13,188,115,0.1)" }}
          >
            <Icon path={mdiEmailOutline} className="h-7 text-[#0DBC73]" />
          </div>
          <div className="text-start">
            <p className="font-bold text-[1.2em] text-[#0DBC73]">
              {t("mainLayout.email_sent_successfully")}
            </p>
            <p className="opacity-80">
              {t("mainLayout.email_sent_message", { email })}
            </p>
          </div>
        </div>
      </div>

      {/* 🔢 OTP Inputs */}
      <div className="flex gap-3">
        {[0, 1, 2, 3].map((i) => (
          <input
            key={i}
            ref={(el) => (inputRefs.current[i] = el)}
            type="text"
            maxLength={1}
            value={otp[i]}
            onChange={(e) => handleChange(e.target.value, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`${
              themeMode === "light" ? "bg-white" : "bg-[#1f1f1f]"
            } w-14 h-14 text-center text-2xl font-bold border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0DBC73]`}
          />
        ))}
      </div>

      {/* ⏱️ Resend code */}
      <div className="text-sm text-center">
        {timer > 0 ? (
          <p className="opacity-50">
            {t("mainLayout.resend_code_in", { count: timer })}
          </p>
        ) : (
          <button
            onClick={handleResend}
            className="text-[#0DBC73] font-semibold hover:underline"
          >
            {t("mainLayout.resend_code")}
          </button>
        )}
      </div>
    </div>
  );
};
