import { MercadoPagoConfig, Payment } from "mercadopago";
import type OrderRepository from "../repositories/orderRepository.js";
import dotenv from "dotenv";
import type UserRepository from "../repositories/userRepository.js";
import type Payments from "../models/payment.js";
import { v4 as uuidv4 } from "uuid";
import type Order from "../models/order.js";

dotenv.config();

class PaymentService {
  constructor(
    private readonly _userRepository: UserRepository,
    private readonly _orderRepository: OrderRepository
  ) {}

  async create(email: string, dataPayment: Payments) {
    const client = new MercadoPagoConfig({
      accessToken: process.env.TOKEN_MERCADO_PAGO as string,
    });

    const paymentMercadoPago = new Payment(client);

    const dataUser = await this._userRepository.getByEmail(email);

    const order = await this._orderRepository.getById(dataPayment.order_id);

    if (!dataUser || !order) throw new Error("Pedido não encontrado");

    const createPayment = await paymentMercadoPago.create({
      body: {
        transaction_amount: dataPayment.amount,
        token: dataPayment.card_token,
        payment_method_id: dataPayment.payment_method,
        installments: dataPayment.installments,
        payer: {
          email: email,
        },
      },
      requestOptions: { idempotencyKey: uuidv4() },
    });

    if (!createPayment.id || !createPayment.status)
      throw new Error("Error ao criar pagamento");

    const dataOrder: Order = {
      status:
        (createPayment.status as string) === "approved"
          ? "completed"
          : "pending",
      total: dataPayment.amount,
      user_id: dataUser.id,
      id: order.id,
      payment_id: createPayment.id.toString(),
      payment_status: createPayment.status,
    };
    const updateOrder = await this._orderRepository.updated(
      order.id,
      dataOrder
    );
    return {
      paymen_id: updateOrder.payment_id,
      status: updateOrder.payment_status,
    };
  }
}

export default PaymentService;
