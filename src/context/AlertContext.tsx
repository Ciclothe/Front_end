import { createContext, useContext, useState, ReactNode } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import ReportIcon from "@mui/icons-material/Report";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type AlertType = "success" | "warning" | "error";

type AlertContextType = {
  showAlert: (message: string, type?: AlertType) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const styles = {
  success: {
    bg: "bg-green-100 dark:bg-green-800",
    text: "text-green-700 dark:text-green-100",
    icon: <CheckCircleIcon className="text-green-700 dark:text-green-100" />,
  },
  warning: {
    bg: "bg-yellow-100 dark:bg-yellow-800",
    text: "text-yellow-700 dark:text-yellow-100",
    icon: <WarningIcon className="text-yellow-700 dark:text-yellow-100" />,
  },
  error: {
    bg: "bg-red-100 dark:bg-red-800",
    text: "text-red-700 dark:text-red-100",
    icon: <ReportIcon className="text-red-700 dark:text-red-100" />,
  },
};

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AlertType>("success");

  const showAlert = (msg: string, alertType: AlertType = "success") => {
    setMessage(msg);
    setType(alertType);
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  const handleClose = () => setVisible(false);

  const alertStyle = styles[type];

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {visible && (
        <div className="fixed top-4 right-4 z-[9999]">
          <div
            className={`rounded-md px-4 py-3 shadow-lg flex items-center gap-3 transition-all duration-300 ${alertStyle.bg} ${alertStyle.text}`}
          >
            {alertStyle.icon}
            <span className="text-sm font-medium">{message}</span>
            <button onClick={handleClose} className="ml-auto">
              <CloseRoundedIcon className={`w-4 h-4 ${alertStyle.text}`} />
            </button>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert debe usarse dentro de un AlertProvider");
  }
  return context;
};
