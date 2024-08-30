// car.model.ts
import { Query, Schema, model } from 'mongoose';
import { TCar } from './cars.interface';

const carSchema = new Schema<TCar>({
    brand: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    image: { type: String, required: true },
    isElectric: { type: Boolean, required: true, default: false },
    status: { type: String, enum: ['available', 'unavailable'], default: 'available' },
    features: { type: [String], required: true },
    pricePerHour: { type: Number, required: true },
    gps:  { type: Boolean, required: true, default: false },
    childSeat:  { type: Boolean, required: true, default: false },
    isDeleted: { type: Boolean, default: false }
},
{
    timestamps: true,
},
);

const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const capitalizeWords = (str: string) => {
    return str.split(' ').map(word => capitalizeFirstLetter(word)).join(' ');
  };

carSchema.pre('save', function (next) {
    this.brand = capitalizeWords(this.brand);
    this.name = capitalizeWords(this.name);
    this.color = capitalizeWords(this.color);
    next();
});

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