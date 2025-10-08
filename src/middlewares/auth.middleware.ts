import { NextFunction, Request, Response } from "express";
import { ValidationError } from "../errors/validation.error";
import jwt, { JwtPayload } from "jsonwebtoken";
import { OwnerService } from "../services/owner.service";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
        throw new ValidationError("Token não fornecido");
    }

    try {
        // retorna o payload com id
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        // se não encontrar, o service já retorna um erro
        const userData = await new OwnerService().getById(payload.id);
        req.user = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
        };
    } catch (error) {
        console.error(error);
    }
    next();
};
