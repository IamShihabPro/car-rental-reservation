export type TCarStatus = 'available' | 'unavailable';

export interface TCar {
  brand: string;
  name: string;
  description: string;
  color: string;
  image: string;
  isElectric: boolean;
  status: TCarStatus; 
  features: string[];
  pricePerHour: number;
  gps: 'yes' | 'no';
  childSeat: 'yes' | 'no';
  isDeleted: boolean;
}