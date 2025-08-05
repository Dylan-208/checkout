import prismaFactory from "../factories/prismaFactory.js";
import type User from "../models/user.js";

class UserRepository {
  async create(data: User) {
    return await prismaFactory.user.create({
      data,
    });
  }

  async getByEmail(email: string) {
    return await prismaFactory.user.findFirst({
      where: {
        email,
      },
    });
  }
}

export default UserRepository;
