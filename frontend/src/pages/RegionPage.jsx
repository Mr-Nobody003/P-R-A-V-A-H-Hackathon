import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import ProductCard from "../components/ProductCard";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5556";

const regionImages = {
  assam: "https://th.bing.com/th/id/OIG1.MD8mXsdU4GjmEItVRdCn?w=1024&h=1024&rs=1&pid=ImgDetMain",
  "arunachal-pradesh": "https://th.bing.com/th/id/OIG2.yfMEH.ScYUs3rye6J5f9?pid=ImgGn",
  manipur: "https://th.bing.com/th/id/OIG1.Mw5zBNPmYnAhegc_AJZK?pid=ImgGn",
  meghalaya: "https://th.bing.com/th/id/OIG2.UFP5vGQsZCpJRldCQ0Rr?w=1024&h=1024&rs=1&pid=ImgDetMain",
  mizoram: "https://th.bing.com/th/id/OIG1.v3fCwgXJh2tdkddE_7Uc?pid=ImgGn",
  nagaland: "https://th.bing.com/th/id/OIG2.JnOmMokkl9aucLC.oL3E?pid=ImgGn",
  sikkim: "https://th.bing.com/th/id/OIG2.oIChAGWEuvoMgt.croR8?pid=ImgGn",
  tripura: "https://th.bing.com/th/id/OIG2.BA4iCysMbcVeBn7QBe36?pid=ImgGn",
};

const RegionPage = () => {
  const { regionid } = useParams();
  const navigate = useNavigate();
  const [artisans, setArtisans] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const backgroundImage = regionImages[regionid] || "";

  useEffect(() => {
    const fetchRegionData = async () => {
      try {
        const [artisanRes, productRes] = await Promise.all([
          axios.get(`${API_URL}/api/artisans`),
          axios.get(`${API_URL}/api/products`),
        ]);

        // Filter artisans based on their location (region)
        const filteredArtisans = artisanRes.data.filter(
          (artisan) => artisan.location.toLowerCase() === regionid
        );

        // Filter products based on region
        const filteredProducts = productRes.data.filter(
          (product) => product.region.toLowerCase() === regionid
        );

        setArtisans(filteredArtisans);
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching region data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegionData();
  }, [regionid]);

  if (loading) {
    return <p className="text-center text-gray-600">Loading region data...</p>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center p-8"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Back Button */}
      <button
        className="flex items-center gap-2 text-white bg-black/50 px-4 py-2 rounded-lg hover:bg-black/70"
        onClick={() => navigate("/")}
      >
        <FiArrowLeft /> Back to Home
      </button>

      {/* Region Info */}
      <h1 className="text-4xl font-bold text-white my-8 capitalize">{regionid.replace("-", " ")}</h1>

      {/* Artisans */}
      <div className="bg-white/80 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Artisans from this Region</h2>
        {artisans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {artisans.map((artisan) => (
              <div key={artisan._id} className="bg-white p-4 rounded-lg shadow">
                <img
                  src={artisan.image}
                  alt={artisan.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold">{artisan.name}</h3>
                <p className="text-gray-600">{artisan.craft}</p>
                <p className="mt-2">{artisan.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No artisans found for this region.</p>
        )}
      </div>

      {/* Products */}
      <div className="bg-white/80 p-6 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-semibold mb-4">Products from this Region</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No products available for this region.</p>
        )}
      </div>
    </div>
  );
};

export default RegionPage;
