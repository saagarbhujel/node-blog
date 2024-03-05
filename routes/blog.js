const {Router} = require('express');
const router = Router();
const multer  = require('multer')
const path = require('path');  

const Blog = require('../models/blog');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./public/uploads'));
    },
    filename: function(req, file, cb){
        const filename = `${Date.now()} - ${file.originalname}`;
        cb(null, filename);
    }
})
const upload = multer({ storage: storage });


router.get('/addnew',(req,res)=>{
    return res.render('addBlog', {
       user: req.user
    })
})

router.post('/', upload.single('coverImage') ,async (req, res)=>{
   const blog = await Blog.create({
    title: req.body.title,
    body: req.body.body,
    coverImage: `/uploads/${req.file.filename}`,
    createdBy: req.user._id
   })
   return res.redirect(`/blog/${blog._id}`);
})

router.get('/:id', async(req, res)=>{
    const blog = await Blog.findById(req.params.id)
    return res.render('blog', {
        user: req.user,
        blog
    })
})


module.exports = router;