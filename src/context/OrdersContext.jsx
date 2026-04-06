import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";

const OrdersContext = createContext(undefined);

export function OrdersProvider({ children }) {
  const { user } = useAuth();
  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("orders") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const placeOrder = useCallback(
    (orderData) => {
      if (!user) {
        throw new Error("User must be logged in to place an order.");
      }

      const now = new Date().toISOString();

      const newOrder = {
        id: `ORD-${Date.now()}`,
        userId: user.uid,
        userEmail: user.email || "",
        createdAt: now,
        date: now,
        status: "Confirmed",
        items: Array.isArray(orderData.items)
          ? orderData.items.map((item) => ({
              id: item.id,
              name: item.name || item.title || "Watch",
              title: item.title || item.name || "Watch",
              price: Number(item.price || 0),
              quantity: Number(item.quantity || 1),
              image: item.image || "",
            }))
          : [],
        shippingInfo: {
          fullName: orderData.shippingInfo?.fullName || "",
          email: orderData.shippingInfo?.email || "",
          phone: orderData.shippingInfo?.phone || "",
          address: orderData.shippingInfo?.address || "",
          city: orderData.shippingInfo?.city || "",
          state: orderData.shippingInfo?.state || "",
          pincode: orderData.shippingInfo?.pincode || "",
        },
        payment: orderData.paymentMethod || "Cash on Delivery",
        paymentMethod: orderData.paymentMethod || "Cash on Delivery",
        subtotal: Number(orderData.subtotal || 0),
        shipping: Number(orderData.shipping || 0),
        gst: Number(orderData.gst || 0),
        total: Number(orderData.total || 0),
      };

      setOrders((prev) => [newOrder, ...prev]);
      return newOrder;
    },
    [user],
  );

  const getOrdersByUser = useCallback(
    (uid, email) => {
      return orders.filter(
        (order) => order.userId === uid || order.userEmail === email,
      );
    },
    [orders],
  );

  const getOrderById = useCallback(
    (orderId) => {
      return orders.find((order) => order.id === orderId) || null;
    },
    [orders],
  );

  return (
    <OrdersContext.Provider
      value={{
        orders,
        placeOrder,
        getOrdersByUser,
        getOrderById,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);

  if (!context) {
    throw new Error("useOrders must be used inside OrdersProvider");
  }

  return context;
}
