import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./FaShared/utils/testContrast";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found.");
}

const root = createRoot(rootElement);

const renderStartupError = (error: unknown) => {
  const message =
    error instanceof Error
      ? error.message
      : "FanArcs could not start because the app configuration is incomplete.";

  root.render(
    <StrictMode>
      <main className="page-loading" role="alert">
        <h1>FanArcs could not start.</h1>
        <p>{message}</p>
      </main>
    </StrictMode>,
  );
};

void import("./App")
  .then(({ default: App }) => {
    root.render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>,
    );
  })
  .catch((error) => {
    console.error("Failed to bootstrap FanArcs:", error);
    renderStartupError(error);
  });
