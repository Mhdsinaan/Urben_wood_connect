import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  // const navigate = useNavigate();


  useEffect(() => {
    if (!user) {
      toast.error("Please login");
      // navigate("/login");
    } else {
      getCartItems();
    }
  }, [user]);

  const getCartItems = async () => {
    try {
      const response = await api.get("/api/Cart");
      setCart(response.data);
    } catch (error) {
      console.error("Failed to load cart items", error);
    }
  };

  const addToCart = async (item) => {
    try {
      const response = await api.post("/api/Cart/add", item);
      if (response.status === 200) {
        toast.success(`${item.name} added to cart`);
        getCartItems(); // Refresh cart after adding
      }
    } catch (error) {
      toast.error("Failed to add item to cart");
      console.error(error);
    }
  };

  const removeFromCart = (id) => {
    // Update this if you have delete API endpoint
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateCartQuantity = (id, newQuantity) => {
    // Update this if you have PUT/PATCH API
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clear = () => {
    setCart([]);
  };

  const getCartTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.new_price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clear,
        getCartTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
