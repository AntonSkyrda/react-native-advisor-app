export interface AuthUser {
  accessToken: string;
  email: string;
  firstName: string;
  id: number;
  image: string;
  lastName: string;
  refreshToken: string;
  username: string;
}

export interface LoginPayload {
  password: string;
  username: string;
}

export interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}
