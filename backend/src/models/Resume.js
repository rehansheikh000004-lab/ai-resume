import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, default: "My Resume" },
  summary: { type: String, default: "" },
  personal: {
    fullName: String,
    jobTitle: String,
    location: String,
    email: String,
    phone: String,
    website: String,
    linkedin: String,
    github: String,
    profileImage: String // path to uploads
  },
  sections: [
    {
      type: { type: String }, // "education" | "experience" | "skills" | "projects"
      items: [mongoose.Schema.Types.Mixed]
    }
  ],
  publicUrlSlug: { type: String, index: true },
  watermark: { type: Boolean, default: true } // watermark for free users
}, { timestamps: true });

export default mongoose.models.Resume || mongoose.model("Resume", resumeSchema);
