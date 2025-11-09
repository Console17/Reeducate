import { Router } from "express";
import { UserService } from "./user.service.js";
import isValidMongoId from "../middlewares/isValidMongoId.middleware.js";

const userRouter = Router();

userRouter.get("/", UserService.getAllUsers);
userRouter.get("/:id", isValidMongoId, UserService.getUserById);
userRouter.delete("/:id", isValidMongoId, UserService.deleteUserById);

export default userRouter;
