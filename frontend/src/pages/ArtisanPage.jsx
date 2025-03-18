import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const ArtisanPage = () => {
  const { artisanid } = useParams();
  const navigate = useNavigate();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5556";

  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/artisans/${artisanid}`);
        setArtisan(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Artisan not found");
      } finally {
        setLoading(false);
      }
    };

    fetchArtisan();
  }, [artisanid]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading artisan details...</p>;
  }

  if (error) {
    return (
      <div className="text-center text-gray-600">
        <p>{error}</p>
        <button
          className="mt-4 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
          onClick={() => navigate("/artisans")}
        >
          Back to Artisans
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        className="flex items-center gap-2 text-gray-700 hover:text-black transition mb-4"
        onClick={() => navigate("/artisans")}
      >
        <FiArrowLeft /> Back to Artisans
      </button>

      {/* Artisan Details */}
      <div className="flex flex-col items-center">
        <img
          src={artisan.image}
          alt={artisan.name}
          className="w-64 h-64 object-cover rounded-full shadow-lg"
        />
        <h1 className="text-3xl font-bold text-gray-800 mt-4">{artisan.name}</h1>
        <p className="text-lg text-gray-600 mt-2">{artisan.craft}</p>
        <p className="text-gray-700 mt-4 text-center">{artisan.description}</p>
        <p className="text-sm text-gray-500 mt-2">
          <strong>Location:</strong> {artisan.location}
        </p>
      </div>

      {/* Artisan Products */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Products by {artisan.name}</h2>
        {artisan.products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {artisan.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ArtisanPage;
