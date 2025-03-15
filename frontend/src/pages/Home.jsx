import { Link } from "react-router-dom";
import { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import CategoryShowcase from "../components/CategoryShowcase";
import FeaturedProducts from "../components/FeaturedProducts";
import ArtisanStories from "../components/ArtisanStories";
import RegionalHighlights from "../components/RegionalHighlights";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
<section
  className="relative w-full h-[70vh] bg-cover bg-center bg-no-repeat brightness-75 overflow-hidden"
  style={{ backgroundImage: "url('/hero-image.jpg')" }}
>
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:p-8 bg-black/50 backdrop-blur-sm">
    {/* Title with Fade-In Animation */}
    <h1
      className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl opacity-0 animate-fade-in"
    >
      Discover the Artisanal Treasures of Northeast India
    </h1>

    {/* Subtitle with Slide-In Animation */}
    <p
      className="text-lg md:text-xl text-white mb-8 max-w-2xl opacity-0 animate-slide-up"
    >
      Authentic handcrafted products directly from skilled artisans, preserving centuries of tradition
    </p>

    {/* Search & Explore Section */}
    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
      <div className="relative flex-1">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
        <input
          type="text"
          placeholder="Search for crafts, regions, or artisans..."
          className="pl-10 bg-white/90 border border-gray-300 rounded-lg h-12 w-full focus:ring-2 focus:ring-amber-500 transition-all"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Link to="/products">
        <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
          Explore Now
        </button>
      </Link>
    </div>
  </div>
</section>



      {/* Featured Categories */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-amber-50">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Explore Craft Categories</h2>
          <CategoryShowcase />
          <div className="text-center mt-8">
            <Link to="/categories">
              <button className="border border-amber-600 text-amber-600 hover:bg-amber-100 px-6 py-3 rounded-lg flex items-center">
                View All Categories <FaArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <Link to="/products" className="text-amber-600 hover:text-amber-700 font-medium flex items-center">
              View All <FaArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* Artisan Stories */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-stone-100">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Meet Our Artisans</h2>
          <ArtisanStories />
          <div className="text-center mt-8">
            <Link to="/artisans">
              <button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg">
                Discover More Artisans
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Regional Highlights */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Explore Northeast India</h2>
          <RegionalHighlights />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-amber-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Connected</h2>
          <p className="mb-6">Subscribe to receive updates on new artisans, products, and cultural stories</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-white/90 border border-gray-300 text-black h-12 px-4 rounded-lg w-full"
            />
            <button className="bg-stone-800 hover:bg-stone-900 text-white px-6 py-3 rounded-lg">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
