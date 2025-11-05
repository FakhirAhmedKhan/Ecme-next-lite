import { Stock } from './stock';
import { ComponentType } from 'react';

export type StockTab = 'Product' | 'Order' | 'Customers' | 'Return' | 'Repairing' | 'Images';

export interface StockDetails extends Stock {
  stockId: string;
  status: number;
  suppliarName: string;
}

export interface StockTabInfo {
  id: StockTab;
  icon: ComponentType<{ className?: string }>;
  label: string;
}

export interface ChartData {
  labels: string[];
  data: number[];
}

export type StockTabProps = {
  id: StockTab;
  icon: ComponentType<{ className?: string }>;
  label: string;
}

export type StockSetActiveTab = (tab: StockTab) => void;
export type StockHandleTabClick = (tabId: StockTab) => void;