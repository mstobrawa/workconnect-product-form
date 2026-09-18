export type Product = {
  id: string;
  name: string;
  sku: string;
  description?: string;
  manufacturer: string;
  category: string;
  features: string[];
  netPrice: number;
  grossPrice: number;
  vat: number;
  currency: string;
  isAvailable: boolean;
  isLimited: boolean;
  stockQuantity?: number;
  minCartQuantity: number;
  maxCartQuantity: number;
};
