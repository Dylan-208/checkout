import CartItemRepository from "../repositories/cartItemRepository.js";
import CartRepository from "../repositories/cartRepository.js";
import ProductsRepository from "../repositories/productsRepository.js";
import UserRepository from "../repositories/userRepository.js";
import CartService from "../services/cartService.js";

const cartServiceFactory = new CartService(
  new UserRepository(),
  new CartRepository(),
  new CartItemRepository(),
  new ProductsRepository()
);

export default cartServiceFactory;
