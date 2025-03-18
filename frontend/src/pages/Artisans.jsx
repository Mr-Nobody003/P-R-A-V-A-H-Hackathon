import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Artisan = () => {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5556";

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/artisans`);
        setArtisans(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch artisans");
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 py-12 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Meet Our Artisans
        </h2>

        {loading && <p className="text-center text-gray-600">Loading artisans...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && artisans.length === 0 && (
          <p className="text-center text-gray-600">No artisans found.</p>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisans.map((artisan) => (
            <div
              key={artisan._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                {artisan.image ? (
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">Image Not Available</span>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold">{artisan.name}</h3>
                <p className="text-amber-600 font-medium">{artisan.craft}</p>
                <p className="text-sm text-gray-500">{artisan.location}</p>
                <p className="text-gray-700 mt-2">{artisan.description}</p>

                <Link
                  to={`/artisans/${artisan._id}`}
                  className="text-amber-600 mt-4 inline-block font-medium hover:underline"
                >
                  Read full story →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg">
            Discover More Artisans
          </button>
        </div>
      </div>
    </div>
  );
};

export default Artisan;
