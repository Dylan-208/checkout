import { string, object, number } from "yup";

export const productsSchema = object().shape({
  name: string().required(),
  price: number().required(),
  stock: number().required(),
  weight: number().required(),
  height: number().required(),
  width: number().required(),
  length: number().required(),
});
