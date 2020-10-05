import { BASE_API_URL } from "../config/api.config";

import { UsersService } from "../services/users.service";
import httpClient from "../services/http.client";
import BaseApiService from "../services/base.api.service";
import { useEffect, useState } from "react";
import { IUser } from "../models/types";

const apiService = new BaseApiService(BASE_API_URL, httpClient);
const usersService = new UsersService(apiService);

export const useUsers = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const fetchedUsers = await usersService.getAllUsers();
      setUsers(fetchedUsers);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return { isLoading, users };
};
