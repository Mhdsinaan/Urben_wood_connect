import React from "react";

function Wishlist({ wishlist }) {
  // Check if wishlist is an array, else fallback to empty array
  const safeWishlist = Array.isArray(wishlist) ? wishlist : [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
     

      {safeWishlist.length === 0 ? (
        <p className="text-gray-600 text-center">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {safeWishlist.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-700 mb-2">Price: ${item.price}</p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() => alert(`Remove ${item.name} from wishlist`)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
