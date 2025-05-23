import { Icon } from "@mdi/react";
import { mdiWhiteBalanceSunny, mdiMoonWaningCrescent } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";

const ThemeToggleSwitch: React.FC = () => {
  const { themeMode } = useTheme();

  return (
    <div
      className={`${
        themeMode === "dark" ? "bg-[#313131]" : "bg-[#F7F7F7]"
      } rounded-full p-0.5 flex items-center cursor-pointer`}
    >
      <div
        className={`flex ${
          themeMode === "light" ? "bg-black" : "bg-none"
        } rounded-full justify-center py-1 px-2 ${
          themeMode === "dark" ? "ml-auto" : "mr-auto"
        }`}
      >
        <Icon path={mdiWhiteBalanceSunny} className="text-white" size={0.7} />
      </div>
      <div
        className={`flex ${
          themeMode === "dark" ? "bg-white" : "bg-none"
        } rounded-full justify-center py-1 px-2 ${
          themeMode === "light" ? "mr-auto" : "ml-auto"
        }`}
      >
        <Icon
          path={mdiMoonWaningCrescent}
          size={0.7}
          className="text-black"
          style={{ transform: `rotate(-30deg)` }}
        />
      </div>
    </div>
  );
};

export default ThemeToggleSwitch;
