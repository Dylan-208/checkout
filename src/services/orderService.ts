import type Order from "../models/order.js";
import type OrderItem from "../models/orderItem.js";
import type CartItemRepository from "../repositories/cartItemRepository.js";
import type CartRepository from "../repositories/cartRepository.js";
import type OrderItemRepository from "../repositories/orderItemRepository.js";
import type OrderRepository from "../repositories/orderRepository.js";
import type ProductsRepository from "../repositories/productsRepository.js";
import type UserRepository from "../repositories/userRepository.js";

class OrderService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _cartRepository: CartRepository,
    private readonly _cartItemRepository: CartItemRepository,
    private readonly _orderRepository: OrderRepository,
    private readonly _orderItemRepository: OrderItemRepository,
    private readonly _productsRepository: ProductsRepository,
    private orderItem: OrderItem,
    private order: Order
  ) {}

  async create(email: string) {
    const dataUser = await this._userRepository.getByEmail(email);

    if (!dataUser) throw new Error("Usuário inexistente");

    const cart = await this._cartRepository.getById(dataUser.id);

    if (!cart)
      throw new Error(
        "É necessário ter itens no carrinho para criar um pedido"
      );

    const itensInCart = await this._cartItemRepository.getItensByCart(cart.id);

    if (itensInCart.length === 0)
      throw new Error(
        "É necessário ter itens no carrinho para criar um pedido"
      );

    const verifyStock = itensInCart.map(async (item) => {
      const product = await this._productsRepository.getById(item.product_id);

      if (!product || !product.stock || product.stock < item.quantity) {
        throw new Error(
          `Produto indisponível no estoque: Produto: ${item.product.name} | Estoque ${item.product.stock}`
        );
      }
      return 0;
    });

    await Promise.all(verifyStock);

    if (!verifyStock) throw new Error("Produto indisponível no estoque");

    const totalCart = itensInCart.reduce(
      (acc, current) => acc + current.quantity * current.product.price,
      0
    );

    this.order = {
      status: "pending",
      total: totalCart,
      user_id: dataUser.id,
    };

    const order = await this._orderRepository.create(this.order);

    itensInCart.map(async (item) => {
      this.orderItem = {
        order_id: order.id,
        product_id: item.product_id,
        price: item.product.price,
        quantity: item.quantity,
      };
      await this._orderItemRepository.create(this.orderItem);
    });

    const orderItens = await this._orderItemRepository.getById(order.id);

    this._cartItemRepository.clearCart(cart.id);

    return { order, orderItens };
  }
}

export default OrderService;
