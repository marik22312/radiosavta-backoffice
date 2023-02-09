import { V3LoginResponse } from "./Auth.api";
import * as AuthAPI from "./Auth.api";
import { AxiosResponse } from "axios";
import { User } from "../domain/Users";

export const stubLoginV3 = (overrides?: Partial<V3LoginResponse>) => {
  const response: V3LoginResponse = {
    token: overrides?.token ?? "",
    user: overrides?.user ?? ({} as User),
  };

  return jest
    .spyOn(AuthAPI, "loginV3")
    .mockResolvedValue({ data: response } as AxiosResponse<V3LoginResponse>);
};
