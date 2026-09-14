import type { Metal } from '../data';

export interface RequestPiece {
  id: string;
  category: string;
  price: number | null;
  metals: Metal[];
  metal: Metal;
  quantity: number;
  image?: string;
}

export interface DetailsFields {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}