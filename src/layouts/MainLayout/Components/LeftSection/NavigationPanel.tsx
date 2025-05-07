import { useTheme } from "@/context/ThemeContext";
import { useLocation, useNavigate } from "react-router-dom";
import { IconType } from "react-icons";
import { useState, useEffect } from "react";
import { NotificationBanner } from "@/components/Common/NotificationBanner";
import { ChatsBanner } from "@/components/Common/ChatsBanner";
import Tooltip from "@mui/material/Tooltip";

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
  const location = useLocation();
  const navigate = useNavigate();

  const [hovered, setHovered] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChats, setShowChats] = useState(false);
  const [activeIcon, setActiveIcon] = useState<string | null>(null);

  useEffect(() => {
    if (!showNotifications && !showChats) {
      const activeRoute = menuItems.find((item) =>
        location.pathname.startsWith(item.route)
      );
      if (activeRoute) {
        setActiveIcon(activeRoute.label);
      }
    }
  }, [location.pathname, showNotifications, menuItems, showChats]);

  const handleMouseEnter = (label: string) => {
    setHovered(label);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };

  const handleClick = (label: string, route: string) => {
    if (label === "notifications") {
      const shouldOpen = !showNotifications;
      setShowNotifications(shouldOpen);
      setShowChats(false);
      setActiveIcon(shouldOpen ? "notifications" : null);
    } else if (label === "chats") {
      const shouldOpen = !showChats;
      setShowChats(shouldOpen);
      setShowNotifications(false);
      setActiveIcon(shouldOpen ? "chats" : null);
    } else {
      setShowNotifications(false);
      setShowChats(false);
      setActiveIcon(label);
      navigate(route);
    }
  };

  return (
    <div
      className={`${
        themeMode === "light" ? "text-black" : "text-white"
      } mt-15 h-fit flex flex-col gap-4`}
    >
      {menuItems.map((item) => (
        <Tooltip
          title={<span className="capitalize">{item.label}</span>}
          placement="right"
          componentsProps={{
            tooltip: {
              sx: {
                backgroundColor: themeMode === "light" ? "black" : "white",
                color: themeMode === "light" ? "white" : "black",
                fontSize: "1em",
                borderRadius: "8px",
                padding: "6px 12px",
              },
            },
          }}
          key={item.label}
        >
          <div
            className={`text-[1.8em] font-bold py-[0.4em] w-fit p-2 aspect-square rounded-xl cursor-pointer flex justify-center items-center gap-6 transition-colors duration-300 ${
              hovered === item.label || activeIcon === item.label
                ? "text-[#0DBC73] bg-[#0DBC73]/[0.1]"
                : "hover:text-[#0DBC73]"
            }`}
            onMouseEnter={() => handleMouseEnter(item.label)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(item.label, item.route)}
          >
            {hovered === item.label || activeIcon === item.label ? (
              <item.iconFill size={30} />
            ) : (
              <item.iconOutline size={30} />
            )}
          </div>
        </Tooltip>
      ))}

      {showNotifications && (
        <NotificationBanner isOpen={setShowNotifications} />
      )}
      {showChats && <ChatsBanner isOpen={setShowChats} />}
    </div>
  );
};
