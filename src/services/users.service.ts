import { IUser } from '../models/types';
import { IBaseApiService } from './base.api.service';

export interface IUsersService {
	getAllUsers(): Promise<IUser[]>;
	getUserById(id: IUser['id']): Promise<IUser>;
	updateUserById(id: IUser['id'], data: any): Promise<IUser>;
	disableUser(id: IUser['id']): Promise<IUser>;
	createUser(user: any): Promise<IUser>;
}

export class UsersService implements IUsersService {
	constructor(
		private api: IBaseApiService,
	) {}

	public async getAllUsers() {
		const response = await this.api.get<IUser[]>('/users');
		return response.data;
	}

	public async getUserById(id: IUser['id']) {
		const response = await this.api.get<IUser>(`/users/${id}`);
		return response.data;
	}

	public async updateUserById(id: IUser['id'], data: any) {
		const response = await this.api.put<IUser>(`/users/${id}`, data);
		return response.data;
	}
	public async createUser(user: any) {
		const form = new FormData();
		form.append('email', user.email);
		form.append('name', user.fullname);
		form.append('location', user.location);
		form.append('password', user.password);
		form.append('profile_picture', user.profile_picture);
		if (user.showOnWebsite) {
			form.append('showOnWebsite', 'true');
		}
		const response = await this.api.post<IUser>(`/admin/users/`, form, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		});
		return response.data;
	}

	public async disableUser(id: IUser['id']) {
		const response = await this.api.delete<IUser>(`/users/${id}`);
		return response.data;
	}
}
