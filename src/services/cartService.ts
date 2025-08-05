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

    if (!stockProduct?.stock) {
      throw new Error("Produto indisponível no estoque");
    }

    if (dataUser?.cart.length === 0) {
      const cart = await this._cartRepository.create(dataUser.id);
      dataCart.cart_id = cart.id;
      if (dataCart.quantity <= stockProduct?.stock) {
        const cartItem = await this._cartItemRepository.create(dataCart);
        return cartItem;
      }
      return;
    }

    const cart = dataUser?.cart.find((cart) => cart.user_id === dataUser.id);

    dataCart.cart_id = cart?.id as string;

    const itensInCart = await this._cartItemRepository.getItensByCart(
      cart?.id as string
    );

    if (
      !itensInCart.filter((item) => item.product_id === dataCart.product_id)
    ) {
      const cartItem = await this._cartItemRepository.create(dataCart);
      return cartItem;
    }

    const ProductInCartItem = itensInCart.find(
      (item) => item.product_id === dataCart.product_id
    );

    if (ProductInCartItem) {
      if (dataCart.quantity > stockProduct.stock) {
        throw new Error(
          `Quantidade acima do estoque, temos apenas ${stockProduct.stock} unidades em estoque`
        );
      }
      const updateItemCart = await this._cartItemRepository.updated(
        ProductInCartItem.id,
        dataCart
      );
      return updateItemCart;
    }
  }
}

export default CartService;
