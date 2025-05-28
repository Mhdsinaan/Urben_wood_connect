import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import {
  MdDashboard,
  MdPeople,
  MdInventory2,
  MdShoppingCart,
  MdLogout,
  MdMenu,
  MdClose,
} from "react-icons/md";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/Login";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <aside
        className={`bg-black text-white w-64 p-6 space-y-6 sticky top-0 h-screen overflow-auto transform transition-transform duration-300 ease-in-out z-30
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold tracking-wide"></h2>
          <button
            className="text-white lg:hidden text-2xl"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <MdClose />
          </button>
        </div>

        <nav className="flex flex-col space-y-3 text-lg">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            <MdDashboard size={24} /> Dashboard
          </Link>
          <Link
            to="/users"
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            <MdPeople size={24} /> Users
          </Link>
          <Link
            to="/adminProducts"
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            <MdInventory2 size={24} /> Products
          </Link>
          <Link
            to="/order"
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-700 transition"
          >
            <MdShoppingCart size={24} /> Orders
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-2 rounded hover:bg-red-600 transition mt-auto w-full text-left"
          >
            <MdLogout size={24} /> Logout
          </button>
        </nav>
      </aside>

      
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-40 bg-gray-800 text-white p-2 rounded-lg shadow-lg lg:hidden"
          aria-label="Open sidebar"
        >
          <MdMenu size={28} />
        </button>
      )}

      
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
