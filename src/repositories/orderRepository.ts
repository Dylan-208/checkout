import prismaFactory from "../factories/prismaFactory.js";
import type Order from "../models/order.js";

class OrderRepository {
  async create(data: Order) {
    return await prismaFactory.order.create({
      data,
    });
  }

  async getById(order_id: string) {
    return await prismaFactory.order.findMany({
      where: {
        id: order_id,
      },
    });
  }

  async getOrderUser(user_id: string) {
    return await prismaFactory.order.findMany({
      where: {
        user_id,
      },
      include: {
        orderItem: true,
      },
    });
  }
}

export default OrderRepository;
