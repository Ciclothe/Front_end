import ThemeToggleSwitch from "@/components/Common/ThemeToggleSwitch";
import { Icon } from "@mdi/react";
import { mdiBrightness6 } from "@mdi/js";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { t } = useTranslation();
  const { toggleMode } = useTheme();

  return (
    <div
      className="flex items-center justify-between p-4 cursor-pointer"
      onClick={toggleMode}
    >
      <div className="flex items-center gap-4">
        <Icon path={mdiBrightness6} size={1} />
        <p className="font-semibold">{t("mainLayout.theme_mode")}</p>
      </div>
      <ThemeToggleSwitch />
    </div>
  );
};

export default ThemeToggle;
