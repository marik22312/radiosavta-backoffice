import { IProgram, IUser, CreateProgramRequest } from "../models/types";
import { IBaseApiService } from "./base.api.service";
import { observable } from "mobx";

export interface IProgramsService {
  getAllPrograms(): Promise<IProgram[]>;
  createProgram(program: CreateProgramRequest): Promise<IProgram>;
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

  public async createProgram(program: CreateProgramRequest) {
    const form = new FormData();
    form.append("program", JSON.stringify(program.program));
    form.append("users", JSON.stringify(program.users));
    form.append("program_time", JSON.stringify(program.program_time));
    form.append("cover_image", program.cover_image);

    const reponse = await this.api.post("/admin/programs", form, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    return reponse.data;
  }
}

export interface ValidateRecordedShowResponse {
  duration: string;
  url: string;
  is_displayed: boolean;
  recorded_at: string;
  name: string;
}
