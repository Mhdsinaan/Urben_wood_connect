import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/api";

function EditProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    category: "",
    image: "",
    newPrice: "",
    oldPrice: "",
    description: "",
    rating: "",
    reviews: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/Product/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
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

    const requiredFields = [
      "name",
      "category",
      "image",
      "newPrice",
      "oldPrice",
      "description",
      "rating",
      "reviews",
    ];

    const hasEmptyFields = requiredFields.some(
      (field) => product[field] === "" || product[field] === null
    );

    if (hasEmptyFields) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await api.patch(`/api/Product/Update/${id}`, product);
      alert("Product modified successfully");
      navigate("/AdminProducts");
    } catch (error) {
      console.error("Error modifying product:", error);
      alert("An error occurred while modifying the product.");
    }
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow">
      <h2 className="text-lg font-semibold text-center mb-4">Update Product</h2>

      {product.image && (
        <img
          src={product.image}
          alt="Preview"
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}

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
            type="number"
            name="newPrice"
            value={product.newPrice}
            onChange={handleChange}
            placeholder="New Price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Old Price:</label>
          <input
            className="w-full border p-2 rounded"
            type="number"
            name="oldPrice"
            value={product.oldPrice}
            onChange={handleChange}
            placeholder="Old Price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description:</label>
          <textarea
            className="w-full border p-2 rounded"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Rating (1–5):</label>
          <input
            className="w-full border p-2 rounded"
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            placeholder="Rating"
            min="1"
            max="5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Number of Reviews:</label>
          <input
            className="w-full border p-2 rounded"
            type="number"
            name="reviews"
            value={product.reviews}
            onChange={handleChange}
            placeholder="Reviews"
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
