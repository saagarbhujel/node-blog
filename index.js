const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const Blog = require('./models/blog')
const userRouter = require('./routes/user');
const blogRoute = require('./routes/blog');
const { checkForAuthenticationCookie } = require('./middlewares/authentication');

const app = express();

const PORT = 8080;

mongoose.connect("mongodb+srv://saagar:saagar@cluster0.9phl9ii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then((e)=> console.log("Connected to DB"));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));
app.use(express.static(path.resolve('./public')));

app.get('/', async(req, res) => {
    const allBlog = await Blog.find({}).sort({createdAt: -1});
    res.render('home',{
        user: req.user,
        blogs: allBlog
    })
})

app.use('/user', userRouter);
app.use('/blog', blogRoute);

app.listen(PORT, ()=>(
    console.log(`Server is running on port ${PORT}`)
))