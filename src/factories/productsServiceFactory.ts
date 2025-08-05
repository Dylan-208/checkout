import ProductsService from "../services/productsService.js";
import ProductsRepository from "../repositories/productsRepository.js";
import UserRepository from "../repositories/userRepository.js";

const productsServiceFactory = new ProductsService(
  new ProductsRepository(),
  new UserRepository()
);

export default productsServiceFactory;
