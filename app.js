const express = require('express');
const { getAllcategory, getCategory, getSubCategory, getSubMenu, addSubcategory } = require('./controllers/categoryController');
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 8000;
const { getAllMember, getMember, deleteMember, addMember } = require("./controllers/memberController");
const cors = require("cors");
const route = require('./routes/router');


app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Hello, this is the home route!');
});

app.get('/member', async (req, res) => {
    try {
        const members = getAllMember();
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
