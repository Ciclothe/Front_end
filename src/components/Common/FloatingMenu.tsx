import { ClickAwayListener } from "@mui/material";
import { OptionItem } from "@/components/Common/OptionItem";
import { useTheme } from "@/context/ThemeContext";
import Icon from "@mdi/react";

interface FloatingMenuOption {
  label: string;
  icon: string | JSX.Element;
  onClick?: () => void;
}

interface FloatingMenuProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  options: FloatingMenuOption[];
  header?: React.ReactNode;
  actions?: React.ReactNode;
  footer?: React.ReactNode;
  position?: "top" | "bottom";
  align?: "left" | "right";
}

export const FloatingMenu: React.FC<FloatingMenuProps> = ({
  setIsOpen,
  options,
  header,
  actions,
  footer,
  position = "bottom",
  align = "right",
}) => {
  const { themeMode } = useTheme();

  const backgroundClass =
    themeMode === "light" ? "bg-white text-black" : "bg-[#222423] text-white";

  const shadowStyle = { boxShadow: "0px 4px 10px rgba(0,0,0,0.07)" };

  const renderIcon = (icon: string | JSX.Element) => {
    return typeof icon === "string" ? <Icon path={icon} size={1} /> : icon;
  };

  const MenuContent = () => (
    <div
      className={`rounded-2xl w-full overflow-hidden ${backgroundClass}`}
      style={shadowStyle}
    >
      <div
        className="md:hidden py-5 flex items-center justify-center cursor-pointer"
        onClick={() => setIsOpen(false)}
      >
        <hr className="border-2 w-15 rounded" />
      </div>
      {header && <div>{header}</div>}
      {actions && <div>{actions}</div>}
      {options.map((option, index) => (
        <OptionItem
          key={index}
          label={option.label}
          icon={renderIcon(option.icon)}
          onClick={() => {
            setIsOpen(false);
            option.onClick?.();
          }}
        />
      ))}
      {footer && <div>{footer}</div>}
    </div>
  );

  return (
    <ClickAwayListener onClickAway={() => setIsOpen(false)}>
      <div>
        {/* Mobile overlay */}
        <div
          className="md:hidden backdrop-blur-sm bg-black/40 fixed top-0 left-0 w-full h-full pb-5 px-2 z-[100] items-end flex"
          onClick={() => setIsOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full">
            <MenuContent />
          </div>
        </div>

        {/* Desktop menu */}
        <div
          className={`hidden md:block absolute z-10 min-w-70 w-full transition-all duration-100 overflow-hidden rounded-2xl ${backgroundClass}
            ${align === "right" ? "right-0" : "left-0"}
            ${position === "top" ? "bottom-full mb-3" : "top-full mt-3"}`}
          style={shadowStyle}
        >
          <MenuContent />
        </div>
      </div>
    </ClickAwayListener>
  );
};
