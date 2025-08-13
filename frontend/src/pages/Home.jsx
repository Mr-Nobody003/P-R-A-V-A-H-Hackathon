import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import CategoryShowcase from "../components/CategoryShowcase";
import FeaturedProducts from "../components/FeaturedProducts";
import ArtisanStories from "../components/ArtisanStories";
import RegionalHighlights from "../components/RegionalHighlights";

// Import all the images for the slideshow
import Arunachal from '../assets/Arunachal.jpg';
import Assam from '../assets/Assam.jpg';
import Manipur from '../assets/Manipur.jpg';
import Meghalaya from '../assets/Meghalaya.jpeg';
import Mizoram from '../assets/Mizoram.jpeg';
import Nagaland from '../assets/Nagaland.jpg';
import Tripura from '../assets/Tripura.jpeg';

const craftData = [
  { name: "Tripura", image: Tripura },
  { name: "Manipur", image: Manipur },
  { name: "Nagaland", image: Nagaland },
  { name: "Arunachal", image: Arunachal },
  { name: "Meghalaya", image: Meghalaya },
  { name: "Mizoram", image: Mizoram },
  { name: "Assam", image: Assam },
];

const Home = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentCraftIndex, setCurrentCraftIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCraftIndex((prevIndex) => (prevIndex + 1) % craftData.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(timer); // Cleanup the timer
  }, []);

  const currentCraft = craftData[currentCraftIndex];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section
        className="relative w-full h-screen bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: `url(${currentCraft.image})` }}
      >
        {/* A subtle, uniform overlay to help text stand out */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Content container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-4 md:p-8">
          
          {/* Adjusted font size and shadow to match your design */}
          <h1 key={currentCraft.name} className="font-playfair font-bold text-7xl md:text-8xl text-white mb-16 [text-shadow:0_2px_8px_rgba(0,0,0,0.6)] opacity-0 animate-fade-in">
            {currentCraft.name} <span className="text-amber-500">Craft</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
              <input
                type="text"
                placeholder={t("hero.searchPlaceholder")}
                className="pl-10 bg-white/90 border border-gray-300 rounded-lg h-12 w-full focus:ring-2 focus:ring-amber-500 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Link to="/products">
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                {t("hero.exploreButton")}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- Rest of your page code remains the same --- */}
      
      {/* Featured Categories */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-amber-50">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{t("categories.title")}</h2>
          <CategoryShowcase />
          <div className="text-center mt-8">
            <Link to="/categories">
              <button className="border border-amber-600 text-amber-600 hover:bg-amber-100 px-6 py-3 rounded-lg flex items-center">
                {t("categories.viewAll")} <FaArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">{t("featuredProducts.title")}</h2>
            <Link to="/products" className="text-amber-600 hover:text-amber-700 font-medium flex items-center">
              {t("featuredProducts.viewAll")} <FaArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Artisan Stories */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-stone-100">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">{t("artisans.title")}</h2>
          <ArtisanStories />
          <div className="text-center mt-8">
            <Link to="/artisans">
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg">
                {t("artisans.discoverMore")}
              </button>
            </Link>
          </div>
        </div>
      </section>
       {/* Regional highlights */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Explore Northeast India</h2>
          <RegionalHighlights />
        </div>
      </section>
      {/* Newsletter */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-amber-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("newsletter.title")}</h2>
          <p className="mb-6">{t("newsletter.subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t("newsletter.placeholder")}
              className="bg-white/90 border border-gray-300 text-black h-12 px-4 rounded-lg w-full"
            />
            <button className="bg-stone-800 hover:bg-stone-900 text-white px-6 py-3 rounded-lg">
              {t("newsletter.subscribeButton")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;