import { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
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
  actions?: React.ReactNode | React.ReactNode[];
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
  const body = document.body;

  useEffect(() => {
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = "";
    };
  });

  const renderIcon = (icon: string | JSX.Element) =>
    typeof icon === "string" ? <Icon path={icon} size={1} /> : icon;

  const [{ y }, api] = useSpring(() => ({ y: 0 }));

  const bind = useDrag(
    ({ last, movement: [, my] }) => {
      if (my < 0) return; // Solo hacia abajo
      if (last) {
        if (my > 100) {
          api.start({ y: 500, onRest: () => setIsOpen(false) }); // animación hacia abajo y cierre
        } else {
          api.start({ y: 0 }); // vuelve al centro
        }
      } else {
        api.start({ y: my, immediate: true });
      }
    },
    { from: () => [0, y.get()], axis: "y", filterTaps: true }
  );

  const MenuContent = () => (
    <div
      className={`rounded-2xl w-full overflow-hidden ${backgroundClass}`}
      style={shadowStyle}
    >
      <div className="md:hidden py-5 flex items-center justify-center cursor-pointer">
        <hr className="border-2 w-15 rounded" />
      </div>
      {header && <div>{header}</div>}
      {actions && (
        <div
          className={`flex w-full items-between ${
            Array.isArray(actions) ? "flex-col w-full" : ""
          }`}
        >
          {Array.isArray(actions) ? (
            actions.map((action, i) => (
              <div key={i} className="w-full">
                {action}
              </div>
            ))
          ) : (
            <div className="w-full">{actions}</div>
          )}
        </div>
      )}
      {options.map((option, index) => (
        <OptionItem
          key={index}
          label={option.label}
          icon={renderIcon(option.icon)}
          onClick={() => {
            body.style.overflow = "";
            setIsOpen(false);
            option.onClick?.();
          }}
        />
      ))}
      {footer && <div>{footer}</div>}
    </div>
  );

  return (
    <ClickAwayListener
      onClickAway={() => {
        body.style.overflow = "";
        setIsOpen(false);
      }}
    >
      <div>
        {/* Mobile overlay */}
        <animated.div
          style={{
            backgroundColor: y.to(
              (val) => `rgba(0, 0, 0, ${0.4 - Math.min(val / 250, 0.4)})`
            ),
            backdropFilter: y.to(
              (val) => `blur(${8 - Math.min(val / 10, 8)}px)`
            ),
            WebkitBackdropFilter: y.to(
              (val) => `blur(${8 - Math.min(val / 10, 8)}px)`
            ),
          }}
          className="md:hidden fixed top-0 left-0 w-full h-full pb-5 px-4 z-[100] items-end flex"
          onClick={() => {
            body.style.overflow = "";
            setIsOpen(false);
          }}
        >
          <animated.div
            {...bind()}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-full touch-none"
            style={{ y }}
          >
            <MenuContent />
          </animated.div>
        </animated.div>

        {/* Desktop menu */}
        <div
          className={`hidden md:block absolute z-[1000] min-w-70 w-full transition-all duration-100 overflow-hidden rounded-2xl ${backgroundClass}
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
