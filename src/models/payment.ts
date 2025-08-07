export default interface Payment {
  order_id: string;
  payment_method: string;
  card_token: string;
  amount: number;
  installments: number;
}
