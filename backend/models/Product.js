import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    region: { type: String, required: true },
    artist: { type: String, required: true },
  });

const Product = mongoose.model("Product", productSchema);
export default Product;
