import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Livingroom() {
  const { posts } = useContext(DataContext);
  // const { addToCart } = useCart();

  const livingData = posts?.filter((item) => item.category === "living");

  // const handleAddToCart = (item) => {
  //   addToCart({
  //     id: item.id,
  //     name: item.name,
  //     price: item.newPrice,
  //     quantity: 1,
  //     image: item.image,
  //   });

  //   toast.success(`${item.name} added to cart!`);
  // };

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
                  className="w-full h-48 md:h-60 object-cover"
                />
              </Link>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <div className="mt-2">
  <div className="flex items-center space-x-2">
    <span className="text-sm text-gray-500">Old Price:</span>
    <p className="text-sm text-red-500 line-through">
      ₹{item.oldPrice.toLocaleString()}
    </p>
  </div>

  <div className="flex items-center space-x-2">
    <span className="text-sm text-green-600 font-bold">New Price:</span>
    <p className="text-md text-green-600 ">
      ₹{item.newPrice.toLocaleString()}
    </p>
  </div>
</div>

                {/* <div className="mt-4 flex space-x-4">
                  <FaShoppingCart
                    size={18}
                    className="text-black-300 cursor-pointer"
                    onClick={() => handleAddToCart(item)}
                    title="Add to Cart"
                  />
                  <FaHeart
                    size={18}
                    className="text-red-400 cursor-pointer"
                    title="Add to Wishlist"
                  />
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Livingroom;
