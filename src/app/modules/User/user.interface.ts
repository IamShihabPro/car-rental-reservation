export type UserRole = 'user' | 'admin';

export type TUser = {
  name: string;
  email: string;
  role: UserRole;
  password: string;
  phone: string;
  address: string;
}
