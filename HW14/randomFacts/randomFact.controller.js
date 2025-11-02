import { Router } from "express";
import { getRandomFact } from "./randomFact.service.js";
import blockHalf from "../middlewares/blockHalf.middleware.js";

const randomFactRouter = Router();

randomFactRouter.get("/", blockHalf, getRandomFact);

export default randomFactRouter;
