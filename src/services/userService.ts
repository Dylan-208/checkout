import type Login from "../models/login.js";
import type User from "../models/user.js";
import type UserRepository from "../repositories/userRepository.js";
import { cryptPassword, validatePassword } from "./helpers/bcryptHelper.js";
import { createJWT } from "./helpers/jwtHelpers.js";

class UserService {
  constructor(private _userRepository: UserRepository) {}

  async create(data: User) {
    const verifyEmail = await this._userRepository.getByEmail(data.email);

    if (verifyEmail) {
      throw new Error("Email já existente no banco de dados");
    } else {
      const passwordCrypt = await cryptPassword(data.password);
      data.password = passwordCrypt;
      const result = await this._userRepository.create(data);

      result.password = "";

      const response = createJWT(result);

      return response;
    }
  }

  async login(login: Login) {
    const verifyEmail = await this._userRepository.getByEmail(login.email);

    if (!verifyEmail) {
      throw new Error("Email e/ou senha inválidos");
    }

    const verifyPassword = await validatePassword(
      login.password,
      verifyEmail.password
    );

    if (!verifyPassword) {
      throw new Error("senha inválidos");
    }

    const result = createJWT(verifyEmail);

    return result;
  }
}

export default UserService;
