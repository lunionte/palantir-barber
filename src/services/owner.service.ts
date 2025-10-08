import { NotFoundError } from "../errors/not-found.error";
import { OwnerRepository } from "../repositories/owner.repository";

export class OwnerService {
    private ownerRepository;
    constructor() {
        this.ownerRepository = new OwnerRepository();
    }
    async getAll() {
        const data = await this.ownerRepository.getAll();
        return data;
    }

    async getById(id: string) {
        const userData = await this.ownerRepository.getById(id);
        if (!userData) {
            throw new NotFoundError("Usuário não encontrado");
        }
        return userData;
    }
}
