var express = require('express');
var uuidv4 = require('uuid').v4;
var users = [];
var app = express();
app.use(express.json());
// Створення нового користувача
app.post('/users', function (req, res) {
    var _a = req.body, username = _a.username, name = _a.name;
    var id = uuidv4();
    var user = { id: id, username: username, name: name };
    users.push(user);
    res.status(201).json(user);
});
// Отримання даних користувача за id
app.get('/users/:id', function (req, res) {
    var id = req.params.id;
    var user = users.find(function (u) { return u.id === id; });
    if (!user) {
        res.sendStatus(404);
    }
    else {
        res.json(user);
    }
});
// Отримання списку користувачів
app.get('/users', function (req, res) {
    res.json(users);
});
// Оновлення даних користувача за id
app.put('/users/:id', function (req, res) {
    var id = req.params.id;
    var _a = req.body, username = _a.username, name = _a.name;
    var userIndex = users.findIndex(function (u) { return u.id === id; });
    if (userIndex === -1) {
        res.sendStatus(404);
    }
    else {
        users[userIndex] = { id: id, username: username, name: name };
        res.sendStatus(204);
    }
});
// Видалення користувача за id
app.delete('/users/:id', function (req, res) {
    var id = req.params.id;
    var userIndex = users.findIndex(function (u) { return u.id === id; });
    if (userIndex === -1) {
        res.sendStatus(404);
    }
    else {
        users.splice(userIndex, 1);
        res.sendStatus(204);
    }
});
