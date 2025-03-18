import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  
  const { t } = useTranslation();

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="flex flex-row text-xl items-center font-bold">
          <img
            src="https://b2737668.smushcdn.com/2737668/wp-content/uploads/2023/10/android-chrome-192x192-1.png?lossy=1&strip=1&webp=1"
            alt="Logo"
            className="h-10 w-10 mr-2"
          />
          {t("nav.brand")}
        </Link>

        {/* Hamburger for Mobile */}
      <div className="md:hidden relative" ref={dropdownRef}>
        <button onClick={() => setIsOpen(!isOpen)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Dropdown menu */}
        <div className={`absolute right-0 top-12 bg-white shadow-lg p-4 mt-2 rounded w-64 z-50 ${isOpen ? 'block' : 'hidden'}`}>
          <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 hover:text-blue-600">{t("nav.home")}</Link>
          <Link to="/products" onClick={() => setIsOpen(false)} className="block py-2 hover:text-blue-600">{t("nav.products")}</Link>
          <Link to="/artisans" onClick={() => setIsOpen(false)} className="block py-2 hover:text-blue-600">{t("nav.artisans")}</Link>
          <Link to="/home/region" onClick={() => setIsOpen(false)} className="block py-2 hover:text-blue-600">{t("nav.regions")}</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block py-2 hover:text-blue-600">{t("nav.about")}</Link>
          <Link to="/profile" onClick={() => setIsOpen(false)} className="block py-2 hover:text-blue-600">{t("nav.cart")}</Link>
          {user ? (
            <>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="block py-2 hover:text-blue-600">{t("nav.profile")}</Link>
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="block py-2 text-red-500">{t("nav.logout")}</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="block py-2 text-blue-600">{t("nav.login")}</Link>
          )}
        </div>
      </div>


        {/* Navigation Links for Desktop */}
        <div className="hidden md:flex md:flex-row md:items-center md:space-x-6">
          <Link to="/" className="hover:text-blue-600">{t("nav.home")}</Link>
          <Link to="/products" className="hover:text-blue-600">{t("nav.products")}</Link>
          <Link to="/artisans" className="hover:text-blue-600">{t("nav.artisans")}</Link>
          <Link to="/region" className="hover:text-blue-600">{t("nav.regions")}</Link>
          <Link to="/about" className="hover:text-blue-600">{t("nav.about")}</Link>

          {/* Cart Icon */}
          <Link to="/profile" className="hover:text-blue-600 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
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
            <option value="ko">Kokborok</option>
            <option value="bn">বাংলা</option>
            <option value="te">తెలుగు</option>
            <option value="as">অসমীয়া</option>
          </select>

          {/* Authentication */}
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="hover:text-blue-600">{t("nav.profile")}</Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">{t("nav.logout")}</button>
            </div>
          ) : (
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded">{t("nav.login")}</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
