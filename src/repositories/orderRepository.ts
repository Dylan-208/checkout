import prismaFactory from "../factories/prismaFactory.js";
import type Order from "../models/order.js";

class OrderRepository {
  async create(data: Order) {
    return await prismaFactory.order.create({
      data,
    });
  }

  async getById(order_id: string) {
    return await prismaFactory.order.findFirst({
      where: {
        id: order_id,
      },
    });
  }
}

export default OrderRepository;
