import { Igralec } from "../models/igralec.model.js";
export const igralciSchema = async (req, res) => {
    try {
        const { ime, priimek, datumRojstva, drzava } = req.body;
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}