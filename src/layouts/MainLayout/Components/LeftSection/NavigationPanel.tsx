import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import { useState } from "react";
import { useCategoryTabs } from "@/context/CategoryTabsContext";

interface MenuItem {
  label: string;
  route: string;
  iconFill: IconType;
  iconOutline: IconType;
}

interface NavigationPanelProps {
  menuItems: MenuItem[];
}

export const NavigationPanel: React.FC<NavigationPanelProps> = ({
  menuItems,
}) => {
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);
  const { setShowTabs, setTabs } = useCategoryTabs();

  const handleMouseEnter = (label: string) => {
    setHovered(label);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handleClick = (route: string) => {
    setShowTabs(false);
    setTabs([]);

    navigate(route);
  };

  return (
    <div
      className={`${
        themeMode === "light" ? "text-black" : "text-white"
      } xl:mt-15 h-fit`}
    >
      {menuItems.map((item) => (
        <div
          key={item.label}
          className={`text-[1.8em] font-bold py-[0.4em] cursor-pointer flex items-center gap-6 transition-colors duration-300 ${
            location.pathname.startsWith(item.route) || hovered === item.label
              ? "text-[#0DBC73]"
              : "hover:text-[#0DBC73]"
          }`}
          onMouseEnter={() => handleMouseEnter(item.label)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(item.route)}
        >
          {location.pathname.startsWith(item.route) ||
          hovered === item.label ? (
            <item.iconFill size={30} />
          ) : (
            <item.iconOutline size={30} />
          )}
          <span>{t(`mainLayout.${item.label}`)}</span>
        </div>
      ))}
    </div>
  );
};
