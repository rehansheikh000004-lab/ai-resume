import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true, unique: true },
  email:    { type: String, required: true, trim: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  stripeCustomerId: { type: String }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
