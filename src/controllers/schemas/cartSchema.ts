import { string, object, number } from "yup";

export const cartSchema = object().shape({
  product_id: string().required(),
  quantity: number().required(),
});
