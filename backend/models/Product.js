import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String },
  region: { type: String, required: true },
  likes: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  artisan: { type: mongoose.Schema.Types.ObjectId, ref: "Artisan" } // Relation to Artisan
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;
