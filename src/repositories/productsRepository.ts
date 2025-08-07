import prismaFactory from "../factories/prismaFactory.js";
import type Products from "../models/products.js";

class ProductsRepository {
  async getAll() {
    return await prismaFactory.product.findMany();
  }

  async create(data: Products) {
    return await prismaFactory.product.create({
      data,
    });
  }

  async getById(products_id: string) {
    return await prismaFactory.product.findFirst({
      where: {
        id: products_id,
      },
    });
  }

  async updated(product_id: string, data: Products) {
    return await prismaFactory.product.update({
      where: {
        id: product_id,
      },
      data,
    });
  }
}

export default ProductsRepository;
