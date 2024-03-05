const {Router} = require('express');
const router = Router();
const multer  = require('multer')
const path = require('path');  

const Blog = require('../models/blog');
const {addNewBlog, getBlog} = require('../controllers/blog');


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

router.post('/', upload.single('coverImage') ,addNewBlog)

router.get('/:id', getBlog)


module.exports = router;