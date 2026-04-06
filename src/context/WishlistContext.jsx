import { createContext, useContext, useEffect, useMemo, useState } from "react";

const WishlistContext = createContext(undefined);

export function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("wishlistItems") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) return prev;

      return [
        ...prev,
        {
          id: product.id,
          name: product.name || product.title || "Watch",
          price: Number(product.price || 0),
          image: product.image || "",
          slug: product.slug || "",
          brand: product.brand || "",
          category: product.category || "",
          description: product.description || "",
        },
      ];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const moveToCart = (id, addToCart) => {
    const item = wishlistItems.find((wishlistItem) => wishlistItem.id === id);
    if (!item) return false;

    addToCart({
      id: item.id,
      name: item.name,
      price: Number(item.price || 0),
      image: item.image || "",
      quantity: 1,
      slug: item.slug || "",
    });

    removeFromWishlist(id);
    return true;
  };

  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };

  const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        moveToCart,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
}
