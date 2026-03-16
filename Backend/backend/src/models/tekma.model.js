import mongoose, { Schema } from "mongoose";

const tekmaSchema = new Schema(
  {
    datum: { type: Date, default: Date.now },
    igralec1: {type: String, required: true},
    igralec2: {type: String, required: true},
    rezultat1: { type: Number, default: 0 },
    rezultat2: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Tekma = mongoose.model("Tekma", tekmaSchema);