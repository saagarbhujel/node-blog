
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
 try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    console.log("token",token);
    return res.cookie("token", token).redirect('/');
 } catch (error) {
    return res.render("signin", {error: "Invalid email or password"})
 }
}

const userLogout = (req, res)=>{
    res.clearCookie('token').redirect('/');
}


module.exports = {
    userSignup,
    userSignin,
    userLogout
}