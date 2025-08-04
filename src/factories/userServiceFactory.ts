import UserRepository from "../repositories/userRepository.js";
import userService from "../services/userService.js";

const userServiceFactory = new userService(new UserRepository());

export default userServiceFactory;
