const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api';

export const AUTH_TOKEN_KEY = 'AUTH_TOKEN';

type ApiErrorBody = {
  message?: string;
  errors?: { msg: string }[];
};

export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await response.json();
  if (!response.ok) {
    const body = data as ApiErrorBody;
    const message =
      body.errors?.map((e) => e.msg).join('\n') ?? body.message ?? 'Error de conexión';
    throw new Error(message);
  }
  return data as T;
}
