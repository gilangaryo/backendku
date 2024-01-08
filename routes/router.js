// Example route.js file

const express = require('express');
const router = express.Router();

const { getAllMember, getMember, updateMember, deleteMember } = require("../controllers/memberController");
const { getAllMentor } = require("../controllers/mentorController");
const { signUp, login } = require('../controllers/authController');

router.get('/member', getAllMember);
router.get('/member/:id', getMember);
router.post('/member/:id', updateMember);
router.delete('/member/:id', deleteMember);

router.post('/auth/signup', signUp);
router.post('/auth/login', login);

router.get('/allMentor', getAllMentor);





module.exports = router;
