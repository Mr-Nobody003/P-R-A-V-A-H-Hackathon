import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5556";

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      // Optional: If backend sends token or data, you can parse it
      // const data = await res.json();

      await login(email, password); // your context login logic
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-300 to-blue-400">
      <form onSubmit={handleLogin} className="p-8 bg-white shadow-lg rounded-lg w-96 border-2 border-green-600">
        <h2 className="text-2xl font-bold text-center text-green-800 mb-6">Welcome to Northeast Crafts</h2>
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
        <button type="submit" className="bg-green-700 hover:bg-green-800 text-white p-3 w-full rounded-md">Login</button>
        
        <p className="mt-4 text-center text-gray-700">
          Don't have an account? <Link to="/signup" className="text-green-700 font-bold">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
