import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaPlus } from "react-icons/fa";

function AdminProducts() {
  const { posts, loading } = useContext(DataContext);

  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      alert("Product deleted successfully");
      window.location.reload();
    } catch (error) {
      alert("An error occurred while deleting the product.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Products</h2>
        <Link
          to="/AddProduct"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition"
        >
          <FaPlus className="mr-2" />
          Add Product
        </Link>
      </header>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : posts && posts.length > 0 ? (
        <div className="overflow-x-auto rounded-md border border-gray-200 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600">
              <tr>
                {[
                  "No",
                  "Price",
                  "Name",
                  "Category",
                  "ID",
                  "Image",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    ₹{item.newPrice}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={item.image}
                      alt={item.description}
                      className="w-14 h-14 object-cover rounded-md shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="flex items-center space-x-4 justify-center">
                      <button
                        onClick={() => deleteData(item.id)}
                        className="text-red-600 hover:text-red-800 transition"
                        aria-label="Delete product"
                      >
                        <MdDelete size={22} />
                      </button>
                      <Link
                        to={`/Admin/EditProducts/${item.id}`}
                        className="text-blue-600 hover:text-blue-800 transition"
                        aria-label="Edit product"
                      >
                        <FaEdit size={20} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available</p>
      )}
    </div>
  );
}

export default AdminProducts;
