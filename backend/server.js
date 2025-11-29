import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI missing");
  process.exit(1);
}

await connectDB(process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`🚀 AI Resume backend running on port ${PORT}`);
});
