
export interface MonthlyData {
  month: string;
  amount: number;
  stores?: number;
}

export interface PartnerData {
  manufacturerName: string;
  firstCooperationDate: string;
  firstProduct: string;
  totalSales2025: number;
  yoyGrowth: number;
  monthlySales: MonthlyData[];
  topProduct: {
    name: string;
    totalSales: number;
    monthlyStores: MonthlyData[];
    highlightMoment: {
      month: string;
      amount: number;
      stores: number;
    };
  };
}

export type AppState = 'IDLE' | 'LOADING' | 'VIEWING';
