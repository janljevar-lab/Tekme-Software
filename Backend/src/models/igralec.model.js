import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const igralciSchema = new Schema(
    {
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
    }, {
    timestamps: true,
}
);


export const Igralec = mongoose.model('Igralec', igralciSchema);