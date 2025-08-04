import { PrismaClient } from "../generated/prisma/client.js";

const prismaRepositoryFactory = new PrismaClient();

export default prismaRepositoryFactory;
