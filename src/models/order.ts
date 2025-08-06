export default interface Order {
  id?: string;
  user_id: string;
  total: number;
  status: string;
}
