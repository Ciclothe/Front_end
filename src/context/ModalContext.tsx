import React, { createContext, useContext, useState } from "react";
import { DefaultModal } from "@/components/Modals/DefaultModal";

type ModalContent = {
  content: React.ReactNode;
  params?: Record<string, unknown>;
};

type ModalContextType = {
  openModal: (
    content: React.ReactNode,
    params?: Record<string, unknown>
  ) => void;
  pushContent: (
    content: React.ReactNode,
    params?: Record<string, unknown>
  ) => void;
  popContent: () => void;
  closeModal: () => void;
  params?: Record<string, unknown>;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("useModal must be used within ModalProvider");
  return context;
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [stack, setStack] = useState<ModalContent[]>([]);

  const openModal = (
    content: React.ReactNode,
    params?: Record<string, unknown>
  ) => {
    setStack([{ content, params }]);
  };

  const pushContent = (
    content: React.ReactNode,
    params?: Record<string, unknown>
  ) => {
    setStack((prev) => [...prev, { content, params }]);
  };

  const popContent = () => {
    setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const closeModal = () => setStack([]);

  const current = stack[stack.length - 1];

  return (
    <ModalContext.Provider
      value={{
        openModal,
        pushContent,
        popContent,
        closeModal,
        params: current?.params,
      }}
    >
      {children}
      {current && (
        <DefaultModal onClose={closeModal}>{current.content}</DefaultModal>
      )}
    </ModalContext.Provider>
  );
};
