import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  // Load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => console.log("Razorpay script loaded.");
      script.onerror = () => console.error("Error loading Razorpay script.");
      document.body.appendChild(script);
    };

    loadRazorpayScript();
  }, []);

  // Razorpay handler
  const handleRazorpay = () => {
    if (typeof window.Razorpay === "undefined") {
      alert("Razorpay SDK not loaded. Please check the script.");
      return;
    }

    const options = {
      key: "rzp_test_1234567890abcdef", // Dummy key
      amount: 10000, // ₹100 (in paise)
      currency: "INR",
      name: "Demo Store",
      description: "Test Transaction",
      handler: (response) => {
        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        navigate("/"); // Redirect after successful payment
      },
      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Proceed to Payment</h2>
        <button
          onClick={handleRazorpay}
          className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Pay with Razorpay
        </button>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Payment;
