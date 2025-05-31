import React, { useContext, useState } from "react";
import UsersContext from "../../context/usersContext";
import { Link } from "react-router-dom";
import api from "../../../api/api"; // Adjust path if needed

function Users() {
  const { user, setUser } = useContext(UsersContext);
  const [updating, setUpdating] = useState(null);
  const [message, setMessage] = useState("");  // New state for showing API response message

 const handleBlockToggle = async (id, currentStatus) => {
  setUpdating(updating);
  setMessage("");  // Reset message on new operation

  const url = currentStatus
    ? `/api/User/BlockUser/${id}`  
    : `/api/User/UnblockUser/${id}`; 

  try {
    const response = await api.put(url);
    console.log("userblock", response);

    if (response.data.data?.statusCode === "200") {
      const updatedUsers = user.map((u) =>
        u.id === id ? { ...u, isActive: !currentStatus } : u
      );
      setUser(updatedUsers);
      setMessage(response.data.data.message);  
    } else {
      setMessage("Failed to update user status.");
    }
  } catch (error) {
    console.error("Error updating user status:", error);
    setMessage("Something went wrong while updating status.");
  } finally {
    setUpdating(null);
  }
};



  return (
    <div className="p-8 bg-gray-50 min-h-screen mt-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center border-b-2 border-indigo-500 pb-2">
          User Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
           {console.log("All users:", user)}
          {user.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-tr from-indigo-50 to-indigo-100 rounded-lg p-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300"
            >
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Name:</span> {item.userName}
                <br />
                <span className="font-semibold">UserId:</span> {item.id}
                <br />
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={item.isBlocked ? "text-red-600" : "text-green-600"}
                >
                  {item.isBlocked ? "Blocked" : "Active"}
                </span>
              </p>

              <div className="flex gap-2">
                <Link
                  to={`/users/${item.id}`}
                  className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  View Profile
                </Link>
               <button
  onClick={() => handleBlockToggle(item.id, item.isActive)}
  className={item.isActive ? "bg-red-500" : "bg-green-500"}
>
  {item.isActive ? "Block" : "Unblock"}
</button>
              </div>
            </div>
          ))}
        </div>

        {/* Show API response message */}
        {message && (
          <div
            className={`mt-6 max-w-7xl mx-auto p-4 rounded-md ${
              message.includes("success")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
