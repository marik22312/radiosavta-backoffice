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

export interface IProgram extends ModelWithTimestamps {
  id: number | string;
  name_en: string;
  name_he?: string;
  description: string;
  cover_image: string;
  is_displayed?: boolean;
  users: {
    id: IUser["id"];
    name: IUser["name"];
    quote: IUser["quote"];
    location: IUser["location"];
    profile_image: IUser["profile_image"];
  }[];
  recorded_shows: IRecordedShow[];
}

export interface IValidatedRecordedProgram {
  name: string;
  duration: string;
  url: string;
  is_displayed: boolean;
  recorded_at: string;
}

export interface IFullProgram extends ModelWithTimestamps, IProgram {
  users: IUser[];
  recorded_shows: IRecordedShow[];
}
