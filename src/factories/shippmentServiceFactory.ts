import CartItemRepository from "../repositories/cartItemRepository.js";
import UserRepository from "../repositories/userRepository.js";
import ShippmentService from "../services/shippingService.js";

const shippmentServiceFactory = new ShippmentService(
  new UserRepository(),
  new CartItemRepository()
);

export default shippmentServiceFactory;
