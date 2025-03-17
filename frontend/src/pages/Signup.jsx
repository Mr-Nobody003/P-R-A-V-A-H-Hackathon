import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5556/api/signup", { name, email, password });
      navigate("/login"); // Redirect to login after successful signup
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSignup} className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Sign Up</h2>
        
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mb-3 w-full"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-3 w-full"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-3 w-full"
          required
        />
        <button type="submit" className="bg-green-500 text-white p-2 w-full">Sign Up</button>
        
        <p className="mt-3 text-center">
          Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
