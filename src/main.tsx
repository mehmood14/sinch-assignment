import ReactDOM from "react-dom/client";
import "./main.css";
import { Dashboard } from "./pages/Dashboard.tsx";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NextUIProvider>
    <Dashboard />
  </NextUIProvider>
);
