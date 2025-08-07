import OrderRepository from "../repositories/orderRepository.js";
import UserRepository from "../repositories/userRepository.js";
import PaymentService from "../services/paymentService.js";

const paymentServiceFactory = new PaymentService(
  new UserRepository(),
  new OrderRepository()
);

export default paymentServiceFactory;
