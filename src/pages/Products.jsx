import React, { useContext } from "react";
import { DataContext } from "../context/DataContext";

function Products() {
  const { posts, loading, error } = useContext(DataContext);

  if (loading) return <p className="text-center text-xl font-semibold">Loading...</p>;
  if (error) return <p className="text-center text-red-500 font-semibold">Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 py-8">
      {posts.map((item) => (
        <div key={item.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
          <img
            className="w-full h-64 object-cover"
            src={item.image}
            alt={item.name}
          />
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
           
            <p className="text-red-800 font-semibold mt-2">{`$${item.new_price}`}</p>
            <h3 className="text-lg font-bold text-blue-800">{item.rating}</h3>
           
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;
