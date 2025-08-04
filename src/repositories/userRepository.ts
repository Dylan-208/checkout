import prismaRepositopryFactory from "../factories/prismaRepositoryFactory.js";
import type User from "../models/user.js";

class UserRepository {
  async create(data: User) {
    return await prismaRepositopryFactory.user.create({
      data,
    });
  }

  async getByEmail(email: string) {
    return await prismaRepositopryFactory.user.findFirst({
      where: {
        email,
      },
    });
  }
}

export default UserRepository;
