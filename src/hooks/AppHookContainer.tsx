import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "@/AppRouter";
import { ThemeProvider } from "@/context/ThemeContext";
import { ModalProvider } from "@/context/ModalContext";
import { AlertProvider } from "@/context/AlertContext";
import { CategoryTabsProvider } from "@/context/CategoryTabsContext";
import App from "@/App";

function AppHookContainer() {
  return (
    <BrowserRouter>
      <App>
        <ThemeProvider>
          <AlertProvider>
            <ModalProvider>
              <CategoryTabsProvider>
                <AppRouter />
              </CategoryTabsProvider>
            </ModalProvider>
          </AlertProvider>
        </ThemeProvider>
      </App>
    </BrowserRouter>
  );
}

export default AppHookContainer;
