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
import ArtisanPage from "./pages/ArtisanPage";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
//import CartPage from "./pages/CartPage";



import ArtisanRegistration from "./admin_page/RegisterArtisian";
import Artisans_profile from "./admin_page/Artisans_profile";

import "./i18n";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>


      <Route path="/payment" element={<Payment />} />
        <Route path="/checkout" element={< Checkout/>} />
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
        <Route path="/admin/artisian_registration" element={<ArtisanRegistration />} />
        <Route path="/admin/artisans_profile" element={<Artisans_profile />} />
         
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
