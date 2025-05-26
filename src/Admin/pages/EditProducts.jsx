import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProducts() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  const [product, setProduct] = useState({
    name: "",
    category: "",
    image: "",
    new_price: "",
  });

  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(api/Product/{id});
        console.log(response.data);
        
        setProduct(response.data); 
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]); 

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(api/Product/Update, product);
      alert("Product modified successfully");
      navigate("/AdminProducts");
      window.location.reload();
    } catch (error) {
      console.error("Error modifying product:", error);
      alert("An error occurred while modifying the product.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold text-center mb-4">Update Product</h2>
      <form onSubmit={handleUpdate} className="space-y-3">
        <div>
          <label className="block text-sm font-medium">Name:</label>
          <input
            className="w-full border p-2 rounded"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Category:</label>
          <input
            className="w-full border p-2 rounded"
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Category"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL:</label>
          <input
            className="w-full border p-2 rounded"
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">New Price:</label>
          <input
            className="w-full border p-2 rounded"
            type="text"
            name="new_price"
            value={product.new_price}
            onChange={handleChange}
            placeholder="New Price"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditProducts;
