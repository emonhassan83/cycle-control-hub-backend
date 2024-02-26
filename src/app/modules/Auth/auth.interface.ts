export interface TRegisterUser {
  username: string;
  email: string;
  password: string;
  role: 'buyer'| 'seller';
}

export interface TLoginUser {
  email: string;
  password: string;
}
