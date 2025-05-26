import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";

function Cart() {
  const { cart, removeFromCart, clear, updateCartQuantity, getCartTotalPrice } = useCart();
  const navigate = useNavigate();

  const isAuthenticated = () => {
    return localStorage.getItem("user");
  };

 
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/Login");
    }
  }, []);

  const totalPrice = getCartTotalPrice();

  
  const handleCheckout = () => {
    clear(); 
    alert("Payment is successful"); 
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty!</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center bg-white shadow-md rounded-lg overflow-hidden">
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover" />
              <div className="flex-1 p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">{`Price: ₹${item.new_price * item.quantity}`}</p>

              
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    
                    className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
                  >
                    +
                  </button>
                </div>
              </div>
             
              <button onClick={() => removeFromCart(item.id)} className="p-4 bg-red-500 text-white hover:bg-red-600 transition-all">
                <FaTrashAlt size={20} />
              </button>
            </div>
          ))}
        </div>
      )}

      
      {cart.length > 0 && (
        <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-800">Total: ₹{totalPrice}</h2>
          <button
            onClick={handleCheckout} 
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
