import React, { useState } from "react";
import { FaShoppingCart, FaUserPlus, FaBars, FaTimes, FaHeart } from "react-icons/fa"; // ✅ Added FaHeart
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-200 via-blue-100 to-white shadow-lg">
      <div className="flex justify-between items-center py-5 px-5">
        {/* Logo and Hamburger */}
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-extrabold text-blue-800">UrbanWood</h1>
          <button
            className="text-2xl md:hidden text-blue-800"
            onClick={toggleMenu}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Nav Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent md:flex gap-4 py-4 px-5 md:py-0 md:px-0 z-40 shadow md:shadow-none`}
        >
          <Link
            to="/"
            onClick={closeMenu}
            className="block text-red-600 font-semibold hover:text-red-800 transition"
          >
            HOME
          </Link>
          <Link
            to="/Bedroom"
            onClick={closeMenu}
            className="block text-black hover:text-gray-700 transition"
          >
            BEDROOM
          </Link>
          <Link
            to="/Dining"
            onClick={closeMenu}
            className="block text-black hover:text-gray-700 transition"
          >
            DINING
          </Link>
          <Link
            to="/Livingroom"
            onClick={closeMenu}
            className="block text-black hover:text-gray-700 transition"
          >
            LIVING
          </Link>
          <Link
            to="/Decor"
            onClick={closeMenu}
            className="block text-black hover:text-gray-700 transition"
          >
            DECOR
          </Link>
        </div>

        {/* Icons */}
        <div className="flex gap-5 items-center">
          <Link to="/Login" className="text-black hover:text-gray-600">
            <FaUserPlus size={26} />
          </Link>

          {/* ✅ Wishlist Icon */}
          <Link to="/Wishlist" className="text-black hover:text-gray-600">
            <FaHeart size={26} />
          </Link>

          <Link to="/Cart" className="relative text-black hover:text-gray-600">
            <FaShoppingCart size={26} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
