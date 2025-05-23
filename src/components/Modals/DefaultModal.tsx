import { useTheme } from "@/context/ThemeContext";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export const DefaultModal = ({ onClose, children }: Props) => {
  const { themeMode } = useTheme();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/5 backdrop-blur-xs z-[200] flex items-start md:items-center justify-center"
      onClick={onClose}
    >
      <div
        className={`${
          themeMode === "light" ? "bg-[#F7F7F7]" : "bg-[#121212]"
        } text-start overflow-x-hidden md:rounded-3xl px-4 pb-4 md:pb-0 w-full md:w-[70vw] lg:w-[60vw] xl:w-[50vw] 2xl:w-[50vw] flex flex-col overflow-y-auto h-full md:h-fit`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};
