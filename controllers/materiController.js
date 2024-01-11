const express = require('express');
const router = express.Router();
const db = require("../config");


const addMateri = async (req, res) => {
    try {
        const { category, categoryName } = req.params;
        const { title, judul } = req.body;

        const categoryRef = db.collection('categories').doc(category);
        const subCollectionRef = categoryRef.collection("subCategory").doc(categoryName);
        const subCollectionRef2 = subCollectionRef.collection("subMenu").doc("sssss");
        const subCollectionRef3 = subCollectionRef2.collection("materi").doc();

        if (title) {


            await subCollectionRef3.set({
                materi_id: subCollectionRef3.id,
                title: title,
                image: 'http'
            });

            res.status(201).send('SUKSES ANJAYY!!');
        } else {
            res.status(400).send('Subcollection name is missing in the request body');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

};



const getMateri = async (req, res) => {

    try {
        const { category, categoryName } = req.params;
        const { title, judul } = req.body;

        // ambil kategori
        const categoryRef = db.collection('categories').doc(category);

        const subCategoryRef = categoryRef.collection("subCategory").doc(categoryName);
        const subMenuRef = subCategoryRef.collection("subMenu").doc("sssss");
        const materiRef = subMenuRef.collection("materi").doc();

        const snapshot = await materiRef.get();
        const allCategories = [];

        if (snapshot) {


            const submenu = subMenuSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            res.send(submenu);

            // const subCategoryWithMenu = {
            //     sub_title: subCatItem.title,
            // };
        }


    } catch (error) {
        // Handle errors, e.g., by sending an error response
        res.status(500).send("Internal Server Error");
    }
};









module.exports = {
    addMateri

};