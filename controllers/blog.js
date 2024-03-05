const Blog = require('../models/blog');

async function addNewBlog(req, res){
    try {
        if (!req.file) {
            // Handle the case where no file is uploaded
            return res.status(400).send('No file uploaded');
        }

        const blog = await Blog.create({
            title: req.body.title,
            body: req.body.body,
            coverImage: `/uploads/${req.file.filename}`,
            createdBy: req.user._id
        });

        return res.redirect(`/blog/${blog._id}`);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

async function getBlog(req, res){
    try {
        const blog = await Blog.findById(req.params.id);
        return res.render('blog', {
            user: req.user,
            blog
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    addNewBlog,
    getBlog
}