import { string, object, number } from "yup";

export const productsSchema = object().shape({
  name: string().required(),
  price: number().required(),
  stock: number().required(),
});
