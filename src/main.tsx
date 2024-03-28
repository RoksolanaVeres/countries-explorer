import App from "@/App.tsx";
import "@/index.css";
import Layout from "@/layout.tsx";
import "@fontsource/poppins";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootEl).render(
  <StrictMode>
    <Layout>
      <App />
    </Layout>
  </StrictMode>,
);
