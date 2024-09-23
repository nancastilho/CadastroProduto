import api from "../api";
import { IProduto } from "../interface";

const getProdutos = async () => {
  const response = await api.get<IProduto[]>("/produtos");
  return response.data;
};

const createProduto = async (produtoData: IProduto) => {
  const response = await api.post<IProduto>("/produtos", produtoData);
  return response.data;
};

const updateProduto = async (id: number, produtoData: Partial<IProduto>) => {
  const response = await api.put<IProduto>(`/produtos/${id}`, produtoData);
  return response.data;
};

const deleteProduto = async (id: number) => {
  const response = await api.delete(`/produtos/${id}`);
  return response.data;
};

export const produtoService = {
  getProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
};
