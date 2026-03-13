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

export const getAllIgralci = async (req, res) => {
    try {
        const igralci = await Igralec.find();
        return res.status(200).json(igralci);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }   
}

export const getIgralecById = async (req, res) => {
    try {
        const { id } = req.params;
        const igralec = await Igralec.findOne({ idNumber: id });
        if (!igralec) {
            return res.status(404).json({ message: 'Player not found' });
        }
        return res.status(200).json(igralec);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export const updateIgralec = async (req, res) => {
    try {
        const { id } = req.params;
        const { ime, priimek, datumRojstva, drzava, točke } = req.body;

        const igralec = await Igralec.findOneAndUpdate(
            { idNumber: id },
            {
                ime,
                priimek,
                datumRojstva,
                drzava,
                ...(točke != null && { $inc: { točke: točke } })
            },
            { new: true }
        );

        if (!igralec) {
            return res.status(404).json({ message: "Player not found" });
        }

        return res.status(200).json({
            message: "Player updated successfully",
            player: igralec
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

export const deleteIgralec = async (req, res) => {
    try {
        const { id } = req.params;
        const igralec = await Igralec.findOneAndDelete({ _id: id });
        if (!igralec) {
            return res.status(404).json({ message: 'Player not found' });
        }
        return res.status(200).json({ message: 'Igralec deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    } 
}

export const deleteAllIgralci = async (req, res) => {
    try {
        await Igralec.deleteMany({});
        return res.status(200).json({ message: 'All players deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}



// Dodajanje dodatnih točk k točkam
export const addTočke = async (req, res) => {
    try {
        const { playerId } = req.params;
        const { dodatneTočke } = req.body;
        const igralec = await Igralec.findOne({ idNumber: playerId });
        if (!igralec) {
            return res.status(404).json({ message: 'Igralec not found' });
        }
        igralec.točke += dodatneTočke;
        await igralec.save();
        return res.status(200).json({ message: 'Points added successfully', data: igralec });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
