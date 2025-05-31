import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../api/api"; // adjust path as needed

function UserDetails() {
  const { id } = useParams(); 
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const userRes = await api.get(`/api/User/all-users`);
        const orderRes = await api.get(`/api/Order/UserOrders/${id}`);

        if (userRes.data.statusCode === "200" && orderRes.data.statusCode === "200") {
          setUser(userRes.data.data);
          setOrders(orderRes.data.data);
        } else {
          setError("Failed to load user details or orders.");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load user details or orders.");
      }
    }

    fetchData();
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!user) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">User: {user.userName}</h2>
      <h2 className="text-2xl font-bold mb-4">User: {user.email}</h2>

      <h3 className="text-xl font-semibold mb-2">Orders:</h3>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="list-disc list-inside">
          {orders.map((order) => (
            <li key={order.id}>Order #{order.id} - ₹{order.amount}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserDetails;
