const express = require('express');
const app = express();
const path = require('path');
const userRoutes = require('./routes/user');

// Middleware to serve static files from "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use user routes
app.use('/user', userRoutes);

// Basic route for homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
