import { useState } from "react";
import { FloatingMenu } from "@/components/Common/FloatingMenu";
import Icon from "@mdi/react";
import { mdiHandshake, mdiPlus } from "@mdi/js";
import { useTheme } from "@/context/ThemeContext";
import { PiSwapFill } from "react-icons/pi";

const options = [
  // {
  //   label: "create_post",
  //   icon: <Icon path={mdiCards} size={1} />,
  // },
  {
    label: "create_swap",
    icon: <PiSwapFill size={20} />,
  },
  {
    label: "create_event",
    icon: <Icon path={mdiHandshake} size={1} />,
  },
];

export const PostCreationModule = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { themeMode } = useTheme();

  return (
    <div className="relative mt-20">
      {isOpen && (
        <FloatingMenu
          setIsOpen={setIsOpen}
          options={options}
          position="top"
          align="left"
        />
      )}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${
          themeMode === "light" ? "text-white" : "text-black"
        } aspect-square bg-[#0DBC73] w-fit p-[0.8em] rounded-xl relative z-10 transition-transform duration-200`}
      >
        <Icon path={mdiPlus} size={1.2} />
      </button>
    </div>
  );
};
