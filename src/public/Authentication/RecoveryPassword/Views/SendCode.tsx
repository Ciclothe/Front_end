import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";

type SendCodeProps = {
  email: string;
  setEmail: (email: string) => void;
};

export const SendCode = ({ email, setEmail }: SendCodeProps) => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-start justify-center w-full gap-4">
      <div className="text-start">
        <p className="font-bold text-[1.4em]">
          {t("mainLayout.reset_password")}
        </p>
        <p className="opacity-50">
          {t("mainLayout.enter_email_to_receive_code")}
        </p>
      </div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t("mainLayout.email")}
        className={`${
          themeMode === "light"
            ? "bg-[#F7F7F7] text-black border-black/5 "
            : "bg-[#323332] text-white border-white/5 "
        } text-[16px] md:text-[1em] p-3 rounded-xl w-full focus:outline-none border`}
      />
    </div>
  );
};
