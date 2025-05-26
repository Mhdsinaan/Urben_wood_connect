import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function AdminProducts() {
  const { posts, loading } = useContext(DataContext);
  const { id } = useParams();
  const deleteData = async (id) => {
    try {
      const resp = await axios.delete(`http://localhost:3000/products/${id}`);
      console.log("Product deleted successfully:", resp.data);
      alert("Product deleted successfully");
      window.location.reload();
    } catch (error) {
      
      alert("An error  deleting the product.");
    }
  };

  return (
    <div className="p-6">
      <div className="mt-15">
       
      </div>
      <div className="flex justify-end mt-4 mb-4">
        <Link to="/AddProduct">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all">
            Add Product
          </button>
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-600 text-center">Loading products...</p>
      ) : posts && posts.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Number
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Price
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Category
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  id
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  image
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  action
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((item, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.new_price}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {item.name}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    {item.category}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {item.id}
                  </td>

                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={item.image}
                      alt={item.description}
                      className="w-12 h-12 object-cover rounded-md shadow-sm"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <div className="flex items-center justify-center space-x-4">
                      <span
                        onClick={() => deleteData(item.id)}
                        className="text-red-500 cursor-pointer hover:text-red-700"
                      >
                        <MdDelete size={20} />
                      </span>
                      <Link
                        to={`/EditProducts/${item.id}`}
                        className="text-blue-500 hover:text-blue-700"
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
        <p className="text-gray-600 text-center">No products available</p>
      )}
    </div>
  );
}

export default AdminProducts;
