export type User = {
  _id: string;
  handle: string;
  name: string;
  email: string;
};

export type RegisterForm = {
  name: string;
  email: string;
  handle: string;
  password: string;
};

export type LoginForm = {
  email: string;
  password: string;
};
