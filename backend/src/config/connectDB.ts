import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;

export default async function connectDB() {
  if (!MONGO_URI) {
    throw new Error("MONGO_URI missing in environment");
  }
  try {
    const db = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
