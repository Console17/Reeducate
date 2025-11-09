import { Router } from "express";
import { BlogService } from "./blog.service.js";
import isAuthMiddleware from "../middlewares/isAuth.middleware.js";
import createBlogSchema from "../validations/createBlog.valitadion.js";
import validateMiddleware from "../middlewares/validate.middleware.js";

const blogRouter = Router();

blogRouter.get("/", BlogService.getAllBlogs);
blogRouter.post(
  "/",
  isAuthMiddleware,
  validateMiddleware(createBlogSchema),
  BlogService.createBlog
);
export default blogRouter;
