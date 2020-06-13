import { action, observable } from "mobx";
import { IUser } from '../models/types';
import { IUsersService } from '../services/users.service';

export default class UsersStore {

	@observable public isLoading: boolean = false;

	constructor(
		private api: IUsersService,
	) {}

	@action
	public async fetchAllUsers(): Promise<IUser[]> {
		this.isLoading = true;
		const users = await this.api.getAllUsers();
		this.isLoading = false;
		return users;
	}
    
}