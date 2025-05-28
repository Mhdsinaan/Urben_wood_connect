import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

function Livingroom() {
  const { posts } = useContext(DataContext);
  const { addToCart } = useCart();
  const { addToWishlist, wishlist } = useWishlist();

  const livingData = posts?.filter((item) => item.category === "living");

  const isInWishlist = (id) =>
    Array.isArray(wishlist) && wishlist.some((item) => item.id === id);

  return (
    <div>
      <h1 className="text-xs md:text-2xl font-bold text-center text-gray-800 mt-8">
        LIVING ROOM PRODUCTS
      </h1>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {livingData?.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden"
            >
              <Link to={`ProductDetails/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <div className="flex items-center space-x-2">
                  <p className="text-lg text-red-500 line-through">₹{item.oldPrice}</p>
                  <span className="text-lg font-semibold text-gray-900">₹{item.newPrice}</span>
                </div>
                <div className="mt-4 flex space-x-4">
                  {/* Add to Cart - red icon only */}
                  <FaShoppingCart
                    size={18}
                    className="text-black-300 cursor-pointer"
                    onClick={() =>
                      addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.newPrice,
                        quantity: 1,
                        image: item.image,
                      })
                    }
                    title="Add to Cart"
                  />

                  {/* Wishlist - red icon only */}
                  <FaHeart
                    size={18}
                    className={`cursor-pointer ${
                      isInWishlist(item.id) ? "text-gray-400" : "text-black-500"
                    }`}
                    onClick={() => !isInWishlist(item.id) && addToWishlist(item)}
                    title={isInWishlist(item.id) ? "Already in Wishlist" : "Add to Wishlist"}
                  />
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
