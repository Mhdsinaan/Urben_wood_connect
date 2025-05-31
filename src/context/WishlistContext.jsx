import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        getWishlistItems();
      } catch (error) {
        console.error("Failed to parse user:", error);
      }
    }
  }, []);

  const getWishlistItems = async () => {
    try {
      const response = await api.get("api/wishlist/GetWishlist");
      console.log("Wishlist fetched:", response);
      if (response.data && response.data.data) {
        setWishlist(response.data.data);
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.error("Failed to load wishlist", error);
      toast.error("Failed to load wishlist");
      setWishlist([]);
    }
  };

  const addToWishlist = async (item) => {
    if (!user) {
      toast.error("Please login to add items to wishlist");
      return;
    }
    try {
      // Send productId to backend
    
      const response = await api.post("/api/wishlist/AddToWishlist", {
        productId: item.productId,
      });


      if (response.data.status === 200) {
        toast.success(`${item.name} added to wishlist`);
        await getWishlistItems();
      }
    } catch (error) {
      console.error("Add to wishlist error:", error);
      toast.error("Failed to add item to wishlist");
    }
  };

  // Corrected removeFromWishlist function
const removeFromWishlist = async (id) => {
  try {
    console.log("Removing item with id:", id); // Add this
    const response = await api.delete(`/api/wishlist/RemoveWishlist/${id}`);


    if (response.status === 200) {
      toast.success("Item removed from wishlist");
      await getWishlistItems();
    }
  } catch (error) {
    console.error("Remove from wishlist error:", error);
    toast.error("Failed to remove item from wishlist");
  }
};


  // Clear wishlist locally
  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// Hook to use the context easily
export function useWishlist() {
  return useContext(WishlistContext);
}
