export interface TRegisterUser {
  username: string;
  email: string;
  password: string;
  role: 'user';
}

export interface TLoginUser {
  email: string;
  password: string;
}
