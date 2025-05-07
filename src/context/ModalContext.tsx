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
  openModal: (token: string, step?: string, options?: { state?: any }) => void;
  closeModal: () => void;
  goBack: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const postsToken = [
  {
    token: "X9WL32TVKMZPR8A6UFQYC7NJE",
    type: "swap" as "swap", // Aseguramos que 'type' sea uno de los valores válidos
  },
  {
    token: "cf62aa0fMjM=",
    type: "swap" as "swap",
  },
  {
    token: "cGe2aa0fMjM=",
    type: "swap" as "swap",
  },
  {
    token: "4158249710d=",
    type: "swap" as "swap",
  },
  {
    token: "sa4gY49710d=",
    type: "swap" as "swap",
  },
  {
    token: "a9X3vB1cD4pE5sQ7mN8wZ6yT2kR0uLf",
    type: "event" as "event",
  },
] as const;

const getTypeByToken = (token: string): "event" | "garment" | "swap" | null => {
  const post = postsToken.find((post) => post.token === token);
  return post ? post.type : null;
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

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const openModal = async (
    token: string,
    step: string = "details",
    options?: { state?: any }
  ) => {
    const typePost = getTypeByToken(token);
    console.log("Tipo de post:", token);
    if (!typePost) return;

    const route = `${location.pathname}/${token}/${step}`;
    navigate(route, options);
  };

  const closeModal = () => {
    const parts = location.pathname.split("/");
    const newPath = parts.slice(0, -2).join("/");
    navigate(newPath);
  };

  const goBack = () => {
    const parts = location.pathname.split("/");
    const newPath = parts.slice(0, -2).join("/");
    navigate(newPath);
  };

  useEffect(() => {
    const parts = location.pathname.split("/");
    const token = parts[parts.length - 2];
    const step = parts[parts.length - 1] ?? "details";

    if (!token || !step) return setModalContent(null);

    const typePost = getTypeByToken(token);
    if (!typePost) return setModalContent(null);

    const loader = componentMap[typePost]?.[step];
    if (loader) {
      loader().then((Component) => {
        setModalContent(<Component token={token} />);
      });
    } else {
      console.error("No modal component found for the type/step combination");
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
