import { api } from "./api";

interface RegistroData {
  nome: string;
  email: string;
  senha: string;
  curso: string;
  periodo: string;
}

export async function registrarUsuario(data: RegistroData) {
  const response = await api.post("/api/auth/register", data);

  return response.data;
}

export function getToken() {
  return localStorage.getItem('token')
}

export function isLoggedIn() {
  return Boolean(getToken())
}

export function logout() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}