const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',      // Database host
    user: 'root',           // Database username
    password: 'Social@155!', // Database password
    database: 'social_app'   // Database name (replace with your database name)
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Define a route
app.get('/', (req, res) => {
    res.send('Welcome to Sai\'s social media platform!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
