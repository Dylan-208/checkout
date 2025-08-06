import prismaFactory from "../factories/prismaFactory.js";
import type OrderItem from "../models/orderItem.js";

class OrderItemRepository {
  async create(data: OrderItem) {
    return await prismaFactory.orderItem.create({
      data,
    });
  }

  async getById(order_id: string) {
    return await prismaFactory.orderItem.findMany({
      where: {
        id: order_id,
      },
    });
  }
}

export default OrderItemRepository;
