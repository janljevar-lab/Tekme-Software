import mongoose, { Schema } from "mongoose";
import { Igralec } from "./igralec.model.js";

const tekmaSchema = new Schema(
    {
        datum: { type: Date, required: false, default: Date.now },
        rezultat: { type: String, required: true },
        igralec1: {
            idNumber: { type: Number },
            ime: { type: String, required: true },
            priimek: { type: String, required: true },
            datumRojstva: { type: Date },
            drzava: { type: String }
        },
        igralec2: {
            idNumber: { type: Number },
            ime: { type: String, required: true },
            priimek: { type: String, required: true },
            datumRojstva: { type: Date },
            drzava: { type: String }
        }
    },
    { timestamps: true }
);

// poišče ostale podatke playerja na podlagi imena in priimka, če idNumber ni podan
tekmaSchema.pre("save", async function() {
    const igralci = ["igralec1", "igralec2"];
    for (const polje of igralci) {
        const player = this[polje];
        if (!player.idNumber) {
            const fullPlayer = await Igralec.findOne({ ime: player.ime, priimek: player.priimek });
            if (fullPlayer) {
                player.idNumber = fullPlayer.idNumber;
                player.datumRojstva = fullPlayer.datumRojstva;
                player.drzava = fullPlayer.drzava;
            } else {
                throw new Error(`Igralec ${player.ime} ${player.priimek} ne obstaja v bazi`);
            }
        }
    }
});

export const Tekma = mongoose.model("Tekma", tekmaSchema);