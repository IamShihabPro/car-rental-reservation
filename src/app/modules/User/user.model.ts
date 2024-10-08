import { Query, Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcryptjs';
import config from "../../config";

const userSchema = new Schema<TUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String, required: true},
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    isDeleted: { type: Boolean, default: false},
},
{
    timestamps: true,
},
)

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
    }
    next();
});

userSchema.post('save', function(doc, next) {
    doc.password = '';
    next();
});


userSchema.pre<Query<TUser, TUser>>('find', function(next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});

userSchema.pre<Query<TUser, TUser>>('findOne', function(next) {
    this.where({ isDeleted: { $ne: true } });
    next();
})

userSchema.index({ email: 1 }, { unique: true });

export const User = model<TUser>('User', userSchema)