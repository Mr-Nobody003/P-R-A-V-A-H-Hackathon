import mongoose from "mongoose";

const ArtisanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  craft: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }] // Relation to products
});

const Artisan = mongoose.model("Artisan", ArtisanSchema);
export default Artisan;
