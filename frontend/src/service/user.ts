import api from "../api";
import { IUser } from "../interface";

const createUser = async (userData: IUser) => {
  const response = await api.post("/users", userData);
  const data = response.data;
  return data;
};

export const userService = {
 createUser,
};
