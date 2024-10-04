const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/user', (req, res) => {
    res.json({ name: 'Sai', age: 25 });
});

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
