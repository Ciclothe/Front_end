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
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[200] flex items-start md:items-center justify-center"
      onClick={onClose}
    >
      <div
        className={`${
          themeMode === "light" ? "bg-white" : "bg-[#121212]"
        } text-start overflow-x-hidden md:rounded-2xl p-2 md:p-4 w-full md:w-[70vw] lg:w-[60vw] xl:w-[50vw] 2xl:w-[50vw] flex flex-col gap-4 overflow-y-auto h-full md:h-fit`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};
