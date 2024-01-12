const express = require("express");
const cors = require("cors");
const router = require('./routes/router');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/', router);

const port = 8000;
app.listen(port, () => console.log("Up & Running on port ", port));

