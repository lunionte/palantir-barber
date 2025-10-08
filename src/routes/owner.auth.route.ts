import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { OwnerController } from "../controllers/owner.controller";
import { celebrate, Segments } from "celebrate";
import { newAuthSchema } from "../models/user.model";
import { authMiddleware } from "../middlewares/auth.middleware";

export const onwerAuthRoute = Router();

onwerAuthRoute.post(
    "/signup",
    authMiddleware,
    celebrate({ [Segments.BODY]: newAuthSchema }),
    expressAsyncHandler(OwnerController.register)
);
