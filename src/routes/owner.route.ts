import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { OwnerController } from "../controllers/owner.controller";

export const ownerRoute = Router();

ownerRoute.get("/", authMiddleware, OwnerController.getAll);
ownerRoute.get("/:id", authMiddleware, OwnerController.getById);
