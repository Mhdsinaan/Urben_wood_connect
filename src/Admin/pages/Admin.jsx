import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/Login");
  };

  return (
    <div className="flex min-h-screen">
      
      <div
        className={`bg-gray-800 text-white w-64 p-4 space-y-6 fixed top-0 left-0 h-full transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="text-xl font-semibold mb-6">Admin Panel</div>
        <ul className="space-y-4">
          <li>
            <Link
              to="/Admin"
              className="block text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className="block text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/AdminProducts"
              className="block text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/Order"
              className="block text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Orders
            </Link>
          </li>
          <li>
            <button
              className="block text-white px-4 py-2 rounded-md hover:bg-gray-700 mt-auto"
              onClick={handleLogout}
            >
              LogOut
            </button>
          </li>
        </ul>
      </div>

      <div className="ml-64 flex-1 p-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      </div>
    </div>
  );
}

export default Admin;
