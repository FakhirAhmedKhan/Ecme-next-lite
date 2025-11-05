import { Stock } from '@/@types/stock';

// Define the base stock type used in useStock hook
export interface BaseStock {
  id: string;
  status: 'active' | 'inactive' | 'pending';
  // Add other common fields
}

// Define the mapping function to convert BaseStock to Stock
export function mapToStock(baseStock: BaseStock): Stock {
  return {
    id: baseStock.id,
    stockId: baseStock.id,
    status: baseStock.status === 'active' ? 1 : baseStock.status === 'inactive' ? 0 : 2,
    expiryDate: '', // Fill with appropriate default or actual value
    suppliarName: '', // Fill with appropriate default or actual value
    stockTitle: '', // Fill with appropriate default or actual value
    totalQuantity: 0, // Fill with appropriate default or actual value
    quantityAvailable: 0, // Fill with appropriate default or actual value
    reorderLevel: 0, // Fill with appropriate default or actual value
    stockPrice: 0, // Fill with appropriate default or actual value
    totalProfit: 0, // Fill with appropriate default or actual value
    createdAt: new Date().toISOString(),
    category: '',
    unitPrice: 0,
    totalLoss: 0,
    repairningCost: 0
  };
}