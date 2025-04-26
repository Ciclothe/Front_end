import { useState, useRef, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";

type PressAndHoldButtonProps = {
  buttonText: string;
  duration: number;
  onCompleteHold: () => void;
  bgLightMode?: string;
  bgDarkMode?: string;
  bgGeneralColor?: string;
  textColor?: string;
  textColorOnHold?: string;
  progressBgColor?: string;
};

const PressAndHoldButton = ({
  buttonText,
  duration,
  onCompleteHold,
  bgLightMode = "#F5F5F5",
  bgGeneralColor = "",
  bgDarkMode = "#323332",
  textColorOnHold = "#0DBC73",
  textColor = "black",
  progressBgColor = "rgba(13, 188, 115, 0.1)",
}: PressAndHoldButtonProps) => {
  const [progress, setProgress] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHolding = useRef(false);
  const { themeMode } = useTheme();
  const { t } = useTranslation();
  const stepsbtn = 100;

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startHold = () => {
    if (isHolding.current || isLoading) return;

    isHolding.current = true;
    let current = 0;
    const intervalTime = duration / stepsbtn;

    const start = Date.now();
    let lastSecond = Math.ceil(duration / 1000);
    setCountdown(lastSecond);

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      current = (elapsed / duration) * 100;
      setProgress(Math.min(current, 100));

      const secondsLeft = Math.ceil((duration - elapsed) / 1000);
      if (secondsLeft !== lastSecond) {
        lastSecond = secondsLeft;
        setCountdown(secondsLeft > 0 ? secondsLeft : null);
      }

      if (current >= 100) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        isHolding.current = false;
        setProgress(0);
        setCountdown(null);
        setIsLoading(true);
        onCompleteHold();
      }
    }, intervalTime);
  };

  const cancelHold = () => {
    isHolding.current = false;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setProgress(0);
    setCountdown(null);
  };

  const displayText = () => {
    if (isLoading) return "";
    if (countdown !== null) return `${t("mainLayout.press")} ${countdown}...`;
    return t(`mainLayout.${buttonText}`);
  };

  return (
    <div
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      onTouchStart={startHold}
      onTouchEnd={cancelHold}
      className="w-full relative font-semibold rounded-full flex justify-center overflow-hidden cursor-pointer text-transparent select-none py-2"
      style={{
        backgroundColor: bgGeneralColor.length
          ? `${bgGeneralColor}`
          : themeMode === `light`
          ? `${bgLightMode}`
          : `${bgDarkMode}`,
      }}
    >
      {isLoading ? (
        <CircularProgress size={20} sx={{ color: textColor }} />
      ) : (
        <>
          <span>
            {displayText()}
            <div
              className={`absolute top-0 w-full flex justify-center left-0 h-full overflow-hidden whitespace-nowrap transition-all ease-linear`}
              style={{
                width: `${progress}%`,
                backgroundColor: progressBgColor,
              }}
            ></div>
          </span>

          <span
            className="absolute w-full text-center bg-gradient-to-r bg-clip-text text-transparent transition-all"
            style={{
              backgroundImage: `linear-gradient(to right, ${textColorOnHold} ${
                progress - 6
              }%, ${textColor} 0%)`,
            }}
          >
            {displayText()}
          </span>
        </>
      )}
    </div>
  );
};

export default PressAndHoldButton;
