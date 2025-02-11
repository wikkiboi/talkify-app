import bcrypt from "bcrypt";

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

export function compareWithHash(password: string, hash: string) {
  return bcrypt.compareSync(password, hash);
}
