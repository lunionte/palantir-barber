import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class OwnerRepository {
    async save(name: string, email: string, hashedPassword: string) {
        const data = await prisma.owner.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        return data;
    }

    async getAll() {
        const data = await prisma.owner.findMany();
        return data;
    }

    async getById(id: string) {
        const data = await prisma.owner.findUnique({
            where: { id },
        });
        return data;
    }
}
