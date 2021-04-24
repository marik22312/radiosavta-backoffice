import { IProgram } from "../models/types";

export interface User {
  id: number;
  name: string;
  quote: string;
  location: string;
  profile_image: string;
  email: string;
  is_admin: boolean;
  programs?: IProgram[];
  streamer?: Streamer[];
}

export interface Streamer {
  id: number;
  user_id: number;
  streamer_id: number;
  user_name: string;
  display_name: string;
  comments: string;
}
