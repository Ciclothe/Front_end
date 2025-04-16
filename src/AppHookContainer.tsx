import { AppRouter } from "@/AppRouter";
import { ThemeProvider } from "@/context/ThemeContext";
import { ModalProvider } from "@/context/ModalContext";
import { AlertProvider } from "@/context/AlertContext";
import App from "@/App";

function AppHookContainer() {
  return (
    <App>
      <ThemeProvider>
        <AlertProvider>
          <ModalProvider>
            <AppRouter />
          </ModalProvider>
        </AlertProvider>
      </ThemeProvider>
    </App>
  );
}

export default AppHookContainer;
