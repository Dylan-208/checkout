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

  async updated(order_id: string, dataOrder: Order) {
    return await prismaFactory.order.update({
      where: {
        id: order_id,
      },
      data: {
        payment_id: dataOrder.payment_id as string,
        payment_status: dataOrder.payment_status as string,
        status: dataOrder.status,
      },
    });
  }
}

export default OrderRepository;
