import Chance from "chance";
import { IProgram, IUser } from "../../src/models/types";
const chance = new Chance();

export const mockUser = (data?: IUser): IUser => ({
  id: data?.id || chance.integer(),
  created_at: data?.created_at || chance.date().toString(),
  updated_at: data?.updated_at || chance.date().toString(),
  name: data?.name || chance.word(),
  quote: data?.quote || chance.sentence(),
  location: data?.location || chance.address(),
  profile_image:
    data?.profile_image || chance.url({ extensions: ["png", "jpeg"] }),
  email: data?.email || chance.email()
});

export const mockProgram = (data?: IProgram): IProgram => ({
  id: data.id || chance.integer(),
  name_en: data.name_en || chance.word(),
  name_he: data.name_he || chance.word(),
  description: data.description || chance.word(),
  cover_image: data.cover_image || chance.word(),
  is_displayed: data.is_displayed || true,
  created_at: data.created_at || chance.date().toString(),
  updated_at: data.updated_at || chance.date().toString()
});
export const mockRecordedShow = () => ({});
