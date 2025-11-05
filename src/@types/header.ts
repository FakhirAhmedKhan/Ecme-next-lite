import { ReactNode } from 'react';

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
  Icon?: ReactNode;
  showButton: boolean;
  setChartData?: ((data: any) => void) | undefined;
  greeting?: string;
  setIsModalOpen?: (open: boolean) => void;
}