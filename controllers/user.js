
const User = require('../models/user');
const userSignup = async(req, res)=>{
    const {fullname, email, password} = req.body;

    await User.create({
        fullname,
        email,
        password
    })
    return res.redirect('/');
}

const userSignin = async(req, res)=>{
    const {email, password} = req.body;
    const user = await User.matchPassword(email, password);
    console.log(user);
    return res.redirect('/');
}


module.exports = {
    userSignup,
    userSignin
}