
const express = require('express');
const router = express.Router();
const db = require("../config");

const mentor = db.collection("mentor");
const getAllMentor = async (req, res) => {
    try {
        const snapshot = await mentor.get();
        const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        res.send(list);
    } catch (error) {
        res.status(400).send(error.message);
    }
};


module.exports = { getAllMentor };