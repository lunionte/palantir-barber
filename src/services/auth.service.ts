import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OwnerRepository } from "../repositories/owner.repository";
import { NotFoundError } from "../errors/not-found.error";
import { ValidationError } from "../errors/validation.error";

export class AuthService {
    private ownerRepository;
    constructor() {
        this.ownerRepository = new OwnerRepository();
    }
    async register(name: string, email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = await this.ownerRepository.save(name, email, hashedPassword);

        const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET!, {
            expiresIn: "7d",
        });

        return token;
    }

    async login(email: string, password: string) {
        const userData = await this.ownerRepository.getByEmail(email);
        if (!userData) {
            throw new NotFoundError("Email ou senha inválidos");
        }
        const isValidPassword = await bcrypt.compare(password, userData.password);
        console.log(isValidPassword);
        if (!isValidPassword) {
            throw new ValidationError("Email ou senha inválidos");
        }

        const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET!, {
            expiresIn: "7d",
        });

        return token;
    }
}
