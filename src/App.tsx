// App.tsx
import { ReactNode } from "react";
import "@/App.css";

interface Props {
  children: ReactNode;
}

function App({ children }: Props) {
  return <main className="w-full min-h-screen">{children}</main>;
}

export default App;
