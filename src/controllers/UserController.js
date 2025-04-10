import User from '../models/UserModel.js';
import iaService from '../services/IaService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
            const user = req.body;
            user.password = bcrypt.hashSync(user.password, Number(process.env.ROUNDS));
            const newUser = await User.create(user)
            res.status(201).json({ message: 'User created successfully', newUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }

    },
    talkwithGemini: async (req, res) => {
        try {

            const result = await iaService.prompt(req.body.prompt)
            res.status(200).json({ response: result });

        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    longContext: async (req, res) => {
        try {
            const pdfPath = './src/context/pabloselares.pdf' // Corrigido: `pdfpath` para `pdfPath` (parâmetro)
            const result = await iaService.longContext(req.body.prompt, pdfPath);
            res.status(200).json({ message: result.text() });
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = (req.body);
            const userResult = await User.findOne({ email: email });
            if (!userResult) throw new Error('Credenciais invalidos');
            const { __v, _id,...user } = userResult.toObject();
            const senhaIsValid = await bcrypt.compare(password, userResult.password);
            if (!senhaIsValid) throw new Error('Credenciais invalidos');

            const token = jwt.sign(user, process.env.SECRET, { expiresIn: '3h' })
            res.status(200).json({ message: 'Login realizado com sucesso!', token: token, user: user });

        } catch (e) {
            res.status(401).json({ message: "Falha no login", error: e.message });
         }
    }
};

export default userController;
