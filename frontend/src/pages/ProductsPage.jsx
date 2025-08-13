import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiHeart, FiFilter, FiX, FiShoppingCart } from "react-icons/fi";
import { FaHeart, FaSpinner } from "react-icons/fa"; // FIX: Added FaSpinner
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

//==================================================================
// 1. SKELETON COMPONENT
//==================================================================
const SkeletonCard = () => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
        <div className="w-full h-56 bg-gray-200"></div>
        <div className="p-4 h-40 flex flex-col justify-between">
            <div>
                <div className="h-6 rounded-md bg-gray-200 w-3/4 mb-2"></div>
                <div className="h-4 rounded-md bg-gray-200 w-1/2 mb-4"></div>
            </div>
            <div className="flex justify-between items-center">
                <div className="h-8 rounded-md bg-gray-200 w-1/3"></div>
                <div className="h-12 w-12 rounded-lg bg-gray-200"></div>
            </div>
        </div>
    </div>
);

//==================================================================
// 2. PRODUCT CARD COMPONENT
//==================================================================
const ProductCard = ({ product, isWishlisted, onWishlistToggle, onAddToCart, onNavigate, isAddToCartDisabled, isAddingToCart }) => {
    const handleWishlistClick = (e) => {
        e.stopPropagation();
        onWishlistToggle(product._id);
    };

    const handleAddToCartClick = (e) => {
        e.stopPropagation();
        onAddToCart(product);
    };

    return (
        <div
            className="bg-white rounded-xl shadow-md overflow-hidden group relative cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            onClick={() => onNavigate(product._id)}
        >
            <div className="relative">
                <img
                    src={product.image || "https://via.placeholder.com/400"}
                    alt={product.name}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full">
                    {product.category}
                </span>
                <button
                    onClick={handleWishlistClick}
                    className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-2.5 transition-all duration-300 hover:bg-white hover:scale-110"
                    aria-label="Toggle Wishlist"
                >
                    {isWishlisted ? <FaHeart className="text-red-500" size={18} /> : <FiHeart className="text-gray-700" size={18} />}
                </button>
            </div>
            <div className="p-4 flex flex-col justify-between h-40">
                <div>
                    <h3 className="text-lg font-bold text-gray-800 truncate" title={product.name}>
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">by {product.region || 'Artisan'}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-2xl font-black text-gray-900">
                        ₹{product.price.toLocaleString()}
                    </p>
                    {/* FIX: Updated button to show spinner during API call */}
                    <button
                        onClick={handleAddToCartClick}
                        className={`text-white rounded-lg p-3 transition-colors duration-300 w-12 h-12 flex items-center justify-center ${
                            isAddToCartDisabled 
                                ? 'cursor-not-allowed bg-gray-400' 
                                : isAddingToCart
                                ? 'cursor-wait bg-teal-600'
                                : 'bg-gray-800 hover:bg-teal-600'
                        }`}
                        aria-label={isAddToCartDisabled ? "Please log in to add to cart" : "Add to Cart"}
                        disabled={isAddToCartDisabled || isAddingToCart}
                    >
                        {isAddingToCart ? <FaSpinner className="animate-spin" size={20} /> : <FiShoppingCart size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

//==================================================================
// 3. FILTER SIDEBAR COMPONENT
//==================================================================
const FilterSidebar = ({ filters, onFilterChange, onPriceChange, onClearFilters }) => {
    const categories = ["Textiles", "Pottery", "Jewelry", "Woodwork", "Accessories"];
    const regions = ["Assam", "Nagaland", "Manipur", "Meghalaya"];
    const sliderValue = [Number(filters.minPrice) || 0, Number(filters.maxPrice) || 100000];
    
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Category</h3>
                <div className="space-y-2">
                    {categories.map(cat => (
                        <button key={cat} onClick={() => onFilterChange('category', cat)}
                            className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${filters.category === cat ? 'bg-teal-600 text-white font-semibold' : 'hover:bg-gray-100'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Region</h3>
                <div className="space-y-2">
                    {regions.map(reg => (
                        <button key={reg} onClick={() => onFilterChange('region', reg)}
                            className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${filters.region === reg ? 'bg-teal-600 text-white font-semibold' : 'hover:bg-gray-100'}`}>
                            {reg}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Price Range</h3>
                <div className="px-1">
                    <Slider
                        range min={0} max={100000} step={1000}
                        value={sliderValue} onChange={onPriceChange}
                        trackStyle={[{ backgroundColor: "#0d9488" }]}
                        handleStyle={[{ borderColor: "#0d9488" }, { borderColor: "#0d9488" }]}
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-2">
                        <span>₹{sliderValue[0].toLocaleString()}</span>
                        <span>₹{sliderValue[1].toLocaleString()}</span>
                    </div>
                </div>
            </div>
            <button
                onClick={onClearFilters}
                className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                Clear All Filters
            </button>
        </div>
    );
};

//==================================================================
// 4. MAIN PRODUCTS PAGE COMPONENT
//==================================================================
const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem("wishlist");
        return saved ? JSON.parse(saved) : [];
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    // FIX: State to track which product is being added to the cart
    const [addingToCartId, setAddingToCartId] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5556";

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError("");
            try {
                const params = new URLSearchParams(location.search);
                if (!params.has('sort')) params.set('sort', 'createdAt_desc');
                const response = await fetch(`${API_URL}/api/products?${params.toString()}`);
                if (!response.ok) throw new Error("Network response was not ok");
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError("Failed to fetch products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [location.search, API_URL]);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (id) => {
        if (!isLoggedIn) {
            alert('Please log in to manage your wishlist.');
            navigate('/login', { state: { from: location } });
            return;
        }
        setWishlist((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    // FIX: Updated handler to call the backend API
    const handleAddToCart = async (product) => {
        if (!isLoggedIn) {
            alert('Please log in to add items to your cart.');
            navigate('/login', { state: { from: location } });
            return;
        }

        setAddingToCartId(product._id); // Start loading spinner

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/api/cart/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token,
                },
                body: JSON.stringify({ productId: product._id }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to add item to cart.');
            }
            
            alert(`${product.name} added to cart!`);

        } catch (err) {
            console.error('Add to cart error:', err);
            alert(`Error: ${err.message}`);
        } finally {
            setAddingToCartId(null); // Stop loading spinner
        }
    };

    const handleFilterChange = (key, value) => {
        const params = new URLSearchParams(location.search);
        if (params.get(key) === value) params.delete(key);
        else params.set(key, value);
        navigate(`/products?${params.toString()}`);
        if (isFilterOpen) setIsFilterOpen(false);
    };

    const handlePriceChange = (value) => {
        const params = new URLSearchParams(location.search);
        params.set('minPrice', value[0]);
        params.set('maxPrice', value[1]);
        navigate(`/products?${params.toString()}`, { replace: true });
    };

    const handleSortChange = (e) => {
        const params = new URLSearchParams(location.search);
        params.set('sort', e.target.value);
        navigate(`/products?${params.toString()}`);
    }

    const clearFilters = () => {
        navigate('/products');
        if (isFilterOpen) setIsFilterOpen(false);
    };

    const currentFilters = Object.fromEntries(new URLSearchParams(location.search));

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                        Our Artisan Collection
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                        Discover unique, handcrafted treasures from talented artisans.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="hidden lg:block w-full lg:w-1/4 xl:w-1/5">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Filters</h2>
                        <FilterSidebar
                            filters={currentFilters} onFilterChange={handleFilterChange}
                            onPriceChange={handlePriceChange} onClearFilters={clearFilters}
                        />
                    </aside>

                    <main className="flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <button
                                onClick={() => setIsFilterOpen(true)}
                                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                                <FiFilter />
                                <span>Filters</span>
                            </button>
                            <div className="text-sm text-gray-600 hidden sm:block">
                                {loading ? 'Searching...' : `${products.length} products found`}
                            </div>
                            <select onChange={handleSortChange} value={currentFilters.sort || 'createdAt_desc'}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                                <option value="createdAt_desc">Newest</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                            </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {loading ? (
                                Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
                            ) : error ? (
                                <p className="col-span-full text-center text-red-500">{error}</p>
                            ) : products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        isWishlisted={wishlist.includes(product._id)}
                                        onWishlistToggle={toggleWishlist}
                                        onNavigate={(id) => navigate(`/products/${id}`)}
                                        onAddToCart={handleAddToCart}
                                        isAddToCartDisabled={!isLoggedIn}
                                        // FIX: Pass loading status to the specific card
                                        isAddingToCart={addingToCartId === product._id}
                                    />
                                ))
                            ) : (
                                <p className="col-span-full text-center text-gray-500">No products match your filters.</p>
                            )}
                        </div>
                    </main>
                </div>
            </div>

            {isFilterOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setIsFilterOpen(false)}
                >
                    <div
                        className="fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white p-6 overflow-y-auto"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
                            <button onClick={() => setIsFilterOpen(false)} className="p-1"><FiX size={24} /></button>
                        </div>
                        <FilterSidebar
                            filters={currentFilters} onFilterChange={handleFilterChange}
                            onPriceChange={handlePriceChange} onClearFilters={clearFilters}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductsPage;