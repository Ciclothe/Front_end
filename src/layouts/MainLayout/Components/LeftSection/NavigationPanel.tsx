import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";

interface MenuItem {
  label: string;
  route: string;
}

interface NavigationPanelProps {
  menuItems: MenuItem[];
}

export const NavigationPanel: React.FC<NavigationPanelProps> = ({
  menuItems,
}) => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();

  return (
    <div
      className={`${
        themeMode === "light" ? "text-black" : "text-white"
      } xl:mt-20 h-fit`}
    >
      {menuItems.map((item) => (
        <div
          key={item.label}
          className="text-[1.8em] font-bold py-2 cursor-pointer"
        >
          {t(`mainLayout.${item.label}`)}
        </div>
      ))}
    </div>
  );
};
