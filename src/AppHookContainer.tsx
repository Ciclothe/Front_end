import { AppRouter } from "@/AppRouter";
import { ThemeProvider } from "@/context/ThemeContext";
import App from "@/App";

function AppHookContainer() {
  return (
    <App>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </App>
  );
}

export default AppHookContainer;
