const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Create a connection to the database using environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost', // Use the DB_HOST environment variable or default to localhost
    user: process.env.DB_USER || 'root',      // Use the DB_USER environment variable or default to root
    password: process.env.DB_PASSWORD || 'MySecureP@ss1', // Use the DB_PASSWORD environment variable or default to your password
    database: process.env.DB_NAME || 'social_app' // Use the DB_NAME environment variable or default to social_app
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// New route for login page
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html'); // Serve the login page
});

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/public/signup.html');
});

app.post('/user/signup', (req, res) => {
    const { username, password } = req.body;
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err) => {
        if (err) {
            console.error('Error signing up:', err);
            return res.status(500).send('Error signing up.');
        }
        res.redirect('/'); // Redirect to login page after signup
    });
});

app.post('/user/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            console.error('Error logging in:', err);
            return res.status(500).send('Error logging in.');
        }
        if (results.length > 0) {
            res.sendFile(__dirname + '/public/home.html'); // Serve the home page after successful login
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
