const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public'))); // Ensure this points to your public directory

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',      // Database host
    user: 'root',           // Database username
    password: 'MySecureP@ss1', // Database password
    database: 'social_app'   // Database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Define a route to serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the index.html file
});

// Handle the login form submission
app.post('/user/login', (req, res) => {
    const { username, password } = req.body;
    // Here, add your logic to handle user login, e.g., check credentials against the database.
    // For now, just send a welcome message.
    res.send(`Welcome, ${username}!`); // You can replace this with actual login logic.
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
