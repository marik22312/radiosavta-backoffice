import { action, computed, observable } from "mobx";
import { IProgram } from '../models/types';
import { IProgramsService } from '../services/programs.service';

export default class UsersStore {

	@observable public isLoading: boolean = false;

	constructor(
		private api: IProgramsService,
	) {}

	@action
	public async fetchAll(): Promise<IProgram[]> {
		this.isLoading = true;
		const users = await this.api.getAllPrograms();
		this.isLoading = false;
		return users;
	}
    
}