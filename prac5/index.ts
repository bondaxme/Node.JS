const express = require('express');
const { v4: uuidv4 } = require('uuid');

interface User {
  id: string;
  username: string;
  name?: string;
}

const users: User[] = [];

const app = express();
app.use(express.json());

// Створення нового користувача
app.post('/users', (req, res) => {
  const { username, name } = req.body;
  const id = uuidv4();
  const user: User = { id, username, name };
  users.push(user);
  res.status(201).json(user);
});

// Отримання даних користувача за id
app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((u) => u.id === id);
  if (!user) {
    res.sendStatus(404);
  } else {
    res.json(user);
  }
});

// Отримання списку користувачів
app.get('/users', (req, res) => {
  res.json(users);
});

// Оновлення даних користувача за id
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, name } = req.body;
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    res.sendStatus(404);
  } else {
    users[userIndex] = { id, username, name };
    res.sendStatus(204);
  }
});

// Видалення користувача за id
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    res.sendStatus(404);
  } else {
    users.splice(userIndex, 1);
    res.sendStatus(204);
  }
});