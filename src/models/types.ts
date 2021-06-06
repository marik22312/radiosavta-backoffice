import { RecordedShow } from "../domain/RecordedShow";

export interface ModelWithTimestamps {
  created_at: string;
  updated_at: string;
}

export interface IUser extends ModelWithTimestamps {
  id: number;
  name: string;
  quote: string;
  location: string;
  profile_image: string;
  email: string;
}
export interface IFullUser extends IUser {
  programs: IProgram[];
}

export interface IRecordedShow extends ModelWithTimestamps {
  id: number;
  program_id: number;
  url: string;
  name: string;
  duration: string;
  is_displayed: boolean;
  recorded_at: string;
}

export type ProgramUserKeys =
  | "id"
  | "name"
  | "quote"
  | "location"
  | "profile_image";

export type ProgramUser = Pick<IUser, ProgramUserKeys>;
export interface IProgram extends ModelWithTimestamps {
  id: number | string;
  name_en: string;
  name_he?: string;
  description: string;
  cover_image: string;
  is_displayed?: boolean;
  users: ProgramUser[];
  recorded_shows: IRecordedShow[];
}

export interface IFullProgram extends ModelWithTimestamps, IProgram {
  users: IUser[];
  recorded_shows: IRecordedShow[];
  recorded_shows_ng: RecordedShow[];
  programTimes: Record<string, any>;
}

export interface CreateProgramRequestProgram {
  name: string;
  description: string;
}
export interface CreateProgramRequestProgramTime {
  day_of_week: number;
  start_time: string;
}
export interface CreateProgramRequest {
  program: CreateProgramRequestProgram;
  program_time: CreateProgramRequestProgramTime;
  users: number[];
  cover_image: string;
}
