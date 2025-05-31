import React from "react";
import { useWishlist } from "../context/WishlistContext";

function WishlistPage() {
  const { wishlist, removeFromWishlist, wishlistCount } = useWishlist();

  if (wishlistCount === 0) {
    return (
      <p className="text-center mt-10 text-gray-600">
        Your wishlist is empty.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">
        My Wishlist ({wishlistCount})
      </h1>
      <ul className="space-y-4">
        {wishlist.map((item) => (
          <li
            key={item.productId}  // Use productId here
            className="flex items-center justify-between border p-4 rounded shadow"
          >
            <div className="flex items-center space-x-4">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <h2 className="text-lg font-medium">{item.name}</h2>
                <p className="text-gray-700">₹{item.price}</p>
              </div>
            </div>

            <button
              onClick={() => {
                console.log("Remove clicked for id:", item.productId);
                removeFromWishlist(item.productId); // Pass productId here
              }}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WishlistPage;
