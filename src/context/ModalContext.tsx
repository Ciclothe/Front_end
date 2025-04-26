import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { DefaultModal } from "@/components/Modals/DefaultModal";
import { useNavigate, useLocation } from "react-router-dom";

type ModalContextType = {
  openModal: (token: string, typePost: string, step?: string) => void;
  closeModal: () => void;
  goBack: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};

const componentMap: Record<
  string,
  Record<string, () => Promise<React.ComponentType<{ token: string }>>>
> = {
  swap: {
    details: () =>
      import("@/components/Swap/SwapDetails").then((mod) => mod.SwapDetails),
    offer: () =>
      import("@/components/Swap/SwapOfferSteps").then(
        (mod) => mod.SwapOfferSteps
      ),
    offerReceived: () =>
      import("@/components/Swap/SwapOfferReceived").then(
        (mod) => mod.SwapOfferReceived
      ),
    counterOffer: () =>
      import("@/components/Swap/SwapCounterOffer").then(
        (mod) => mod.SwapCounterOffer
      ),
  },
  event: {
    details: () =>
      import("@/components/Event/EventDetails").then((mod) => mod.EventDetails),
  },
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const openModal = (
    token: string,
    typePost: string,
    step: string = "details"
  ) => {
    const currentPath = location.pathname;
    const parts = currentPath.split("/");

    if (parts.includes("offerReceived") || parts.includes("summary")) {
      const newPath = `${currentPath}/${token}/${step}`;
      navigate(newPath);
    } else {
      const basePath = `/${parts[1]}`;
      const newPath = `${basePath}/${typePost}/${token}/${step}`;
      navigate(newPath);
    }
  };

  const closeModal = () => {
    // setModalContent(null);
    const parts = location.pathname.split("/");

    if (parts.includes("summary")) {
      const newPath = parts.slice(0, -2).join("/");
      navigate(newPath);
    } else if (parts.length >= 5) {
      const basePath = `/${parts[1]}`;
      navigate(basePath);
    }
  };

  const goBack = () => {
    const parts = location.pathname.split("/");

    if (parts.length >= 6) {
      const newPath = parts.slice(0, -2).join("/");
      navigate(newPath);
    } else {
      const basePath = `/${parts[1]}`;
      navigate(basePath);
    }
  };

  useEffect(() => {
    const parts = location.pathname.split("/");

    const token = parts.at(-2);
    const step = parts.at(-1);

    const validTypes = ["swap", "event"];
    const typePost = parts.find((p) => validTypes.includes(p)) ?? "swap";

    const isModalRoute = parts.length >= 5;

    if (isModalRoute && step) {
      const loader = componentMap[typePost]?.[step];
      if (loader) {
        loader().then((Component) => {
          const modal = <Component token={token || ""} />;
          setModalContent(modal);
        });
      } else {
        console.error("No component found for the given route.");
        setModalContent(null);
      }
    } else {
      setModalContent(null);
    }
  }, [location.pathname]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, goBack }}>
      {children}
      {modalContent && (
        <DefaultModal onClose={closeModal}>{modalContent}</DefaultModal>
      )}
    </ModalContext.Provider>
  );
};
