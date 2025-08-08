import { object, string, number, array } from "yup";

export const shippmentSchema = object().shape({
  destine_cep: string().required("É necessário enviar o cep de destino"),
});
