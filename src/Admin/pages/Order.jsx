import React, { useState, useEffect } from 'react';
import api from '../../../api/api';


function Order() {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    try {
      const res = await api.get('/order'); 
      setOrders(res.data); 
    } catch (error) {
      alert('An error occurred while fetching orders.');
      console.error(error);
    }
  }
  useEffect(() => {
    fetchOrders();
  }, []); 

  return (
    <div className="p-6 bg-gray-100 min--screen">
     
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Order List
      </h1>
      {orders.length > 0 ? (
        <ul className="space-y-4 max-w-3xl mx-auto">
          {orders.map((item, index) => (
            <li
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
            >
              
              <p>
                <strong className="text-gray-700">User Name:</strong>{' '}
                {item.userName}
              </p>
              <p>
                <strong className="text-gray-700">Product Name:</strong>
                {item.productName}
              </p>
              <p>
                <strong className="text-gray-700">Product Image:</strong>
                <br />
                <img
                  src={item.productImage}
                  alt="Product"
                  className="w-32 h-32 object-cover rounded-md mt-2"
                />
              </p>
              <p>
                <strong className="text-gray-700">Quantity:</strong>{' '}
                {item.quantity}
              </p>
              <p>
                <strong className="text-gray-700">Total Price:</strong> $
                {item.totalPrice}
              </p>
              <hr className="my-4 border-gray-300" />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </div>
  );
}
export default Order;
