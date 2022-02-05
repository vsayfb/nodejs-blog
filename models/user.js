import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    displayName: { type: String },
    role: { type: String, default: "user" },
    password: { type: String },
    lastLogin: { type: Date },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model("User", UserSchema);
