import { string, number, object } from "yup";

export const paymentSchema = object().shape({
  order_id: string().required("ID do pedido é obrigatório"),
  payment_method: string().required("Método de pagamento é obrigatório"),
  card_token: string().required("Token do cartão é obrigatório"),
  amount: number().required("Valor total é obrigatório"),
  installments: number().required("Número de parcelas é obrigatório"),
});
