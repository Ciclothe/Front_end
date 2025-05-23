import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";
import Icon from "@mdi/react";
import { mdiCheckCircleOutline, mdiCloseCircleOutline } from "@mdi/js";

type NewPasswordProps = {
  newPassword: string;
  setNewPassword: (newPassword: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
};

export const NewPassword = ({
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
}: NewPasswordProps) => {
  const { t } = useTranslation();
  const { themeMode } = useTheme();

  const requirements = useMemo(
    () => ({
      minLength: newPassword.length >= 8,
      hasUppercase: /[A-Z]/.test(newPassword),
      hasLowercase: /[a-z]/.test(newPassword),
      hasNumber: /\d/.test(newPassword),
      hasSpecialChar: /[^A-Za-z0-9]/.test(newPassword),
      passwordsMatch: newPassword !== "" && newPassword === confirmPassword,
    }),
    [newPassword, confirmPassword]
  );

  const getColor = (condition: boolean) =>
    condition ? "text-[#0DBC73]" : "text-gray-400";

  return (
    <div className="flex flex-col items-start justify-center w-full gap-4">
      <div className="text-start">
        <p className="font-bold text-[1.4em]">
          {t("mainLayout.create_new_password")}
        </p>
        <p className="opacity-50">{t("mainLayout.password_instruction")}</p>
      </div>

      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder={t("mainLayout.new_password")}
        className={`${
          themeMode === "light"
            ? "bg-[#F7F7F7] text-black border-black/5 "
            : "bg-[#323332] text-white border-white/5 "
        } text-[16px] md:text-[1em] p-3 rounded-xl w-full focus:outline-none border`}
      />

      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder={t("mainLayout.confirm_password")}
        className={`${
          themeMode === "light"
            ? "bg-[#F7F7F7] text-black border-black/5 "
            : "bg-[#323332] text-white border-white/5 "
        } text-[16px] md:text-[1em] p-3 rounded-xl w-full focus:outline-none border`}
      />

      <ul className="text-sm mt-2 space-y-1">
        <li
          className={`flex items-center gap-2 ${getColor(
            requirements.minLength
          )}`}
        >
          <Icon
            path={
              requirements.minLength
                ? mdiCheckCircleOutline
                : mdiCloseCircleOutline
            }
            size={0.9}
          />
          {t("mainLayout.at_least_8_characters")}
        </li>
        <li
          className={`flex items-center gap-2 ${getColor(
            requirements.hasUppercase
          )}`}
        >
          <Icon
            path={
              requirements.hasUppercase
                ? mdiCheckCircleOutline
                : mdiCloseCircleOutline
            }
            size={0.9}
          />
          {t("mainLayout.at_least_one_uppercase")}
        </li>
        <li
          className={`flex items-center gap-2 ${getColor(
            requirements.hasLowercase
          )}`}
        >
          <Icon
            path={
              requirements.hasLowercase
                ? mdiCheckCircleOutline
                : mdiCloseCircleOutline
            }
            size={0.9}
          />
          {t("mainLayout.at_least_one_lowercase")}
        </li>
        <li
          className={`flex items-center gap-2 ${getColor(
            requirements.hasNumber
          )}`}
        >
          <Icon
            path={
              requirements.hasNumber
                ? mdiCheckCircleOutline
                : mdiCloseCircleOutline
            }
            size={0.9}
          />
          {t("mainLayout.at_least_one_number")}
        </li>
        <li
          className={`flex items-center gap-2 ${getColor(
            requirements.hasSpecialChar
          )}`}
        >
          <Icon
            path={
              requirements.hasSpecialChar
                ? mdiCheckCircleOutline
                : mdiCloseCircleOutline
            }
            size={0.9}
          />
          {t("mainLayout.at_least_one_special")}
        </li>
        <li
          className={`flex items-center gap-2 ${getColor(
            requirements.passwordsMatch
          )}`}
        >
          <Icon
            path={
              requirements.passwordsMatch
                ? mdiCheckCircleOutline
                : mdiCloseCircleOutline
            }
            size={0.9}
          />
          {t("mainLayout.passwords_match")}
        </li>
      </ul>
    </div>
  );
};
