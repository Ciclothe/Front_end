import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "@/AppRouter";
import { ThemeProvider } from "@/context/ThemeContext";
import { ModalProvider } from "@/context/ModalContext";
import { AlertProvider } from "@/context/AlertContext";
import { CategoryTabsProvider } from "@/context/CategoryTabsContext";
import { AuthProvider } from "@/context/AuthContext"; // <-- importa el AuthProvider
import App from "@/App";

function AppHookContainer() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <AlertProvider>
            <ModalProvider>
              <CategoryTabsProvider>
                <App>
                  <AppRouter />
                </App>
              </CategoryTabsProvider>
            </ModalProvider>
          </AlertProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppHookContainer;
