// Importar Express
const express = require('express');
const app = express();

app.use(express.json());

let users = [];

// Endpoint para crear usuario
app.post('/users', (req, res) => {
    console.log(req.body);  
  
    const { dpi, name, email, password } = req.body;
  
    // Verificar si el DPI ya existe
    const userExists = users.some(user => user.dpi === dpi);
    if (userExists) {
      return res.status(400).json({ error: 'El DPI ya está registrado.' });
    }
  
    // Crear el nuevo usuario
    const newUser = { dpi, name, email, password };
    console.log('Nuevo usuario:', newUser);  
    users.push(newUser);
    res.status(201).json(newUser);
  });

// Endpoint para listar a todos los usuarios
app.get('/users', (req, res) => {
  res.status(200).json(users);
});

// Endpoint para actualizar la información de un usuario 
app.put('/users/:dpi', (req, res) => {
  const { dpi } = req.params;
  const { name, email, password, newDpi } = req.body;

  // Buscar el usuario
  const userIndex = users.findIndex(user => user.dpi === dpi);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado.' });
  }

  // Validar si el nuevo DPI ya existe
  if (newDpi && users.some(user => user.dpi === newDpi)) {
    return res.status(400).json({ error: 'El nuevo DPI ya está registrado.' });
  }

  // Actualizar usuario
  users[userIndex] = { ...users[userIndex], dpi: newDpi || dpi, name, email, password };
  res.status(200).json(users[userIndex]);
});

// Endpoint para eliminar a un usuario 
app.delete('/users/:dpi', (req, res) => {
  const { dpi } = req.params;

  // Buscar el usuario
  const userIndex = users.findIndex(user => user.dpi === dpi);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado.' });
  }

  // Eliminar usuario
  users.splice(userIndex, 1);
  res.status(200).json({ message: 'Usuario eliminado.' });
});

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
