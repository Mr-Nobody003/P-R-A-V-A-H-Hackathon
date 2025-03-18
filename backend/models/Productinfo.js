// models/ProductInfo.js
import mongoose from "mongoose";

const productInfoSchema = new mongoose.Schema({
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Product", 
    required: true 
  },
  info: { 
    type: String, 
    required: true 
  },
}, { timestamps: true });

export default mongoose.model("ProductInfo", productInfoSchema);
