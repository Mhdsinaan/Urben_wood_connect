import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function Livingroom() {
  const { posts } = useContext(DataContext);
  const { addToCart } = useCart();

  const LivingData = posts?.filter((item) => item.category === "living");

  return (
    <div>
      <h1 className="text-xs md:text-2xl font-bold text-center text-gray-800 mt-8">
        LIVING ROOM PRODUCTS
      </h1>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {LivingData?.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden">
              <Link to={`ProductDetails/${item.productID}`}>
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
              </Link>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <div className="flex items-center space-x-2">
                  <p className="text-lg text-red-500 line-through">₹ {item.oldPrice}</p>
                  <span className="text-lg font-semibold text-gray-900">₹{item.NewPrice}</span>
                </div>
                <div className="mt-4">
                  <button
                    className="flex items-center justify-center p-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all duration-200 shadow-md"
                    onClick={() =>
                      
                      addToCart({
                         ProductId: item.id,  // or product.ProductId based on your naming
                          quantity: 1,
                         name: item.name
                      })
                      
                    }
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

export default Livingroom;
