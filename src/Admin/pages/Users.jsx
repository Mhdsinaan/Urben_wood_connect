import React, { useContext } from "react";
import UsersContext from "../../context/usersContext";
import { Link } from "react-router-dom";




function Users() {
  const { user } = useContext(UsersContext);

 

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-16">
      <div className="bg-white shadow-lg rounded-lg p-6">
        
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          User Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.map((item) => (
            <div
              key={item.id}
              className="bg-gray-100 rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
            >
              <p className="text-gray-800">
                <span className="font-semibold">ID:</span> {item.id}
              </p>
              <p className="text-gray-800">
                <span className="font-semibold">Name:</span> {item.name}
              </p>
             
              <p className="text-gray-800">
                <span className="font-semibold">Email:</span> {item.email}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Users;