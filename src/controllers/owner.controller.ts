import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { OwnerService } from "../services/owner.service";

export class OwnerController {
    static async getAll(req: Request, res: Response) {
        const data = await new OwnerService().getAll();
        res.json({ data });
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.params;
        const data = await new OwnerService().getById(id);
        res.json({ data });
    }

    static async register(req: Request, res: Response) {
        const { name, email, password } = req.body;
        const data = await new AuthService().register(name, email, password);
        res.status(201).json({ data });
    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const data = await new AuthService().login(email, password);
        res.json({ data });
    }
}
