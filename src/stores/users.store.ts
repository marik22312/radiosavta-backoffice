import { action, observable } from "mobx";
import { IUser } from "../models/types";
import { IUsersService, CreateUserRequest } from "../services/users.service";
import * as Yup from "yup";

export default class UsersStore {
  @observable public isLoading = false;

  constructor(private api: IUsersService) {}

  @action
  public async fetchAllUsers(): Promise<IUser[]> {
    this.isLoading = true;
    const users = await this.api.getAllUsers();
    this.isLoading = false;
    return users;
  }

  @action
  public async createUser(user: CreateUserRequest): Promise<any> {
    const isValid = await this.validatenewUser(user);
    if (!isValid) {
      throw new Error("Something went wrong");
    }

    return this.api.createUser(user);
  }

  private async validatenewUser(user: CreateUserRequest): Promise<boolean> {
    const schema = Yup.object().shape({
      fullname: Yup.string().required(),
      email: Yup.string().required(),
      location: Yup.string().required(),
      showOnWebsite: Yup.array(),
      password: Yup.string().required(),
      profile_picture: Yup.string().required(),
    });

    return await schema.isValid(user);
  }
}
