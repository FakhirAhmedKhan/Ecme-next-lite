export interface Stock {
  id: string;
  stockId: string;
  status: number;
  expiryDate: string;
  suppliarName: string;
  stockTitle: string;
  totalQuantity: number;
  quantityAvailable: number;
  reorderLevel: number;
  stockPrice: number;
  totalProfit: number;
  createdAt: string;
  category?: string;
  unitPrice: number;
  totalLoss: number;
  repairningCost: number;
}

export interface StockDetails extends Stock {
  // Add additional fields specific to stock details
}

export type StockTab = 'Product' | 'Order' | 'Customers' | 'Return' | 'Repairing' | 'Images';


export interface StockTabsProps {
  stock: Stock;
  stockId: string;
  activeTab: StockTab;
  setActiveTab: (tab: StockTab) => void;
  isLoading: boolean;
  onOrderCreated: () => void;
  onStockUpdated: () => void;
  handleTabClick: (id: StockTab) => void;
  tabs: Array<{
    id: StockTab;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
  }>;
}

export interface HeaderProps {
  H1Heading: string;
  Paragraph: string;
  BtnText: string;
  Updates: string;
  StutsUpdates: string;
  setData: any;
  isVisible: boolean;
  time: Date;
  showRangePicker: boolean;
  Icon: React.ElementType;
  showButton: boolean;
}

export interface StatusProps {
  isLoading: boolean;
  entityName: string;
  totalCount: number;
  loadingText: string;
  filteredLength: number;
}

export interface Product {
  id: string;
  name: string;
  status: number;
  price: number;
  quantity: number;
  barcode: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  storage: string;
  color?: string;
}

export interface StockSummaryPanelProps {
  stock: Stock;
  pieData: {
    labels: string[];
    data: number[];
  };
  onClose: () => void;
  isLoading: boolean;
  netProfit: number;
  formattedExpiry: string;
  expiryStatus: string;
  expiryColor: string;
}
export interface StockProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
}

export interface StockProductRowProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export interface StatusConfig {
  [key: string]: {
    label: string;
    color: string;
    icon?: React.ComponentType<{ className?: string }>;
  };
}

