// app.js

const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

// routes
const books = require('./routes/api/books');

const app = express();

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

if (process.env.NODE_ENV === 'production'){
    app.use(express.static('mern-stack-app-frontend/build'));

    app.get("/*", (req, res) => {
        res.sendFile(path.join(__dirname, "mern-stack-app-frontend", "build", "index.html"));
    });
}

// use Routes
app.use('/api/books', books);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));