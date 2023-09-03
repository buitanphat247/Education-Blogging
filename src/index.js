import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth-context.js";
import { ToastContainer } from "react-toastify";
import { StyledEngineProvider } from "@mui/material/styles";

// Ngăn người dùng sử dụng lăn chuột để thu phóng

ReactDOM.createRoot(document.getElementById("root")).render(
  <StyledEngineProvider injectFirst>
    <BrowserRouter>
      <AuthProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </BrowserRouter>
  </StyledEngineProvider>
);
