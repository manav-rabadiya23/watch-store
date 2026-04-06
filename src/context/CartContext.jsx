import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext(undefined);

const parsePrice = (value) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const cleaned = value.replace(/[^\d.]/g, "");
    return Number(cleaned || 0);
  }
  return 0;
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("cartItems") || "[]");

      return saved.map((item) => ({
        ...item,
        price: parsePrice(item.price),
        quantity: Number(item.quantity || 1),
      }));
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    let wasExisting = false;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);

      if (existingIndex !== -1) {
        wasExisting = true;

        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Number(updated[existingIndex].quantity || 1) + 1,
        };
        return updated;
      }

      return [
        ...prev,
        {
          id: product.id,
          name: product.name || product.title || "Watch",
          price: parsePrice(product.price),
          image: product.image || "",
          quantity: Number(product.quantity || 1),
          slug: product.slug || "",
        },
      ];
    });

    if (wasExisting) {
      toast.info("Cart quantity updated");
    } else {
      toast.success("Item added to cart");
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.info("Item removed from cart");
  };

  const increaseQty = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Number(item.quantity || 1) + 1 }
          : item,
      ),
    );
  };

  const decreaseQty = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Number(item.quantity || 1) - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + Number(item.quantity || 1), 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + parsePrice(item.price) * Number(item.quantity || 1),
      0,
    );
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        cartCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
