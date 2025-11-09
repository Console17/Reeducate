import { Router } from "express";
import { AuthService } from "./auth.service.js";
import validateMiddleware from "../middlewares/validate.middleware.js";
import signUpSchema from "../validations/sign-up.validation.js";
import signInSchema from "../validations/sign-in.validation.js";
import isAuthMiddleware from "../middlewares/isAuth.middleware.js";

const authRouter = Router();

authRouter.post(
  "/sign-up",
  validateMiddleware(signUpSchema),
  AuthService.signUp
);
authRouter.post(
  "/sign-in",
  validateMiddleware(signInSchema),
  AuthService.signIn
);
authRouter.get("/current-user", isAuthMiddleware, AuthService.currentUser);

export default authRouter;
