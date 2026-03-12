import mongoose, { Schema } from "mongoose";
import { Counter } from "./counter.model.js"; // import counter

const igralciSchema = new Schema(
    {
        idNumber: { type: Number, unique: true }, // auto-increment ID
        ime: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 50,
        },
        priimek: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            maxLength: 50,
        },
        datumRojstva: {
            type: Date,
            required: false,
        },
        drzava: {
            type: String,
            required: false,
            trim: true,
            minLength: 1,
            maxLength: 50,
        },
        točke: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// pre-save hook za auto-increment
igralciSchema.pre("save", async function() {
    const counter = await Counter.findByIdAndUpdate(
        { _id: "playerId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    this.idNumber = counter.seq;
});
export const Igralec = mongoose.model("Igralec", igralciSchema);