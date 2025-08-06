import type Cart from "../models/cart.js";
import type CartItemRepository from "../repositories/cartItemRepository.js";
import type CartRepository from "../repositories/cartRepository.js";
import type ProductsRepository from "../repositories/productsRepository.js";
import type UserRepository from "../repositories/userRepository.js";

class CartService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _cartRepository: CartRepository,
    private readonly _cartItemRepository: CartItemRepository,
    private readonly _productRepository: ProductsRepository
  ) {}

  async add(email: string, dataCart: Cart) {
    const dataUser = await this._userRepository.getByEmail(email);
    const stockProduct = await this._productRepository.getById(
      dataCart.product_id
    );

    if (!dataUser) throw new Error("Usuário inexistente");

    if (!stockProduct) {
      throw new Error("Produto indisponível no estoque");
    }

    if (dataCart.quantity > stockProduct.stock)
      throw new Error(
        `Quantidade acima do estoque, temos apenas ${stockProduct.stock} unidades em estoque`
      );

    const cart = dataUser.cart.find((cart) => cart.user_id === dataUser.id);

    if (!cart) {
      const newCart = await this._cartRepository.create(dataUser.id);
      dataCart.cart_id = newCart.id;

      const cartItem = await this._cartItemRepository.create(dataCart);
      return cartItem;
    }

    dataCart.cart_id = cart.id;

    const itensInCart = await this._cartItemRepository.getItensByCart(cart.id);

    if (!itensInCart) {
      const cartItem = await this._cartItemRepository.create(dataCart);
      return cartItem;
    }

    const ProductInCartItem = itensInCart.find(
      (item) => item.product_id === dataCart.product_id
    );

    if (ProductInCartItem) {
      const updateItemCart = await this._cartItemRepository.updated(
        ProductInCartItem.id,
        dataCart
      );
      return updateItemCart;
    }

    const createItemInCart = await this._cartItemRepository.create(dataCart);

    return createItemInCart;
  }

  async get(email: string) {
    const dataUser = await this._userRepository.getByEmail(email);

    if (dataUser) {
      const cart = await this._cartRepository.getById(dataUser.id);

      if (!cart) return [];

      const ItensCart = await this._cartItemRepository.getItensByCart(cart.id);

      return ItensCart;
    }

    throw new Error("Usuário inexistente no banco de dados");
  }

  async delete(email: string, id_cartItem: string) {
    const dataUser = await this._userRepository.getByEmail(email);

    if (!dataUser) throw new Error("Usuário inexistente");

    const cart = await this._cartRepository.getById(dataUser.id);

    if (!cart) throw new Error("Usuário não tem carrinho");

    const cartItens = await this._cartItemRepository.getItensByCart(cart.id);

    if (!cartItens) throw new Error("Carrinho vazio");

    const productInCart = cartItens.find((item) => item.id === id_cartItem);

    if (!productInCart) throw new Error("Produto inexistente no carrinho");

    const response = await this._cartItemRepository.delete(id_cartItem);

    return response;
  }
}

export default CartService;
