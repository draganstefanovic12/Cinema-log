import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "@/features/auth/context/AuthContext";
import BrowserRoutes from "./routes/routes";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <BrowserRoutes />
      </AuthContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
