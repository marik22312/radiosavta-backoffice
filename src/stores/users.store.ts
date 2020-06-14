import { action, observable } from "mobx";
import { IUser } from '../models/types';
import { IUsersService } from '../services/users.service';
import * as Yup from 'yup';

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

	@action
	public async createUser(user: any): Promise<any> {
		const isValid = await this.validatenewUser(user);
		if (!isValid) {
			throw new Error('Something went wrong')
		}

		return this.api.createUser(user);
	}

	private async validatenewUser(user: any): Promise<boolean> {
		const schema = Yup.object().shape({
			fullname: Yup.string().required(),
			email: Yup.string().required(),
			location: Yup.string().required(),
			showOnWebsite: Yup.array(),
			password: Yup.string().required(),
			profile_picture: Yup.string().required()
		});

		return await schema.isValid(user);
	}
    
}