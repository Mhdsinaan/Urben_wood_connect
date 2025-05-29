import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create the context
const WishlistContext = createContext();

// Provider component
export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // ✅ Get all wishlist items on mount
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const res = await axios.get("/api/wishlist");
        setWishlist(res.data);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, []);

  
  const addToWishlist = async (item) => {
    const exists = wishlist.find((w) => w.id === item.id);
    if (!exists) {
      try {
        const res = await axios.post("api/wishlist/AddToWishlist", 
          productId=item.productId,
        );
        setWishlist((prev) => [...prev, res.data]);
      } catch (error) {
        console.error("Error adding to wishlist:", error);
      }
    }
  };

  // ✅ Remove item from wishlist
  const removeFromWishlist = async (id) => {
    try {
      await axios.delete(`/api/wishlist/${id}`);
      setWishlist((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// ✅ Hook to use the context
export function useWishlist() {
  return useContext(WishlistContext);
}
