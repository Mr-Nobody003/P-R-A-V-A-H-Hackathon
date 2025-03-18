import mongoose from "mongoose";

const registerArtisanSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const registerArtisan = mongoose.model("RegisterArtisan", registerArtisanSchema);

export default registerArtisan;
