import { createContext, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  

  const user = JSON.parse(localStorage.getItem("user"));
  if (user == null) {
    
  }

  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, []);

  const getCartItems = async () => {
    try {
      const response = await api.get("/api/Cart/getAll");
      console.log("data", response);
      setCart(response.data);
    } catch (error) {
      console.error("Failed to load cart items", error);
      setCart([]);
    }
  };

  const addToCart = async (item) => {
    console.log(item);
    //  console.log("id",item.id);
    // console.log("qua",item.quantity)
    
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    toast.error("Please login to add items to cart");
    return;
  }

  try {
    const response = await api.post("api/Cart/add", {
      productId: item.id, 
      quantity: item.quantity,
    });
   

    if (response.status === 200) {
      toast.success(`${item.name} added to cart`);
      await getCartItems(); 
    }
  } catch (error) {
    toast.error("Failed to add item to cart");
    console.error(error);
  }
};

  const removeFromCart = async (productId) => {
  

    try {
      const response = await api.delete(`/api/Cart/${productId}`);
      if (response.status === 200) {
        toast.success("Item removed from cart");
        getCartItems();
      }
    } catch (error) {
      toast.error("Failed to remove item");
      console.error(error.response.data);
    }
  };

  const updateCartQuantity = async (productID, quantity) => {
    try {
      const updatedQuantity = quantity + 1;
      const response = await api.post(`/api/Cart/increment/${productID}`, {
        quantity: updatedQuantity,
      });
      if (response.status === 200) {
        getCartItems();
      }
    } catch (error) {
      toast.error("Failed to update quantity");
      console.error(error);
    }
  };
  const decreaseCartQuantity = async (productID, quantity) => {
    try {
      const decreas = quantity - 1;
      const response = await api.post(`/api/Cart/decrease/${productID}`, {
        quantity: decreas,
      });
      if (response.status === 200) {
        getCartItems();
      }
    } catch (error) {
      toast.error("Failed to update quantity");
      console.error(error);
    }
  };

  const clear = () => {
    setCart([]);
  };

  const getCartTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.price * item.quantity,
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
        decreaseCartQuantity,
        clear,
        getCartTotalPrice,

        cartCount: cart.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
// navigator("/login");
