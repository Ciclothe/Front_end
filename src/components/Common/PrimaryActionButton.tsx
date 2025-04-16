import { useTheme } from "@/context/ThemeContext";

interface PrimaryActionButtonProps {
  label: string;
  icon?: React.ReactNode;
  gap?: number;
  onClick?: () => void;
  disabled?: boolean;
}

const PrimaryActionButton: React.FC<PrimaryActionButtonProps> = ({
  label,
  icon,
  gap = 0.5,
  onClick = () => {},
  disabled = false,
}) => {
  const { themeMode } = useTheme();

  return (
    <div className={` py-2 pt-2`}>
      <div
        className={`px-5 py-2 w-full rounded-full flex items-center justify-center font-bold
           bg-[#0DBC73] transition-all duration-300
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
          ${
            !disabled
              ? themeMode === "light"
                ? "text-white"
                : "text-black"
              : "bg-[#0DBC73]/10 text-[#0DBC73]"
          }
          `}
        style={{ gap: `${gap}rem` }}
        onClick={!disabled ? onClick : undefined}
      >
        {icon && <span className="text-lg">{icon}</span>}
        <p>{label}</p>
      </div>
    </div>
  );
};

export default PrimaryActionButton;
