// car.model.ts
import { Query, Schema, model } from 'mongoose';
import { TCar } from './cars.interface';

const carSchema = new Schema<TCar>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    isElectric: { type: Boolean, required: true },
    status: { type: String, enum: ['available', 'unavailable', 'maintenance'], default: 'available' },
    features: { type: [String], required: true },
    pricePerHour: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false }
},
{
    timestamps: true,
},
);

// Middleware to exclude deleted cars
carSchema.pre<Query<TCar, TCar>>('find', function(next) {
    this.where({ isDeleted: { $ne: true } });
    next();
});

carSchema.pre<Query<TCar, TCar>>('findOne', function(next) {
    this.where({ isDeleted: { $ne: true } });
    next();
})

const Car = model<TCar>('Car', carSchema);

export default Car;