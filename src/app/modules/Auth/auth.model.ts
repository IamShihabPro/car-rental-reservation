// models/user.model.ts
import { Schema, model } from 'mongoose';
import { TSignup } from './auth.interface';

const userSchema = new Schema<TSignup>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
}, {
  timestamps: true,
});

const User = model<TSignup>('User', userSchema);

export default User;
