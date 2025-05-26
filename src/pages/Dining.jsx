import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/cartContext";

function Dining() {
  const { posts } = useContext(DataContext);
  const { addToCart } = useCart();
  // const { addToCart } = useContext(CartContext); 


  const diningData = posts?.filter((item) => item.category === "dining");

  return (
    <div>
      <h1 className="text-xs md:text-2xl font-bold text-center text-gray-800 mt-8">
        DINING ROOM PRODUCTS
      </h1>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {diningData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <Link to={`ProductDetails/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <p className="text-lg text-red-500 line-through">
                  ₹{item.old_price}
                  </p>
                  <span className="text-lg font-semibold text-gray-900">
                  ₹{item.new_price}
                  </span>
                </div>
                <div className="mt-4">
                  <button
                    className="flex items-center justify-center p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-200 focus:outline-none shadow-md hover:shadow-lg"
                    onClick={() => addToCart(item)}
                  >
                    <FaShoppingCart size={18} className="mr-1" />
                    <span className="text-sm">Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dining;
