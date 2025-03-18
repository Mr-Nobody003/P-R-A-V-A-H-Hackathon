import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage"; // Ensure this matches the Route
import ProductPage from "./pages/ProductPage"; // Import ProductPage
import Footer from "./components/Footer";
import Artisan from "./pages/Artisans";
import Login from "./pages/Login"
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import CategoriesPage from "./pages/CategoriesPage"
import RegionPage from './pages/RegionPage';
import ArtisanPage from "./pages/ArtisanPage"
//import CartPage from "./pages/CartPage";
import "./i18n";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/artisans/:artisanid" element={<ArtisanPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/artisans" element={<Artisan />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/products/:id" element={<ProductPage />} />
        <Route path="/regions/:regionid" element={<RegionPage />} />
        {/* <Route path="/cart" element={<CartPage />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
