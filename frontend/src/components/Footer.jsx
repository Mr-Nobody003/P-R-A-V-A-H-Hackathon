import { Link } from "react-router-dom";
import { Facebook, Instagram, Package2, Twitter, Youtube } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-stone-100">
      <div className="container px-4 md:px-6 py-12 md:py-16">
        {/* Register as an artisan text */}
        <div className="text-center mb-6">
          <Link
            to="/admin/artisian_registration"
            className="text-amber-600 font-semibold hover:underline"
          >
            Register as an artisan
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Social Links */}
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 font-semibold mb-4 hover:text-amber-600 transition-colors"
            >
              <Package2 className="h-6 w-6" />
              <span>Northeast Crafts</span>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Preserving and promoting the rich cultural heritage of Northeast
              India through authentic handcrafted products.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Instagram, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Youtube, href: "#" },
              ].map(({ Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  className="p-2 rounded-full bg-gray-200 hover:bg-amber-600 hover:text-white transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Section */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">Shop</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/products", text: "All Products" },
                { to: "/categories/weaving", text: "Weaving" },
                { to: "/categories/bamboo-cane", text: "Bamboo & Cane Craft" },
                { to: "/categories/pottery", text: "Pottery" },
                { to: "/categories/wood-carving", text: "Wood Carving" },
              ].map(({ to, text }, index) => (
                <li key={index}>
                  <Link
                    to={to}
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Section */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">About</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/about", text: "Our Mission" },
                { to: "/artisans", text: "Artisans" },
                { to: "/regions", text: "Regions" },
                { to: "/blog", text: "Blog" },
                { to: "/contact", text: "Contact Us" },
              ].map(({ to, text }, index) => (
                <li key={index}>
                  <Link
                    to={to}
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Section */}
          <div>
            <h3 className="font-semibold mb-4 text-gray-800">
              Customer Service
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/shipping", text: "Shipping & Delivery" },
                { to: "/returns", text: "Returns & Exchanges" },
                { to: "/faq", text: "FAQ" },
                { to: "/privacy", text: "Privacy Policy" },
                { to: "/terms", text: "Terms & Conditions" },
              ].map(({ to, text }, index) => (
                <li key={index}>
                  <Link
                    to={to}
                    className="text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Separator */}
        <hr className="my-8 border-gray-300" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Northeast Crafts. All rights
            reserved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <p className="text-sm text-gray-600">Subscribe to our newsletter</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-auto max-w-[240px] p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-600"
              />
              <button className="p-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


