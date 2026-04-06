import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

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
    let alreadyExists = false;

    setWishlistItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);

      if (exists) {
        alreadyExists = true;
        return prev;
      }

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

    if (alreadyExists) {
      toast.info("Item already in wishlist");
    } else {
      toast.success("Item added to wishlist");
    }
  };

  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    toast.info("Item removed from wishlist");
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
    toast.success("Item moved to cart");
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
