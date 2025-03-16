import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiHeart, FiSearch, FiShoppingBag, FiMessageSquare } from "react-icons/fi";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    region: "",
    artist: "",
    priceRange: [0, 500], // Min-Max Price
  });

  const navigate = useNavigate();

  // 📌 Fetch Products from Backend
  useEffect(() => {
    axios
      .get("http://localhost:5556/api/products") // Backend API
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // 📌 Toggle Wishlist
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 📌 Sorting Function
  const handleSort = (e) => {
    const value = e.target.value;
    setSortBy(value);
    let sortedProducts = [...products];

    if (value === "priceLowHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === "priceHighLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setProducts(sortedProducts);
  };

  // 📌 Filter Change Function
  const handleFilter = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 📌 Handle Price Range Change
  const handlePriceChange = (value) => {
    setFilters({ ...filters, priceRange: value });
  };

  // 📌 Filter & Sort Products
  const filteredProducts = products.filter((product) => {
    return (
      (filters.category === "" || product.category === filters.category) &&
      (filters.region === "" || product.region === filters.region) &&
      (filters.artist === "" || product.artist === filters.artist) &&
      product.price >= filters.priceRange[0] &&
      product.price <= filters.priceRange[1]
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Explore Handcrafted Treasures
      </h1>

      {/* Sorting & Filtering Options */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        {/* Price Range Slider */}
        <div className="flex flex-col items-center w-64">
          <label className="text-sm text-gray-700">
            Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
          </label>
          <Slider
            range
            min={0}
            max={500}
            step={10}
            value={filters.priceRange}
            onChange={handlePriceChange}
            trackStyle={[{ backgroundColor: "#4CAF50" }]}
            handleStyle={[{ borderColor: "#4CAF50" }, { borderColor: "#4CAF50" }]}
          />
        </div>

        {/* Sorting */}
        <select
          onChange={handleSort}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">Sort By</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
        </select>

        {/* Category Filter */}
        <select
          name="category"
          onChange={handleFilter}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">All Categories</option>
          <option value="Textiles">Textiles</option>
          <option value="Pottery">Pottery</option>
          <option value="Jewelry">Jewelry</option>
          <option value="Woodwork">Woodwork</option>
          <option value="Accessories">Accessories</option>
        </select>

        {/* Region Filter */}
        <select
          name="region"
          onChange={handleFilter}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">All Regions</option>
          <option value="Assam">Assam</option>
          <option value="Nagaland">Nagaland</option>
          <option value="Manipur">Manipur</option>
          <option value="Meghalaya">Meghalaya</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="group relative cursor-pointer overflow-hidden rounded-lg"
              onClick={() => navigate(`/products/${product._id}`)}
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Product Info */}
              <div className="p-2 text-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-600">₹{product.price.toFixed(2)}</p>

                {/* Likes & Comments Count */}
                <div className="flex justify-center gap-4 text-gray-600 text-sm mt-2">
                  <span className="flex items-center gap-1">
                    <FiHeart className="text-red-500" />
                    {product.likes} Likes
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMessageSquare className="text-blue-500" />
                    {product.comments} Comments
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
