import { Tekma } from '../models/tekma.model.js';

export const createTekma = async (req, res) => {
    try {
        const { igralec1, igralec2, rezultat } = req.body;

        if (!igralec1 || !igralec2 || !rezultat) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const tekma = new Tekma({ igralec1, igralec2, rezultat });
        await tekma.save();

        return res.status(201).json({ message: 'Tekma created successfully', data: tekma });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export const getAllTekme = async (req, res) => {
    try {
        const tekme = await Tekma.find();
        return res.status(200).json(tekme);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }   
}

export const getByPlayer = async (req, res) => {
    try {
        const { playerId } = req.params;
        const tekme = await Tekma.find({
            $or: [
                { 'igralec1.idNumber': playerId },
                { 'igralec2.idNumber': playerId }
            ]
        });
        return res.status(200).json(tekme);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export const deleteTekma = async (req, res) => {
    try {
        const { id } = req.params;
        const tekma = await Tekma.findByIdAndDelete(id);
        if (!tekma) {
            return res.status(404).json({ message: 'Tekma not found' });
        }
        return res.status(200).json({ message: 'Tekma deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export const updateTekma = async (req, res) => {
    try {
        const { id } = req.params;
        const { igralec1, igralec2, rezultat } = req.body;
        const tekma = await Tekma.findByIdAndUpdate(
            id,
            { igralec1, igralec2, rezultat },
            { new: true }
        );
        if (!tekma) {
            return res.status(404).json({ message: 'Tekma not found' });
        }
        return res.status(200).json({ message: 'Tekma updated successfully', data: tekma });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export const deleteAllTekma = async (req, res) => {
    try {
        const { id } = req.params;
        const tekma = await Tekma.findByIdAndDelete(id);
        if (!tekma) {
            return res.status(404).json({ message: 'Tekma not found' });
        }
        return res.status(200).json({ message: 'Tekma deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}
