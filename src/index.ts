import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from './types';
import { authenticateToken } from './middleware';

dotenv.config();

const app = express();
app.use(express.json());

let users: User[] = [];

// Crear usuario
app.post('/users', (req: Request, res: Response) => {
  const { dpi, name, email, password } = req.body as User;

  if (users.some(user => user.dpi === dpi)) {
    return res.status(400).json({ error: 'El DPI ya está registrado.' });
  }

  const newUser: User = { dpi, name, email, password };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Listar usuarios
app.get('/users', authenticateToken, (req: Request, res: Response) => {
  res.status(200).json(users);
});

// Actualizar usuario
app.put('/users/:dpi', authenticateToken, (req: Request, res: Response) => {
  const { dpi } = req.params;
  const { name, email, password, newDpi } = req.body as Partial<User>;

  const userIndex = users.findIndex(user => user.dpi === dpi);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado.' });
  }

  if (newDpi && users.some(user => user.dpi === newDpi)) {
    return res.status(400).json({ error: 'El nuevo DPI ya está registrado.' });
  }

  users[userIndex] = { ...users[userIndex], dpi: newDpi || dpi, name, email, password };
  res.status(200).json(users[userIndex]);
});

// Eliminar usuario
app.delete('/users/:dpi', authenticateToken, (req: Request, res: Response) => {
  const { dpi } = req.params;

  const userIndex = users.findIndex(user => user.dpi === dpi);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado.' });
  }

  users.splice(userIndex, 1);
  res.status(200).json({ message: 'Usuario eliminado.' });
});

// Login
app.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = users.find(user => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales incorrectas.' });
  }

  const token = jwt.sign({ id: user.dpi, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '20m' });
  res.json({ token });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
