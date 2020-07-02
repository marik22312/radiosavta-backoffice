import { IProgram, IUser } from "../models/types";
import { IBaseApiService } from "./base.api.service";

export interface IProgramsService {
  getAllPrograms(): Promise<IProgram[]>;
  getProgramById(id: IProgram["id"]): Promise<IProgram>;
  updateProgramById(id: IProgram["id"] | string, data: any): Promise<IProgram>;
  disableProgram(id: IProgram["id"]): Promise<IProgram>;
  getAvailableUsersFor(
    id: IProgram["id"]
  ): Promise<{ users: IProgram["users"] }>;
  addUserToShow(programId: IProgram["id"], userId: IUser["id"]): Promise<any>;
}

export class ProgramsService implements IProgramsService {
  constructor(private api: IBaseApiService) {}

  public async getAllPrograms() {
    const response = await this.api.get<IProgram[]>("/programs");
    return response.data;
  }

  public async getProgramById(id: IProgram["id"]) {
    const response = await this.api.get<IProgram>(`/programs/${id}`);
    return response.data;
  }

  public async updateProgramById(id: IProgram["id"], data: any) {
    const response = await this.api.put<IProgram>(`/programs/${id}`, data);
    return response.data;
  }

  public async disableProgram(id: IProgram["id"]) {
    const response = await this.api.delete<IProgram>(`/programs/${id}`);
    return response.data;
  }

  public async getAvailableUsersFor(id: IProgram["id"]) {
    const response = await this.api.get<IProgram>(
      `/admin/programs/${id}/availableUsers`
    );
    return response.data;
  }

  public async addUserToShow(programId: IProgram["id"], userId: IUser["id"]) {
    const response = await this.api.post<any>(
      `/admin/programs/${programId}/availableUsers`,
      {
        userId,
      }
    );
    return response.data;
  }
}
