export type TSignup = {
    name: string;
    email: string;
    role: 'user' | 'admin';
    password: string;
    phone: string;
    address: string;
    isDeleted: boolean;
}