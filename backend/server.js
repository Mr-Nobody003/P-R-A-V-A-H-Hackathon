import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import Artisan from "./models/Artisian.js";
dotenv.config();

const app = express();
app.use(express.json()); // Middleware for JSON
app.use(cors({
  origin: "http://localhost:5000",
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

// Get all products
app.get("/api/products", async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
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
      const { name, category, price, image, description, artisanId } = req.body;
  
      if (!name || !category || !price || !image || !artisanId) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      // Check if artisan exists
      const artisan = await Artisan.findById(artisanId);
      if (!artisan) return res.status(404).json({ message: "Artisan not found" });
  
      // Create new product
      const newProduct = new Product({
        name,
        category,
        price,
        image,
        description,
        artisan: artisanId, // Associate product with artisan
      });
  
      const savedProduct = await newProduct.save();
  
      // Add product to artisan's product list
      artisan.products.push(savedProduct._id);
      await artisan.save();
  
      res.status(201).json(savedProduct);
    } catch (err) {
      res.status(500).json({ message: "Error saving product" });
    }
  });
  
  
  // Get all artisans
app.get("/api/artisans", async (req, res) => {
  try {
    const artisans = await Artisan.find().populate("products"); // Populate related products
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

    // Check if all required fields are provided
    if (!name || !craft || !location || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create and save new artisan
    const newArtisan = new Artisan({
      name,
      craft,
      location,
      description,
      image,
    });

    const savedArtisan = await newArtisan.save();
    res.status(201).json(savedArtisan);
  } catch (err) {
    res.status(500).json({ message: "Error saving artisan" });
  }
});

  

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });