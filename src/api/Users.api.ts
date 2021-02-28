import { BASE_API_URL } from "../config/api.config";
import { IFullUser } from "../models/types";
import HttpClient from "../services/http.client";

export const getUserById = (userId: string | number) => {
  return HttpClient.get<{ user: IFullUser }>(
    `${BASE_API_URL}/v2/users/${userId}`
  );
};
export const getAllUsers = (userId: string | number) => {
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
