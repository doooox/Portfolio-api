export interface IUser {
  _id: string;
  email: string;
  isAdmin: boolean;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}
