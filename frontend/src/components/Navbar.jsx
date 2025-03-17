import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Northeast Crafts</Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <Link to="/artisans" className="hover:text-blue-600">Artisans</Link>
          <Link to="/region" className="hover:text-blue-600">Region</Link>
          <Link to="/about" className="hover:text-blue-600">About</Link>

          {/* Cart Icon */}
          <Link to="/cart" className="hover:text-blue-600 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z"/>
            </svg>
          </Link>

          {/* Language Selector */}
          <select
            onChange={(e) => changeLanguage(e.target.value)}
            value={i18n.language}
            className="p-2 border rounded"
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="as">অসমীয়া</option>
            <option value="ko">Kokborok</option>
            <option value="bn">বাংলা</option>
          </select>

          {/* Authentication */}
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="hover:text-blue-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                  <path d="M480-480q-79 0-134.5-55.5T290-670q0-79 55.5-134.5T480-860q79 0 134.5 55.5T670-670q0 79-55.5 134.5T480-480Zm0 80q108 0 182-74t74-182q0-108-74-182T480-780q-108 0-182 74t-74 182q0 108 74 182t182 74Zm0 360q-132 0-252-50t-220-138q-10-9-10-22t10-22q98-88 220-138t252-50q132 0 252 50t220 138q10 9 10 22t-10 22q-98 88-220 138t-252 50Zm0-80q108 0 206.5-38.5T872-295q-85-70-183.5-108.5T480-442q-108 0-206.5 38.5T88-295q85 70 183.5 108.5T480-148Z"/>
                </svg>
              </Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
