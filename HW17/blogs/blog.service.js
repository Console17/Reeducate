import userModel from "../users/user.model.js";
import blogModel from "./blog.model.js";

async function getAllBlogs(req, res) {
  const blogs = await blogModel.find().populate("author", "-blogs");
  res.json(blogs);
}

async function createBlog(req, res) {
  const { title, content } = req.body;

  const newBlog = await blogModel.create({
    title,
    content,
    author: req.userId,
  });

  await userModel.findByIdAndUpdate(req.userId, {
    $push: { blogs: newBlog._id },
  });
  res.status(201).json({ message: "blog created successfully" });
}

export const BlogService = {
  getAllBlogs,
  createBlog,
};
