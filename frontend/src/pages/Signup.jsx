import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5556";

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Signup failed", errorData);
        return;
      }

      navigate("/login"); // Redirect to login after successful signup
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-300 to-blue-400">
      <form onSubmit={handleSignup} className="p-8 bg-white shadow-lg rounded-lg w-96 border-2 border-green-600">
        <h2 className="text-2xl font-bold text-center text-green-800 mb-6">Create Your Account</h2>
        
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <button type="submit" className="bg-green-700 hover:bg-green-800 text-white p-3 w-full rounded-md">Sign Up</button>
        
        <p className="mt-4 text-center text-gray-700">
          Already have an account? <Link to="/login" className="text-green-700 font-bold">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
