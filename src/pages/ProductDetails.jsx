import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { useParams } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext'; // Wishlist context
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductDetails() {
  const { posts } = useContext(DataContext);
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();
  const [find, setFind] = useState([]);

  useEffect(() => {
    const filter = posts.filter((item) => item.id == id);
    setFind(filter);
  }, [posts, id]);

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
    });
    toast.success(`${item.name} added to cart!`);
  };

  const handleAddToWishlist = async (item) => {
    try {
      const payload = { productId: item.id }; // ✅ Convert item to correct DTO
      console.log("Sending data to API:", payload); // Debug log
      await addToWishlist(payload);
      toast.success(`${item.name} added to wishlist!`);
    } catch (error) {
      toast.error("Failed to add to wishlist.");
      console.error("Add to wishlist error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {find.length > 0 ? (
        find.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg overflow-hidden max-w-2xl mx-auto mb-6"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{item.name}</h1>
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Old Price:</span>
                  <p className="text-sm text-red-500 line-through">
                    ₹{item.oldPrice.toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-green-600 font-bold">New Price:</span>
                  <p className="text-md text-green-600 font-bold underline">
                    ₹{item.newPrice.toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="text-gray-700 mb-4 font-thin">{item.description}</p>
              <p className="text-red-700 mb-4">Rating: {item.rating}</p>

              <div className="mt-4 flex space-x-4">
                <FaShoppingCart
                  size={24}
                  className="text-black cursor-pointer"
                  onClick={() => handleAddToCart(item)}
                  title="Add to Cart"
                />
                <FaHeart
                  size={24}
                  className="text-red-400 cursor-pointer"
                  onClick={() => handleAddToWishlist(item)} // ✅ Trigger wishlist add
                  
                  title="Add to Wishlist"
                />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Product not found.</p>
      )}
    </div>
  );
}

export default ProductDetails;
