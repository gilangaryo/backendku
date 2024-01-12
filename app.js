const express = require('express');
const { getAllcategory, getCategory, getSubCategory, getSubMenu, addSubcategory } = require('../controllers/categoryController');
const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Hello, this is the home route!');
});

app.get('/about', (req, res) => {
    const categories = getAllcategory();
    res.json(categories);  // Adjust this based on the actual response from getAllcategory()
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
