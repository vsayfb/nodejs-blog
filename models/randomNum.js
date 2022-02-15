import mongoose from "mongoose";

const RandomNum = new mongoose.Schema({
  num: { type: Number },
});

export default mongoose.model("RandomNum", RandomNum);
