const {Router} = require('express');

const User = require('../models/user');
const { userSignin, userSignup, userLogout } = require('../controllers/user');

const router = Router();

router.get('/signin', (req, res)=>{
    return res.render('signin');
})

router.get('/signup', (req, res)=>{
    return res.render('signup');
})

router.post('/signup',userSignup)

router.post('/signin', userSignin)

router.get('/logout', userLogout)

module.exports = router;