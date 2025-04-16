import { useState, useRef, useEffect } from "react";
import { useModal } from "@/context/ModalContext";
import { useAlert } from "@/context/AlertContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@/context/ThemeContext";

type OfferSubmitButtonProps = {
  postData: () => Promise<boolean>;
};

const OfferSubmitButton = ({ postData }: OfferSubmitButtonProps) => {
  const [progress, setProgress] = useState(0);
  const [isPosting, setIsPosting] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isHolding = useRef(false);
  const { closeModal } = useModal();
  const { showAlert } = useAlert();
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const { themeMode } = useTheme();

  const duration = 3000;
  const stepsbtn = 100;

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startHold = () => {
    if (isPosting) return;

    isHolding.current = true;
    let current = 0;
    const intervalTime = duration / stepsbtn;

    const start = Date.now();
    let lastSecond = 3;
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
        handlePost();
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

  const handlePost = async () => {
    setIsLoading(true);
    if (isPosting) return;
    setIsPosting(true);

    try {
      const success = await postData();
      if (success) {
        closeModal();
        showAlert("Datos enviados exitosamente", "success");
      } else {
        showAlert("Hubo un error al enviar los datos", "error");
      }
    } catch (error) {
      console.error(error);
      showAlert("Error en la conexión, inténtalo de nuevo", "error");
    } finally {
      setIsLoading(false);
      setIsPosting(false);
    }
  };

  const displayText = () => {
    if (isLoading) return "";
    if (countdown !== null) return `Presionar ${countdown}...`;
    return "Presiona para enviar oferta";
  };

  return (
    <div
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      onTouchStart={startHold}
      onTouchEnd={cancelHold}
      className="relative font-semibold rounded-full flex justify-center overflow-hidden cursor-pointer text-transparent select-none py-2"
      style={{
        backgroundColor:
          progress === 100
            ? "rgba(13, 188, 115, 0.1)"
            : themeMode === "light"
            ? "#F5F5F5"
            : "#323332",
      }}
    >
      {isLoading ? (
        <CircularProgress size={25} sx={{ color: "#0DBC73" }} />
      ) : (
        <>
          <span>
            {displayText()}
            <div
              className="absolute top-0 w-full flex justify-center left-0 h-full bg-[#0DBC73]/10 overflow-hidden whitespace-nowrap transition-all ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </span>

          <span
            className="absolute w-full text-center bg-gradient-to-r bg-clip-text text-transparent transition-all"
            style={{
              backgroundImage: `linear-gradient(to right, #0DBC73 ${
                progress - 6
              }%, ${themeMode === "light" ? "black" : "white"} 0%)`,
            }}
          >
            {displayText()}
          </span>
        </>
      )}
    </div>
  );
};

export default OfferSubmitButton;
