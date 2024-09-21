export interface ILogin {
  cpf: string;
  senha: string;
}

export interface IUser {
  id?: number;
  nome: string;
  cpf: string;
  email?: string;
  nomeUsuario: string;
  senha: string;
  foto?: string;
  admin: boolean;
}
