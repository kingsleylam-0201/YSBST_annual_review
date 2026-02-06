import { createClient } from '@supabase/supabase-js';
import { PartnerData } from '../types.ts';

const SUPABASE_URL = 'https://vsyqplhvkaqvzexxkdte.supabase.co'; 
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzeXFwbGh2a2FxdnpleHhrZHRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwODYxODIsImV4cCI6MjA4NTY2MjE4Mn0.MtiGJ-4bmTMFnf-I4PLcnHF9K1JCDbpche5hUGa3l00';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export const fetchPartnerData = async (name: string): Promise<PartnerData> => {
  const { data, error } = await supabase
    .from('annual_reviews')
    .select('*')
    .eq('factory_name', name.trim())
    .single();

  if (error) {
    console.error('Supabase fetch error:', error);
    if (error.code === 'PGRST116') {
      throw new Error('未找到该厂家数据，请确认名称（需完全一致）');
    }
    throw new Error('网络请求失败，请稍后再试');
  }

  if (!data) {
    throw new Error('未找到相关记录');
  }

  return {
    manufacturerName: data.factory_name,
    firstCooperationDate: data.first_cooperation_date,
    firstProduct: data.first_product,
    totalSales2025: Number(data.total_sales_2025),
    yoyGrowth: Number(data.yoy_growth),
    monthlySales: data.monthly_sales, 
    topProduct: {
      name: data.top_product_name,
      totalSales: Number(data.top_product_total_sales),
      monthlyStores: data.top_product_monthly_stores, 
      highlightMoment: {
        month: data.highlight_month,
        amount: Number(data.highlight_amount),
        stores: Number(data.highlight_stores),
      },
    },
  };
};