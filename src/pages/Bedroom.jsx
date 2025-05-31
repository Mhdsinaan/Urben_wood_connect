import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
// import { useWishlist } from "../context/WishlistContext"; // ✅ Import wishlist

function Bedroom() {
  const { posts } = useContext(DataContext);
  const { addToCart } = useCart();
  // const { addToWishlist } = useWishlist(); // ✅ Use wishlist

  const bedroomData = posts?.filter((item) => item.category === "bedroom");

  return (
    <div>
      <h1 className="text-xs md:text-2xl font-bold text-center text-gray-800 mt-8">
        BEDROOM PRODUCTS
      </h1>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {bedroomData?.map((item, index) => (
            <div
              key={index}
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

                <div className="mt-4 flex justify-between gap-2">
                  {/* Add to Cart */}
                  <button
                    className="flex items-center justify-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm shadow"
                    onClick={() => addToCart(item)}
                  >
                    <FaShoppingCart className="mr-1" />
                    Add to Cart
                  </button>

                  {/* Add to Wishlist */}
                  <button
                    className="flex items-center justify-center px-3 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 text-sm shadow"
                    onClick={() => addToWishlist(item)}
                  >
                    <FaHeart className="mr-1" />
                    Wishlist
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

export default Bedroom;
