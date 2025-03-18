import { useState } from "react";
import { useNavigate } from "react-router-dom";



const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5556";
const ArtisanRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/register-artisan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok) {
        alert("Registration Successful");
        navigate("/admin/artisans_profile");
      } else {
        alert("Registration Failed");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Artisan Registration</h1>
      <p className="text-gray-600 mb-6">
        Join our platform to showcase your crafts and receive payments directly.
      </p>

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md">
        <div className="mt-4">
          <label className="block font-medium">Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block font-medium">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mt-4">
          <label className="block font-medium">Confirm Password</label>
          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mt-6 text-right">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
            Submit Registration
          </button>
        </div>
      </form>
    </div>
  );
};

export default ArtisanRegistration;

