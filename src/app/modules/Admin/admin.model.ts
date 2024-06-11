import { Schema, model } from "mongoose";
import { TAdmin } from "./admin.interface";

const adminSchema = new Schema<TAdmin>({
    user: {type: Schema.Types.ObjectId, required: [true, 'User id is required'], unique: true, ref: 'User'},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    // password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
},
{
    timestamps: true,
},
)

export const Admin = model<TAdmin>('Admin', adminSchema)