export default interface Order {
  id?: string;
  user_id: string;
  total: number;
  status: string;
  payment_id?: string;
  payment_status?: string;
}
