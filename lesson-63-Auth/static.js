const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Налаштування шляху до папки для статичних файлів
app.use(express.static(path.join(__dirname, 'public')));

// Маршрут для головної сторінки
app.get('/', async (req, res, next) => {
    try {
        await Promise.reject(new Error("Can't get the data"));
    } catch (err) {
        next(err);
    }
});


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Internal Server Error");
});

app.listen(port, () => {
    console.log(`Сервер запущено на порту ${port}`);
});