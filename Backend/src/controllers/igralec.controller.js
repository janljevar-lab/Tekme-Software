import { Igralec } from "../models/igralec.model.js";

export const igralciSchema = async (req, res) => {
    try {
        const { ime, priimek, datumRojstva, drzava } = req.body;

        // basic validation
        if (!ime || !priimek) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // check if player already exists
        const existingPlayer = await Igralec.findOne({ ime, priimek });
        if (existingPlayer) {
            return res.status(400).json({ message: 'Player already exists' });
        }

        // create player
        const newPlayer = await Igralec.create({ ime, priimek, datumRojstva, drzava });

        return res.status(201).json({
            message: 'Igralec created successfully',
            player: newPlayer
        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}