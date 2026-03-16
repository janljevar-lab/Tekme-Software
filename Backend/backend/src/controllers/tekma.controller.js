import { Tekma } from '../models/tekma.model.js';

// Ustvari novo tekmo
export const createTekma = async (req, res) => {
    try {
        const { igralec1, igralec2, rezultat1, rezultat2 } = req.body;

        if (!igralec1 || !igralec2) {
            return res.status(400).json({ message: 'Please provide both player IDs' });
        }

        const tekma = new Tekma({
            igralec1,
            igralec2,
            rezultat1: rezultat1 ?? 0,
            rezultat2: rezultat2 ?? 0
        });

        await tekma.save();
        return res.status(201).json({ message: 'Tekma created successfully', data: tekma });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

// Vse tekme
export const getAllTekme = async (req, res) => {
    try {
        // populate, če želiš prikaz imena in priimka
        const tekme = await Tekma.find()
            .populate('igralec1', 'ime priimek')
            .populate('igralec2', 'ime priimek');
        return res.status(200).json(tekme);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }   
}

// Tekme po igralcu
export const getByPlayer = async (req, res) => {
    try {
        const { playerId } = req.params;
        const tekme = await Tekma.find({
            $or: [
                { igralec1: playerId },
                { igralec2: playerId }
            ]
        })
        .populate('igralec1', 'ime priimek')
        .populate('igralec2', 'ime priimek');
        return res.status(200).json(tekme);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

// Izbriši posamezno tekmo
export const deleteTekma = async (req, res) => {
    try {
        const { id } = req.params;
        const tekma = await Tekma.findByIdAndDelete(id);
        if (!tekma) return res.status(404).json({ message: 'Tekma not found' });
        return res.status(200).json({ message: 'Tekma deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

// Posodobi tekmo
export const updateTekma = async (req, res) => {
    try {
        const { id } = req.params;
        const { igralec1, igralec2, rezultat1, rezultat2 } = req.body;
        const tekma = await Tekma.findByIdAndUpdate(
            id,
            { igralec1, igralec2, rezultat1, rezultat2 },
            { new: true }
        );
        if (!tekma) return res.status(404).json({ message: 'Tekma not found' });
        return res.status(200).json({ message: 'Tekma updated successfully', data: tekma });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

// Izbriši vse tekme
export const deleteAllTekma = async (req, res) => {
    try {
        await Tekma.deleteMany({});
        return res.status(200).json({ message: 'All games deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}