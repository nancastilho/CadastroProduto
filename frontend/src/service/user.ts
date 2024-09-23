import api from "../api";
import { IUser } from "../interface";

const createUser = async (userData: IUser) => {
  const response = await api.post("/users", userData);
  const data = response.data;
  return data;
};

const getUsuario = async () => {
  const response = await api.get<IUser[]>("/users");
  return response.data;
};

const updateUsuario = async (id: number, produtoData: Partial<IUser>) => {
  const response = await api.put<IUser>(`/users/${id}`, produtoData);
  return response.data;
};

const deleteUsuario = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

export const userService = {
  createUser,
  getUsuario,
  updateUsuario,
  deleteUsuario,
};
