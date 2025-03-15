import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Footer from "./components/Footer";
//import CartPage from "./pages/CartPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        {/* <Route path="/cart" element={<CartPage />} /> */}
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
