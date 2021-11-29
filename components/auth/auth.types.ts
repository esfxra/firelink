export interface Inputs {
  username: string;
  password: string;
}

export interface AuthApiResponse<T> {
  success: boolean;
  data: T;
}
