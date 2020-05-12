import { IUser } from '../models/types';
import { IBaseApiService } from './base.api.service';

export interface IUsersService {
	getAllUsers(): Promise<IUser[]>;
	getUserById(id: IUser['id']): Promise<IUser>;
	updateUserById(id: IUser['id'], data: any): Promise<IUser>;
	disableUser(id: IUser['id']): Promise<IUser>;
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

	public async disableUser(id: IUser['id']) {
		const response = await this.api.delete<IUser>(`/users/${id}`);
		return response.data;
	}
}
