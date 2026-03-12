// counter.model.js
import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // ime sekvence, npr. "playerId"
    seq: { type: Number, default: 0 }
});

export const Counter = mongoose.model("Counter", counterSchema);