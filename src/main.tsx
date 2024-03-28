import CountriesPage from "@/countries-page";
import "@/index.css";
import Layout from "@/layout.tsx";
import "@fontsource/poppins";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Route, Switch } from "wouter";
import CountryPage from "@/country-page";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element not found");

ReactDOM.createRoot(rootEl).render(
  <StrictMode>
    <Layout>
      <Switch>
        <Route path="/" component={CountriesPage} />
        <Route path="/:country" component={CountryPage} />
      </Switch>
    </Layout>
  </StrictMode>,
);
