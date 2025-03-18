import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiMessageSquare } from "react-icons/fi";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    region: "",
    artist: "",
    priceRange: [0, 100000], // Min-Max Price
  });

  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5556";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products`);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        console.log(data); // 🔥 Check how many products you receive
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 📌 Toggle Wishlist
  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // 📌 Filter & Sort Products
  const filteredProducts = products
    .filter((product) => {
      return (
        (filters.category === "" || product.category === filters.category) &&
        (filters.region === "" || product.region === filters.region) &&
        (filters.artist === "" || product.artist === filters.artist) &&
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
      );
    })
    .sort((a, b) => {
      if (sortBy === "priceLowHigh") return a.price - b.price;
      if (sortBy === "priceHighLow") return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Explore Handcrafted Treasures
      </h1>

      {/* Loading & Error Handling */}
      {loading && <p className="text-center text-gray-600">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

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
            max={100000}
            step={10}
            value={filters.priceRange}
            onChange={(value) => setFilters({ ...filters, priceRange: value })}
            trackStyle={[{ backgroundColor: "#4CAF50" }]}
            handleStyle={[{ borderColor: "#4CAF50" }, { borderColor: "#4CAF50" }]}
          />
        </div>

        {/* Sorting */}
        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="">Sort By</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
        </select>

        {/* Category Filter */}
        <select
          name="category"
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
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
          onChange={(e) => setFilters({ ...filters, region: e.target.value })}
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
                  <span
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={() => toggleWishlist(product._id)}
                  >
                    <FiHeart className={wishlist.includes(product._id) ? "text-red-500" : "text-gray-400"} />
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
