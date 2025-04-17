import { Icon } from "@mdi/react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";

interface OptionItemProps {
  label: string;
  icon: string | JSX.Element;
  onClick?: () => void;
}

export const OptionItem: React.FC<OptionItemProps> = ({
  label,
  icon,
  onClick,
}) => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();

  const renderIcon = () => {
    if (typeof icon === "string") {
      return <Icon path={icon} size={1} />;
    }
    return icon;
  };

  return (
    <div
      className={`${
        themeMode === "light" ? "hover:bg-[#F7F7F7]" : "hover:bg-[#313131]"
      } flex items-center gap-4 p-4 cursor-pointer transition`}
      onClick={onClick}
    >
      {renderIcon()}
      <p className="font-semibold whitespace-nowrap">
        {t(`mainLayout.${label}`)}
      </p>
    </div>
  );
};
