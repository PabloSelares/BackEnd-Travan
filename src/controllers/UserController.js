import User from '../models/UserModel.js';
import iaService from '../services/IaService.js';

const userController = {
    getById: async (req, res) => {
        try {
            const result = await User.getById(req.params.id);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const result = await User.update(req.params.id, req.body);
            res.status(200).json({ message: 'User updated successfully', result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            await User.delete(req.params.id);
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const result = await User.create(req.body);
            res.status(201).json({ message: 'User created successfully', result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    talkwithGemini: async (req, res) => {
        try {
            const result = await iaService.prompt(req.body.prompt);
            res.status(200).json({ message: 'Resposta do Gemini', result });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    longContext: async (req, res) => {
        try {
            const pdfPath = './src/context/pabloselares.pdf';
            const result = await iaService.longContext(req.body.prompt, pdfPath);
            res.status(200).json({ message: result.text() });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default userController;
