import axios from "axios";
import dotenv from "dotenv";
import type UserRepository from "../repositories/userRepository.js";
import type CartItemRepository from "../repositories/cartItemRepository.js";
import type ShippmentProducts from "../models/shippmentProducts.js";

dotenv.config();

class ShippingService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _itensCartRepository: CartItemRepository
  ) {}

  async create(email: string, destine_cep: string) {
    const dataUser = await this._userRepository.getByEmail(email);

    if (!dataUser) throw new Error("Usuário inexistente");

    const idCart = dataUser.cart.find((item) => item.user_id === dataUser.id);

    if (!idCart) throw new Error("Usuário sem produto no carrinho");

    const cartItens = await this._itensCartRepository.getItensByCart(idCart.id);
    const products: ShippmentProducts[] = [];

    cartItens.map((item) => {
      return products.push({
        id: item.product_id,
        width: item.product.width,
        height: item.product.height,
        length: item.product.length,
        weight: item.product.weight,
        insurance_value: item.product.price,
        quantity: item.quantity,
      });
    });
    try {
      const result: any = await axios.post(
        "https://melhorenvio.com.br/api/v2/me/shipment/calculate",

        {
          from: { postal_code: process.env.ORIGIN_CEP },
          to: { postal_code: destine_cep },
          products: products,
        },

        {
          headers: {
            Authorization: `Bearer ${process.env.TOKEN_MELHOR_ENVIO}`,
            Accept: "application/json",
            "Content-Type": "application/json",
            "User-Agent": "CHECKOUT (dylansilva208@gmail.com)",
          },
        }
      );

      const optionShippment = {
        PAC: {
          price: 0,
          delivery_time: 0,
        },

        SEDEX: {
          price: 0,
          delivery_time: 0,
        },
      };

      result.data.map((option: any) => {
        if (option.name === "SEDEX") {
          optionShippment.SEDEX = {
            price: parseFloat(option.price),
            delivery_time: option.delivery_time,
          };
        }

        if (option.name === "PAC") {
          optionShippment.PAC = {
            price: parseFloat(option.price),
            delivery_time: option.delivery_time,
          };
        }

        return;
      });
      return optionShippment;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}

export default ShippingService;
