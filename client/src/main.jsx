import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store from "./store/index.js";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
