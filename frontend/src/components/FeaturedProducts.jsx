import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom"; // Use react-router for links

const products = [
  { id: 1, name: "Assamese Muga Silk Saree", price: 249.99, image: "https://th.bing.com/th/id/OIG3.rQGIOMf9hLfURoqygtxd?pid=ImgGn", region: "Assam", category: "Weaving", artisan: "Lakshmi Devi", isNew: true },
  { id: 2, name: "Bamboo Table Lamp", price: 59.99, image: "https://th.bing.com/th/id/OIG2.oBspiepQr4jC3sNh6uJF?pid=ImgGn", region: "Manipur", category: "Bamboo Craft", artisan: "Mohan Singh" },
  { id: 3, name: "Naga Tribal Wooden Mask", price: 129.99, image: "https://th.bing.com/th/id/OIG1.UIt9Ele6hC0q69KD4.cu?pid=ImgGn", region: "Nagaland", category: "Wood Carving", artisan: "Temjen Ao" },
  { id: 4, name: "Khasi Handwoven Basket", price: 45.99, image: "https://th.bing.com/th/id/OIG3.N.4YZra6T4Xm7bPlRCUi?pid=ImgGn", region: "Meghalaya", category: "Cane Craft", artisan: "Sarah Khonglah", isNew: true },
];

function FeaturedProducts() {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter((itemId) => itemId !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="group overflow-hidden border rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
          <div className="relative aspect-square overflow-hidden">
            <Link to={`/products/${product.id}`}>
              <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform transform group-hover:scale-105" />
            </Link>
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">₹{product.price}</p>
            </div>
            <div className="flex justify-between items-center mt-3">
              <button onClick={() => toggleWishlist(product.id)} className="p-2 rounded-full hover:bg-gray-200">
                <Heart className={wishlist.includes(product.id) ? "text-red-500" : "text-gray-400"} />
              </button>
              <button className="p-2 rounded-full bg-black text-white">
                <ShoppingCart />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FeaturedProducts;
