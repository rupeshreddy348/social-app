const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MySecureP@ss1',
    database: 'social_app'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve the sign-up page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Handle user sign-up
app.post('/user/signup', (req, res) => {
    const { username, password } = req.body;

    // Basic validation (should be improved)
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error during sign-up:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Successful sign-up, redirect to login page
        res.redirect('/');
    });
});

// Handle the login form submission
app.post('/user/login', (req, res) => {
    const { username, password } = req.body;

    // Here, you should implement your user authentication logic.
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error during query execution:', err);
            return res.status(500).send('Internal Server Error');
        }

        if (results.length > 0) {
            // Successful login, redirect to home page
            res.sendFile(path.join(__dirname, 'public', 'home.html'));
        } else {
            // Invalid credentials
            res.send('Invalid username or password. <a href="/">Try again</a>.');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
