import IUser from "../schema/types/user.type";

declare module "socket.io" {
  interface Socket {
    user: IUser;
  }
}
