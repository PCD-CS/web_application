import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter as Routes } from "react-router-dom";
import { AppProvider } from "./context/Context";
import "./index.css"
import { ThemeProvider } from "@material-tailwind/react";
const root = createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider>
    <AppProvider>
      <Routes>
        <App />
      </Routes>
    </AppProvider>
  </ThemeProvider>
);