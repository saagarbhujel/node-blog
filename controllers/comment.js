const Comment = require("../models/comment");

const addNewComment = async (req, res) => {
  try {
    await Comment.create({
      content: req.body.content,
      createdBy: req.user._id,
      blogId: req.params.blogId,
    });
    return res.redirect(`/blog/${req.params.blogId}`);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

module.exports = { addNewComment };
