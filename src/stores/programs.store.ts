import { action, observable } from "mobx";
import { IProgram, IUser } from "../models/types";
import { IProgramsService } from "../services/programs.service";

export default class ProgramStore {
  constructor(private api: IProgramsService) {}

  @action
  public async fetchAll(): Promise<IProgram[]> {
    const users = await this.api.getAllPrograms();
    return users;
  }

  @action
  public async fetchById(id: string): Promise<IProgram> {
    const program = await this.api.getProgramById(id);
    return program;
  }
  @action
  public async getAvailableUsers(
    id: IProgram["id"]
  ): Promise<{ users: IProgram["users"] }> {
    const users = await this.api.getAvailableUsersFor(id);
    return users;
  }

  @action
  public async addUserToShow(programId: IProgram["id"], userId: IUser["id"]) {
    try {
      const response = await this.api.addUserToShow(programId, userId);
      return response;
    } catch (err) {
      console.log(err);
      // TODO: Handle it!
    }
  }
}
