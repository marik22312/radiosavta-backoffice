import { IFullProgram } from "../models/types";

export enum UploadRecordedShowSteps {
  Upload,
  AddInfo,
  Review,
}

export interface RecordedShow {
  id: string | number;
  url: string;
  name?: string;
  created_at: string;
  program?: IFullProgram;
}
