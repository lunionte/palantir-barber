import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OwnerRepository } from "../repositories/owner.repository";

export class AuthService {
    private ownerRepository;
    constructor() {
        this.ownerRepository = new OwnerRepository();
    }
    async register(name: string, email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = await this.ownerRepository.save(name, email, hashedPassword);

        const token = await jwt.sign({ id: userData.id }, process.env.JWT_SECRET!, {
            expiresIn: "7d",
        });

        return token;
    }
}
