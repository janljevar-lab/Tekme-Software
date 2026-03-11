import { Igralec } from "../models/igralec.model.js";
export const igralciSchema = async (req, res) => {
    try {
        const { ime, priimek, datumRojstva, drzava } = req.body;

        return res.status(201).json({
            message: 'Igralec created successfully',
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}