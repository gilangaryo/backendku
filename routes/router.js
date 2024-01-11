// Example route.js file

const express = require('express');
const router = express.Router();
const path = require('path');

const { getAllMember, getMember, deleteMember, addMember } = require("../controllers/memberController");
const { getAllMentor } = require("../controllers/mentorController");
const { signUp, login, logout } = require('../controllers/authController');
const { pay, trxNotif } = require('../controllers/paymentController');
const { getAllcategory, getcategory, addSubcategory } = require('../controllers/categoryController');



router.get('/member', getAllMember);
router.get('/member/:id', getMember);
// router.post('/member/:id', updateMember);
router.delete('/member/:id', deleteMember);
router.post('/member/add', addMember);

router.post('/auth/signup', signUp);
router.post('/auth/login', login);
router.post('/auth/logout', logout);


router.get('/allMentor', getAllMentor);

router.post('/pay', pay);
router.post('/notification', trxNotif);


// category
router.get('/category', getAllcategory);
router.get('/category/sub', getcategory);
router.post('/category', addSubcategory);


module.exports = router;
