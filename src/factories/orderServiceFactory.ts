import CartItemRepository from "../repositories/cartItemRepository.js";
import CartRepository from "../repositories/cartRepository.js";
import OrderItemRepository from "../repositories/orderItemRepository.js";
import OrderRepository from "../repositories/orderRepository.js";
import ProductsRepository from "../repositories/productsRepository.js";
import UserRepository from "../repositories/userRepository.js";
import OrderService from "../services/orderService.js";

const orderServiceFactory = new OrderService(
  new UserRepository(),
  new CartRepository(),
  new CartItemRepository(),
  new OrderRepository(),
  new OrderItemRepository(),
  new ProductsRepository()
);

export default orderServiceFactory;
