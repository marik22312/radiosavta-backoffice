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
  ValidateRecordedShow(url: string): Promise<ValidateRecordedShowResponse>;
  createRecordedShow(
    programId: IProgram["id"],
    recordedShow: ValidateRecordedShowResponse
  ): Promise<ValidateRecordedShowResponse>;
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

  public async ValidateRecordedShow(url: string) {
    const response = await this.api.post(
      `/admin/programs/recordings/validate`,
      { url }
    );
    return response.data;
  }

  public async createRecordedShow(
    programId: IProgram["id"],
    recordedShow: ValidateRecordedShowResponse
  ) {
    const response = await this.api.post(
      `/admin/programs/${programId}/recordings`,
      { ...recordedShow }
    );
    return response.data;
  }
}

export interface ValidateRecordedShowResponse {
  duration: string;
  url: string;
  is_displayed: boolean;
  recorded_at: string;
  name: string;
}
