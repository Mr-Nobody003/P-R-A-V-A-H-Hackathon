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
  origin: ["https://northeast-crafts.vercel.app","http://localhost:5000"],
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
// 📌 THIS IS THE CORRECTED ROUTE FOR GETTING ALL PRODUCTS
// =================================================================
app.get("/api/products", async (req, res) => {
  try {
    // 1. BUILD FILTER QUERY OBJECT
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

    // 2. BUILD SORT OPTIONS OBJECT
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
    
    // 3. EXECUTE THE QUERY WITH FILTERS AND SORTING
    // Pass the filterQuery object to Product.find()
    const products = await Product.find(filterQuery).sort(sortOptions);

    res.json(products);

  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
});
 
// Get a single product by ID (Use MongoDB's `_id`)
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
 
// Add a new product (MongoDB auto-generates `_id`)
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
// 📌 THIS ROUTE IS NO LONGER NEEDED AND CAN BE DELETED
// The main `/api/products` route now handles category filtering.
// =================================================================
/*
app.get("/api/products/category/:category", async (req, res) => {
  // ... this logic is now inside GET /api/products
});
*/

// ... the rest of your code ...

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
  
//signup api
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

//login api
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
  
//Middleware to Verify JWT
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

// ... other routes like cart, orders, etc. ...

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});