
const express = require('express');
const router = express.Router();
const db = require("../config");


const getAllcategory2 = async (req, res) => {
    try {
        const category = db.collection("categories");

        const snapshot = await category.get();

        const categories = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }));



        const snapSubMenu = await category.doc(categories.id).get();
        const collectionSubMenu = snapSubMenu.ref.collection("subMenu");
        const getSubMenu = await collectionSubMenu.get();
        const sub_menu = getSubMenu.docs.map((doc) => ({
            ...doc.data()
        }));
        res.send(sub_menu);

    } catch (error) {
        res.status(400).send(error.message);
    }
};
const getAllcategory = async (req, res) => {
    const categoryCollection = db.collection("categories");

    try {
        const categoriesSnapshot = await categoryCollection.get();
        const allCategories = [];

        for (const categoryDoc of categoriesSnapshot.docs) {
            const categoryId = categoryDoc.id;
            const subCollectionRef = categoryDoc.ref.collection('subCategory');

            const subCollectionSnapshot = await subCollectionRef.get();
            const subCollection = subCollectionSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));

            const categoryWithSubMenu = {
                category_id: categoryId,
                category_title: categoryDoc.data().title,
                subCategory: []
            };

            for (const subCatItem of subCollection) {
                const subMenuRef = subCollectionRef.doc(subCatItem.id).collection('subMenu');
                const subMenuSnapshot = await subMenuRef.get();

                const submenu = subMenuSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                const subCategoryWithMenu = {
                    sub_title: subCatItem.title,
                    sub_id: subCatItem.id,
                    sub_image: subCatItem.image,
                    subMenu: submenu,
                };

                categoryWithSubMenu.subCategory.push(subCategoryWithMenu);
            }

            allCategories.push(categoryWithSubMenu);
        }

        res.send(allCategories);
    } catch (error) {
        // Handle errors, e.g., by sending an error response
        res.status(500).send("Internal Server Error");
    }
};










const getcategory = async (req, res) => {
    try {
        const uid = req.params.id;
        const snapshot = await category.doc("programming").get();

        if (!snapshot.exists) {
            return res.status(404).json({ error: 'category not found' });

        }

        const sub = snapshot.ref.collection("subMenu");
        const submenu = await sub.get();
        const list = submenu.docs.map((doc) => ({
            header: doc.title,
            ...doc.data()
        }));

        res.send(list);
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const updatecategory = async (req, res) => {
    const uid = req.params.id;

    if (!uid) {
        return res.status(400).json({ error: 'UID is required in the query parameters' });
    }

    try {
        delete req.body.id;
        const data = req.body;
        await category.doc(uid).update(data);
        res.send({ msg: "Updated" });

    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




const addSubcategory = async (req, res) => {
    try {
        // const { categoryName, subCollectionName } = req.params;
        const categoryRef = db.collection('categories').doc("programming");
        const { title, judul } = req.body;

        if (title) {
            const subCollectionRef = categoryRef.collection("subCategory").doc("ai-development");
            const subCollectionRef2 = subCollectionRef.collection("subMenu");

            await subCollectionRef2.doc(judul).set({

                image: 'http',
                title: title

            });
            res.status(201).send('Subcollection created successfully');
        } else {
            res.status(400).send('Subcollection name is missing in the request body');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }

};
const deletecategory = async (req, res) => {

    const uid = req.params.id;

    if (!uid) {
        return res.status(400).json({ error: 'UID is required in the query parameters' });
    }

    try {
        await category.doc(uid).delete();
        res.send({ msg: "Deleted" });

    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllcategory,
    getcategory,
    updatecategory,
    deletecategory,
    addSubcategory

};