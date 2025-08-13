import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import Artisan from "./models/Artisian.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "./models/user.js";
import Order from "./models/Order.js";
import RegisterArtisan from "./models/registerArtisan.js";
dotenv.config();

const app = express();
app.use(express.json()); // Middleware for JSON

app.use(cors({
  origin: ["https://northeast-crafts.vercel.app", "http://localhost:5000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
const PORT = process.env.PORT || 5556;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Simple API Route
app.get("/", (req, res) => {
  res.send("Hello, E-Commerce API is running!");
});

// =================================================================
// PRODUCTS ROUTES
// =================================================================

// Get all products with filtering and sorting
app.get("/api/products", async (req, res) => {
  try {
    const filterQuery = {};
    if (req.query.category) {
      filterQuery.category = req.query.category;
    }
    if (req.query.region) {
      filterQuery.region = req.query.region;
    }
    if (req.query.minPrice || req.query.maxPrice) {
      filterQuery.price = {};
      if (req.query.minPrice) {
        filterQuery.price.$gte = Number(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        filterQuery.price.$lte = Number(req.query.maxPrice);
      }
    }

    let sortOptions = {};
    switch (req.query.sort) {
      case "price_asc":
        sortOptions = { price: 1 };
        break;
      case "price_desc":
        sortOptions = { price: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
        break;
    }
    
    const products = await Product.find(filterQuery).sort(sortOptions);
    res.json(products);

  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
});
 
// Get a single product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
 
// Add a new product
app.post("/api/products", async (req, res) => {
  try {
    const { name, category, price, image, description, region, likes, comments, artisanId } = req.body;

    if (!name || !category || !price || !image || !region || !artisanId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const artisan = await Artisan.findById(artisanId);
    if (!artisan) return res.status(404).json({ message: "Artisan not found" });

    const newProduct = new Product({
      name, category, price, image, description, region, likes, comments, artisanId,
    });

    const savedProduct = await newProduct.save();

    artisan.products.push(savedProduct._id);
    await artisan.save();

    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error saving product" });
  }
});


// =================================================================
// ARTISAN ROUTES
// =================================================================

// Get all artisans
app.get("/api/artisans", async (req, res) => {
  try {
    const artisans = await Artisan.find().populate("products");
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single artisan by ID
app.get("/api/artisans/:id", async (req, res) => {
  try {
    const artisan = await Artisan.findById(req.params.id).populate("products");
    if (!artisan) return res.status(404).json({ message: "Artisan not found" });
    res.json(artisan);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new artisan
app.post("/api/artisans", async (req, res) => {
  try {
    const { name, craft, location, description, image } = req.body;
    if (!name || !craft || !location || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newArtisan = new Artisan({ name, craft, location, description, image });
    const savedArtisan = await newArtisan.save();
    res.status(201).json(savedArtisan);
  } catch (err) {
    res.status(500).json({ message: "Error saving artisan" });
  }
});
 
// =================================================================
// USER & AUTH ROUTES
// =================================================================

// Signup api
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, cart: [] });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login api
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user._id }, "secretkey", { expiresIn: "1h" });
    res.json({ token, user: { name: user.name, email: user.email, cart: user.cart } });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});
 
// --- ADDED FROM ORIGINAL ---
// Middleware to Verify JWT
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  try {
    const decoded = jwt.verify(token, "secretkey");
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// =================================================================
// CART & ORDER ROUTES
// =================================================================

// --- ADDED FROM ORIGINAL ---
// API to add to cart
app.post("/api/cart/add", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }
    const objectId = new mongoose.Types.ObjectId(productId);

    const product = await Product.findById(objectId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.cart.includes(objectId)) {
      return res.status(400).json({ message: "Product already in cart" });
    }

    user.cart.push(objectId);
    await user.save();

    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// --- ADDED FROM ORIGINAL ---
// API to get shopping cart
app.get("/api/cart", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("cart");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// --- ADDED FROM ORIGINAL ---
// API to place an order
app.post("/api/orders/create", authMiddleware, async (req, res) => {
  try {
    const { products, address } = req.body;
    const userId = req.userId;

    const productIds = products.map((product) => product.productId);
    const foundProducts = await Product.find({ _id: { $in: productIds } });

    if (foundProducts.length !== productIds.length) {
      return res.status(400).json({ error: "Some products not found" });
    }

    const totalAmount = foundProducts.reduce((sum, product) => sum + product.price, 0);

    const newOrder = new Order({
      userId,
      products: productIds,
      totalAmount,
      address,
    });
    await newOrder.save();

    await User.findByIdAndUpdate(
      userId,
      { $push: { orders: newOrder._id } },
      { new: true }
    );

    const invoice = {
      orderId: newOrder._id,
      userId: newOrder.userId,
      products: foundProducts.map((product) => ({
        name: product.name,
        price: product.price,
      })),
      totalAmount: newOrder.totalAmount,
      address: newOrder.address,
      createdAt: newOrder.createdAt,
    };

    res.status(201).json(invoice);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// --- ADDED FROM ORIGINAL ---
// Register Artisan API
app.post("/api/register-artisan", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await RegisterArtisan.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }
    const newArtisan = new RegisterArtisan({ username, password });
    await newArtisan.save();
    res.status(201).json({ message: "Artisan registered successfully" });
  } catch (error) {
    console.error("Error registering artisan:", error);
    res.status(500).json({ message: "Failed to register artisan" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});