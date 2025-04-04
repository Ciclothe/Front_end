import { useState } from "react";
import { FloatingMenu } from "@/components/Common/FloatingMenu";
import { mdiAllInclusive, mdiCards, mdiHandshake, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";
import { useTheme } from "@/context/ThemeContext";

const options = [
  { label: "create_post", icon: mdiCards },
  { label: "create_swap", icon: mdiAllInclusive },
  { label: "create_event", icon: mdiHandshake },
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
        } aspect-square bg-[#0DBC73] w-fit p-[0.8em] rounded-full relative z-10 transition-transform duration-200`}
      >
        <Icon path={mdiPlus} size={1.2} />
      </button>
    </div>
  );
};
