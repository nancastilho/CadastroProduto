import api from "../api";
import { ILogin } from "../interface";

const postForm = async (loginData: ILogin) => {
  const response = await api.post("/login", loginData);
  const data = response.data;
  return data;
};

export const loginService = {
  postForm,
};
