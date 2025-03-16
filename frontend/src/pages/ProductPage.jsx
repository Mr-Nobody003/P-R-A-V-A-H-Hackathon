import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingBag, FiArrowLeft } from "react-icons/fi";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState(new Set());
  const [cart, setCart] = useState(new Set());

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5556";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading product details...</p>;
  }

  if (error) {
    return (
      <div className="text-center text-gray-600">
        <p>{error}</p>
        <button
          className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          onClick={() => navigate("/products")}
        >
          Back to Products
        </button>
      </div>
    );
  }

  // Toggle Wishlist
  const toggleWishlist = () => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      newWishlist.has(product.id) ? newWishlist.delete(product.id) : newWishlist.add(product.id);
      return newWishlist;
    });
  };

  // Add to Cart
  const addToCart = () => {
    if (window.confirm("Add this item to your cart?")) {
      setCart((prev) => new Set(prev).add(product.id));
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        className="flex items-center gap-2 text-gray-700 hover:text-black transition mb-4"
        onClick={() => navigate("/products")}
      >
        <FiArrowLeft /> Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
          {/* Wishlist Button */}
          <button
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
            onClick={toggleWishlist}
          >
            <FiHeart className={wishlist.has(product.id) ? "text-red-500" : "text-gray-700"} size={24} />
          </button>
        </div>

        {/* Product Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-lg text-gray-600 mt-2">₹{product.price.toFixed(2)}</p>
          <p className="text-gray-700 mt-4">{product.description}</p>

          {/* Product Meta Info */}
          <div className="mt-6 space-y-2 text-sm text-gray-800">
            <p><span className="font-semibold">Category:</span> {product.category}</p>
            <p><span className="font-semibold">Region:</span> {product.region}</p>
            <p><span className="font-semibold">Artist:</span> {product.artist}</p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
              onClick={addToCart}
            >
              <FiShoppingBag /> Add to Cart
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                wishlist.has(product.id) ? "bg-red-500 text-white" : "bg-gray-300 text-gray-900"
              }`}
              onClick={toggleWishlist}
            >
              <FiHeart /> {wishlist.has(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
