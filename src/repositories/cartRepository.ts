import prismaFactory from "../factories/prismaFactory.js";

class CartRepository {
  async getById(user_id: string) {
    return await prismaFactory.cart.findFirst({
      where: {
        user_id,
      },
    });
  }

  async create(user_id: string) {
    return await prismaFactory.cart.create({
      data: { user_id },
    });
  }
}

export default CartRepository;
