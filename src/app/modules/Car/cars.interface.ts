export type TCarStatus = 'available' | 'unavailable';

export interface TCar {
  brand: string;
  name: string;
  description: string;
  color: string;
  image: string;
  location: string;
  isElectric: boolean;
  status: TCarStatus; 
  features: string[];
  pricePerHour: number;
  gps: boolean;
  childSeat: boolean;
  isDeleted: boolean;
}