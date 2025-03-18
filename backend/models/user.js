import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Array to store products added to cart
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }], // ✅ Array to store placed orders
});

const User = mongoose.model("User", UserSchema);
export default User;

