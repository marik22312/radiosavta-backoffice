import { BASE_API_URL } from "../config/api.config";
import { User } from "../domain/Users";
import { IFullUser } from "../models/types";
import HttpClient from "../services/http.client";

export const getUserById = async (userId: string | number) => {
  const { data } = await HttpClient.get<User>(
    `${BASE_API_URL}/admin/users/${userId}`
  );
  return data;
};
export const getAllUsers = () => {
  return HttpClient.get<{ users: IFullUser[] }>(`${BASE_API_URL}/v2/users/`);
};

export const updateUserById = (
  userId: string | number,
  data: { name: string; location: string }
) => {
  const { name, location } = data;

  return HttpClient.put<{ user: IFullUser }>(
    `${BASE_API_URL}/v2/users/${userId}`,
    { name, location }
  );
};

export interface CreateUserRequest {
  name: string;
  email: string;
  location: string;
  showOnWebsite: boolean;
  streamerUsername: string;
  profile_picture: File;
}
export interface CreateUserRespone {
  user: User;
}
export const createUser = async (user: CreateUserRequest) => {
  const form = new FormData();
  form.append("email", user.email);
  form.append("name", user.name);
  form.append("location", user.location);
  form.append("profile_picture", user.profile_picture);
  if (user.streamerUsername) {
    form.append("streamerUsername", user.streamerUsername);
  }
  if (user.showOnWebsite) {
    form.append("showOnWebsite", "true");
  }

  const { data } = await HttpClient.post<CreateUserRespone>(
    `${BASE_API_URL}/v2/users`,
    form,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return data;
};

export const updateUserImage = async (userId: number | string, image: File) => {
  const form = new FormData();
  form.append("profile_image", image);

  const { data } = await HttpClient.put(`/v2/users/${userId}`, form, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return data;
};
