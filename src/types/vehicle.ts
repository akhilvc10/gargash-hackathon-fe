export type VehicleMode = 'buy' | 'lease' | 'rent';

export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric';

export type BodyStyle = 
  | 'sedan' 
  | 'suv' 
  | 'hatchback' 
  | 'coupe' 
  | 'convertible' 
  | 'wagon'
  | 'minivan'
  | 'pickup';

export interface VehicleSpec {
  engine: string;
  transmission: string;
  horsepower: number;
  torque: string;
  fuelEconomy: string;
  acceleration: string;
  drivetrain: string;
}

export interface VehicleFeature {
  category: string;
  items: string[];
}

export interface VehiclePricing {
  buy?: {
    msrp: number;
    offer: number;
    downPayment: number;
    monthlyPayment: number;
    apr: number;
    term: number;
  };
  lease?: {
    monthlyPayment: number;
    downPayment: number;
    term: number;
    mileageLimit: number;
    residualValue: number;
  };
  rent?: {
    dailyRate: number;
    weeklyRate: number;
    monthlyRate: number;
    deposit: number;
  };
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  title: string;
  description: string;
  price: number;
  priceType: string;
  thumbnail: string;
  images: string[];
  availableModes: VehicleMode[];
  bodyStyle: BodyStyle;
  fuelType: FuelType;
  mileage: number;
  color: string;
  interiorColor: string;
  condition: 'new' | 'used';
  rating?: number;
  specs: VehicleSpec;
  features: VehicleFeature[];
  pricing: VehiclePricing;
  stock: number;
  location: string;
  dealershipId: string;
  dealershipName: string;
} 