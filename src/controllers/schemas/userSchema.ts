import { boolean, object, string } from "yup";

export const userSchema = object().shape({
  email: string().required().email(),
  name: string().required(),
  password: string().required(),
  cep: string().required(),
  isAdmin: boolean().required(),
});

export const loginSchema = object().shape({
  email: string().email().required(),
  password: string().required(),
});
