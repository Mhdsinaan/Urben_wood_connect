import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { toast } from "react-toastify";

function AddProduct() {
  const [product, setProduct] = useState({
    // id: "",
    name: "",
    category: "",
    image: "",
    NewPrice: "",
    oldPrice: "",
    Description: "",
    rating: "",
    reviews: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleData = async (e) => {
    e.preventDefault();

    const tkn = localStorage.getItem("token");

    try {
      const res = await api.post(
        "api/Product/AddProduct",
        {
          name: product.name,
          category: product.category,
          image: product.image,
          NewPrice: Number(product.NewPrice),
          oldPrice: Number(product.oldPrice),
          description: product.Description,
          rating: parseInt(product.rating),
          reviews: parseInt(product.reviews),
        },
        {
          headers: {
            Authorization: `Bearer ${tkn}`,
          },
        }
      );

      if (res.status === 200) {
        toast.success("Product added successfully");
        navigate("/AdminProducts");
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          toast.error("Product already exists");
        } else {
          toast.error(`Error: ${error.response.data.message || "Something went wrong."}`);
        }
      } else {
        toast.error("An error occurred while adding the product.");
      }
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-lg font-semibold text-center mb-6">Add New Product</h2>
      <form onSubmit={handleData} className="space-y-4">
       
        <div>
          <label className="block text-sm font-medium mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Category:</label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
       
        <div>
          <label className="block text-sm font-medium mb-1">Image URL:</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
       
        <div>
          <label className="block text-sm font-medium mb-1">New Price:</label>
          <input
            type="number"
            name="NewPrice"
            value={product.NewPrice}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
            min="0"
          />
        </div>
       
        <div>
          <label className="block text-sm font-medium mb-1">Old Price:</label>
          <input
            type="number"
            name="oldPrice"
            value={product.oldPrice}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min="0"
          />
        </div>
      
        <div>
          <label className="block text-sm font-medium mb-1">Description:</label>
          <input
            type="text"
            name="Description"
            value={product.Description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
       
        <div>
          <label className="block text-sm font-medium mb-1">Rating:</label>
          <input
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min="0"
            max="5"
          />
        </div>
       
        <div>
          <label className="block text-sm font-medium mb-1">Reviews:</label>
          <input
            type="number"
            name="reviews"
            value={product.reviews}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            min="0"
          />
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
