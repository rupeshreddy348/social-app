const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files

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

// Define a route for the home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html'); // Serve login page
});

// Define a route for the signup page
app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html'); // Serve signup page
});

// Handle user registration
app.post('/signup', (req, res) => {
    const { newUsername, newPassword } = req.body;
    const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
    
    db.query(query, [newUsername, newPassword], (err, results) => {
        if (err) {
            console.error('Error during signup:', err.stack);
            return res.status(500).send('Error during signup.');
        }
        res.redirect('/'); // Redirect to login page after signup
    });
});

// Handle user login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';

    db.query(query, [username, password], (err, results) => {
        if (err) {
            console.error('Error during login:', err.stack);
            return res.status(500).send('Error during login.');
        }
        if (results.length > 0) {
            res.send('Welcome to the home page!'); // Display home page
        } else {
            res.status(401).send('Invalid username or password.'); // Invalid credentials
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
