const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routes/user');

const app = express();

const PORT = 8080;

mongoose.connect("mongodb+srv://saagar:saagar@cluster0.9phl9ii.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then((e)=> console.log("Connected to DB"));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render('home')
})

app.use('/user', userRouter);

app.listen(PORT, ()=>(
    console.log(`Server is running on port ${PORT}`)
))