import type Products from "../models/products.js";
import type ProductsRepository from "../repositories/productsRepository.js";
import type UserRepository from "../repositories/userRepository.js";

class ProductsService {
  constructor(
    private readonly _productsRepository: ProductsRepository,
    private readonly _userRepository: UserRepository
  ) {}

  async getAll() {
    return await this._productsRepository.getAll();
  }

  async create(data: Products, email: string) {
    const verifyUser = await this._userRepository.getByEmail(email);

    if (!verifyUser?.isAdmin) {
      throw new Error("Usuário não autorizado");
    }

    const result = await this._productsRepository.create(data);

    return result;
  }
}

export default ProductsService;
