import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";

type RegisterProps = {
  userName: string;
  setUserName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
};

export const Register = ({
  userName,
  setUserName,
  email,
  setEmail,
  password,
  setPassword,
}: RegisterProps) => {
  const { t } = useTranslation();
  const { themeMode } = useTheme();

  return (
    <div className="flex flex-col gap-4">
      <p className="text-[1.4em] font-bold py-2 text-start">
        {t("login.create_account")}
      </p>
      <input
        type="text"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        placeholder="@Username"
        className={`${
          themeMode === "light"
            ? "bg-[#F7F7F7] text-black border-black/5 "
            : "bg-[#323332] text-white border-white/5 "
        } text-[16px] md:text-[1em] p-3 rounded-xl w-full focus:outline-none border`}
      />
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
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder={t("mainLayout.password")}
        className={`${
          themeMode === "light"
            ? "bg-[#F7F7F7] text-black border-black/5 "
            : "bg-[#323332] text-white border-white/5 "
        } text-[16px] md:text-[1em] p-3 rounded-xl w-full focus:outline-none border`}
      />
    </div>
  );
};
