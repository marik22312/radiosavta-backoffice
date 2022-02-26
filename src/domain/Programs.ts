import { RecordedShow } from "./RecordedShow";
import { User } from "./Users";

export interface Program {
  id: number | string;
  name_en: string;
  name_he?: string;
  description: string;
  cover_image: string;
  is_displayed?: boolean;
  users?: User[];
  recorded_shows: RecordedShow[];
}
