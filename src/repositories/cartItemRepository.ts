import prismaFactory from "../factories/prismaFactory.js";
import type Cart from "../models/cart.js";

class CartItemRepository {
  async getItensByCart(cart_id: string) {
    return await prismaFactory.cartItem.findMany({
      where: {
        cart_id,
      },
      include: {
        product: true,
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

  async clearCart(cart_id: string) {
    return await prismaFactory.cartItem.deleteMany({
      where: {
        cart_id,
      },
    });
  }
}

export default CartItemRepository;
