const Blog = require("../models/blog");
const Comment = require("../models/comment");

async function addNewBlog(req, res) {
  try {
    if (!req.file) {
      // Handle the case where no file is uploaded
      return res.status(400).send("No file uploaded");
    }

    const blog = await Blog.create({
      title: req.body.title,
      body: req.body.body,
      coverImage: `/uploads/${req.file.filename}`,
      createdBy: req.user._id,
    });

    return res.redirect(`/blog/${blog._id}`);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

async function getBlog(req, res) {
  try {
    const blog = await Blog.findById(req.params.id).populate("createdBy");
    const comments = await Comment.find({
      blogId: req.params.id,
    }).populate("createdBy");
    return res.render("blog", {
      user: req.user,
      blog,
      comments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = {
  addNewBlog,
  getBlog,
};
