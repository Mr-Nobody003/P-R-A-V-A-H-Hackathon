import { useAuth } from "../AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState(null);

  // Address State
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  // API URL
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5556";
  const token = localStorage.getItem("token");

  // Fetch Cart Items
  useEffect(() => {
    const fetchCartItems = async () => {
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
        console.error("Error fetching cart items:", err);
        setError("Error fetching cart items. Please try again later.");
      }
    };

    if (token) {
      fetchCartItems();
    }
  }, [token]);

  // Calculate total price
  const totalSum = cartItems.reduce((sum, product) => sum + product.price, 0);

  // Handle Order Placement
  const placeOrder = async () => {
    setLoading(true);

    const orderDetails = {
      products: cartItems.map((product) => ({
        productId: product._id,
      })),
      address,
    };

    try {
      const response = await fetch(`${API_URL}/api/orders/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(orderDetails),
      });

      const data = await response.json();

      if (response.ok) {
        setInvoice(data);
        setCartItems([]);
      } else {
        setError(data.error || "Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error("Error placing order:", err);
      setError("Error placing order. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // If invoice is available, show invoice
  if (invoice) {
    return (
      <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg mt-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Invoice</h2>
        <div className="mb-4">
          <p>
            <strong>Order ID:</strong> {invoice.orderId}
          </p>
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Address:</strong> {invoice.address.street}, {invoice.address.city},{" "}
            {invoice.address.state} - {invoice.address.postalCode},{" "}
            {invoice.address.country}
          </p>
        </div>

        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
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
            {invoice.products.map((product, index) => (
              <tr key={index}>
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
                ₹{invoice.totalAmount.toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>

        <button
          onClick={() => navigate("/payment")}
          className="mt-6 bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Proceed to payment
        </button>
      </div>
    );
  }

  // Render Checkout Page
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      {/* Order Summary */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
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
      </div>

      {/* Address Form */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h3 className="text-xl font-bold mb-4">Shipping Details</h3>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Street:</label>
          <input
            type="text"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Enter street"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">City:</label>
          <input
            type="text"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Enter city"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">State:</label>
          <input
            type="text"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Enter state"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Postal Code:</label>
          <input
            type="text"
            value={address.postalCode}
            onChange={(e) =>
              setAddress({ ...address, postalCode: e.target.value })
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Enter postal code"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Country:</label>
          <input
            type="text"
            value={address.country}
            onChange={(e) => setAddress({ ...address, country: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Enter country"
          />
        </div>

        {/* Buy Button */}
        <button
          onClick={placeOrder}
          disabled={loading}
          className={`bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300 ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {loading ? "Placing Order..." : "Buy"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;




