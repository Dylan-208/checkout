import prismaFactory from "../factories/prismaFactory.js";
import type Cart from "../models/cart.js";

class CartItemRepository {
  async getItensByCart(cart_id: string) {
    return await prismaFactory.cartItem.findMany({
      where: {
        cart_id,
      },
    });
  }

  async create(data: Cart) {
    return await prismaFactory.cartItem.create({
      data,
    });
  }

  async updated(id: string, data: Cart) {
    return await prismaFactory.cartItem.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id_cartItem: string) {
    return await prismaFactory.cartItem.delete({
      where: {
        id: id_cartItem,
      },
    });
  }
}

export default CartItemRepository;
