export type TCarStatus = 'available' | 'unavailable' | 'maintenance';

export interface TCar {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: TCarStatus; 
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
}