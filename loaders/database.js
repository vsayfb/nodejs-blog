import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("db connected.");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB;
