import { useAuth } from "../AuthContext";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5556";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!token) {
        setError("Please log in to view your cart.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/api/cart`, {
          method: "GET",
          headers: {
            Authorization: `${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setCartItems(data.cart || []);
        } else {
          setError(data.message || "Failed to load cart items.");
        }
      } catch (err) {
        setError("Error fetching cart items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [token]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading cart items...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  const totalSum = cartItems.reduce((sum, product) => sum + product.price, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Profile</h2>
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Your Cart</h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Cart Summary</h3>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Product Name
                </th>
                <th className="border border-gray-300 px-4 py-2 text-right">
                  Price (₹)
                </th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((product) => (
                <tr key={product._id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-right">
                    ₹{product.price.toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="font-bold bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">Total</td>
                <td className="border border-gray-300 px-4 py-2 text-right">
                  ₹{totalSum.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-6 text-right">
            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;




