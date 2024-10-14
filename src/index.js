"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const middleware_1 = require("./middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
let users = [];
// Crear usuario
app.post('/users', (req, res) => {
    const { dpi, name, email, password } = req.body;
    if (users.some(user => user.dpi === dpi)) {
        return res.status(400).json({ error: 'El DPI ya está registrado.' });
    }
    const newUser = { dpi, name, email, password };
    users.push(newUser);
    res.status(201).json(newUser);
});
// Listar usuarios
app.get('/users', middleware_1.authenticateToken, (req, res) => {
    res.status(200).json(users);
});
// Actualizar usuario
app.put('/users/:dpi', middleware_1.authenticateToken, (req, res) => {
    const { dpi } = req.params;
    const { name, email, password, newDpi } = req.body;
    const userIndex = users.findIndex(user => user.dpi === dpi);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    if (newDpi && users.some(user => user.dpi === newDpi)) {
        return res.status(400).json({ error: 'El nuevo DPI ya está registrado.' });
    }
    users[userIndex] = Object.assign(Object.assign({}, users[userIndex]), { dpi: newDpi || dpi, name, email, password });
    res.status(200).json(users[userIndex]);
});
// Eliminar usuario
app.delete('/users/:dpi', middleware_1.authenticateToken, (req, res) => {
    const { dpi } = req.params;
    const userIndex = users.findIndex(user => user.dpi === dpi);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    users.splice(userIndex, 1);
    res.status(200).json({ message: 'Usuario eliminado.' });
});
// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Credenciales incorrectas.' });
    }
    const token = jsonwebtoken_1.default.sign({ id: user.dpi, email: user.email }, process.env.JWT_SECRET, { expiresIn: '20m' });
    res.json({ token });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
