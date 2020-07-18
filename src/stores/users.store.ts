import { action, observable } from "mobx";
import { IUser } from "../models/types";
import { IUsersService, CreateUserRequest } from "../services/users.service";

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
    return this.api.createUser(user);
  }
}
