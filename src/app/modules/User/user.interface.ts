export type TUser = {
  name: string;
  email: string;
  image: string;
  role: 'user' | 'admin';
  password: string;
  phone: string;
  address: string;
  isDeleted: boolean;
}
