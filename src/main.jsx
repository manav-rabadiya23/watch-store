import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { OrdersProvider } from "./context/OrdersContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <OrdersProvider>
              <App />
              <ToastContainer
                position="top-center"
                autoClose={1800}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="colored"
                toastStyle={{
                  minWidth: "320px",
                  textAlign: "center",
                }}
              />
            </OrdersProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
