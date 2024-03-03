const {Router} = require('express');

const User = require('../models/user');
const { userSignin, userSignup } = require('../controllers/user');

const router = Router();

router.get('/signin', (req, res)=>{
    return res.render('signin');
})

router.get('/signup', (req, res)=>{
    return res.render('signup');
})

router.post('/signup',userSignup)

router.post('/signin', userSignin)

module.exports = router;