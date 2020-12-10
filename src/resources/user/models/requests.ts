import { UserDoc } from "@resources/user/user.model";

export type ICreateUserBody  = UserDoc & {
    password: string;
  }
  