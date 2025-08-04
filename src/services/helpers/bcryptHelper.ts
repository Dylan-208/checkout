import bcrypt from "bcrypt";

export const cryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 12);
};

export const validatePassword = async (
  password: string,
  passwordBD: string
) => {
  return await bcrypt.compare(password, passwordBD);
};
