import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Search, 
  TrendingUp, 
  Calendar, 
  Award, 
  Store,
  Sparkles,
  AlertCircle,
  Gift,
  Heart
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell
} from 'recharts';
import SlideWrapper from './components/SlideWrapper';
import { PartnerData, AppState } from './types';
import { fetchPartnerData } from './services/dataService';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [appState, setAppState] = useState<AppState>('IDLE');
  const [nameInput, setNameInput] = useState('');
  const [data, setData] = useState<PartnerData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleStart = async () => {
    if (!nameInput.trim()) return;
    setAppState('LOADING');
    setErrorMsg(null);
    try {
      const result = await fetchPartnerData(nameInput);
      setData(result);
      setAppState('VIEWING');
      setCurrentSlide(1); 
    } catch (error: any) {
      console.error("Failed to load data", error);
      setErrorMsg(error.message || "获取数据失败，请重试");
      setAppState('IDLE');
    }
  };

  const next = () => setCurrentSlide(prev => Math.min(prev + 1, 8));
  const prev = () => setCurrentSlide(prev => Math.max(prev - 1, 0));

  const reset = () => {
    setAppState('IDLE');
    setCurrentSlide(0);
    setNameInput('');
    setData(null);
    setErrorMsg(null);
  };

  return (
    <div className="relative h-screen w-screen bg-[#0a0000] text-white selection:bg-red-500">
      {appState === 'VIEWING' && (
        <div className="fixed top-0 left-0 w-full h-1 z-50 flex gap-1 px-1">
          {Array.from({ length: 9 }).map((_, i) => (
            <div 
              key={i} 
              className={`h-full flex-1 transition-all duration-700 ${i <= currentSlide ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : 'bg-red-950/40'}`}
            />
          ))}
        </div>
      )}

      {appState === 'VIEWING' && (
        <div className="fixed bottom-8 left-0 w-full px-6 flex justify-between items-center z-50">
          <button 
            onClick={currentSlide === 0 ? reset : prev}
            className="p-3 rounded-full bg-red-950/30 backdrop-blur-md border border-red-900/50 text-red-400 hover:text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="text-xs font-mono text-red-900/80 tracking-widest uppercase font-bold">
            {currentSlide + 1} / 9
          </div>

          <button 
            onClick={currentSlide === 8 ? reset : next}
            className="p-3 rounded-full bg-gradient-to-br from-red-600 to-red-800 shadow-lg shadow-red-900/40 text-white transition-all active:scale-95"
          >
            {currentSlide === 8 ? <Heart size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>
      )}

      <main className="h-full w-full">
        <SlideWrapper active={currentSlide === 0}>
          <div className="flex-1 flex flex-col items-center justify-center space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-block px-4 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-bold tracking-wide uppercase">
                2025 Partner Annual Review
              </div>
              <h1 className="text-5xl font-black tracking-tight leading-tight">
                药师帮合作伙伴<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">年度回顾</span>
              </h1>
              <p className="text-red-200/60 max-w-[280px] mx-auto">输入厂家名称，开启属于我们的鸿运 2025。</p>
            </div>

            <div className="w-full space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className={`h-5 w-5 ${errorMsg ? 'text-red-400' : 'text-red-900/60'} group-focus-within:text-red-400 transition-colors`} />
                </div>
                <input
                  type="text"
                  placeholder="请输入厂家全称..."
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className={`block w-full pl-12 pr-4 py-4 bg-red-950/20 border ${errorMsg ? 'border-red-500' : 'border-red-900/30'} rounded-2xl text-white placeholder-red-900/40 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all`}
                  onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                />
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 text-red-400 text-sm px-2 animate-pulse font-medium">
                  <AlertCircle size={14} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                onClick={handleStart}
                disabled={!nameInput.trim() || appState === 'LOADING'}
                className="w-full py-4 bg-gradient-to-r from-red-700 to-red-600 hover:from-red-600 hover:to-red-500 disabled:from-slate-800 disabled:to-slate-900 disabled:text-slate-500 text-white font-bold rounded-2xl shadow-xl shadow-red-900/40 transition-all flex items-center justify-center gap-2"
              >
                {appState === 'LOADING' ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>生成年度报告 <ChevronRight size={18} /></>
                )}
              </button>
            </div>
          </div>
        </SlideWrapper>

        <SlideWrapper active={currentSlide === 1}>
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 px-4">
            <div className="w-20 h-20 bg-red-600/20 rounded-full flex items-center justify-center animate-bounce shadow-[0_0_30px_rgba(220,38,38,0.2)] border border-red-500/20">
              <Gift className="text-red-400 w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold leading-relaxed tracking-wide">
              致敬每一个愿意<br/>
              <span className="text-amber-500 underline underline-offset-8 decoration-amber-500/50">拥抱变化</span>、<br/>
              笃定携手同行的伙伴。
            </h2>
            <p className="text-red-300/60 text-sm mt-4 font-medium">2025 鸿运当头 · {data?.manufacturerName}</p>
          </div>
        </SlideWrapper>

        <SlideWrapper active={currentSlide === 2}>
          <div className="flex-1 flex flex-col space-y-12">
            <div className="space-y-4">
              <Calendar className="text-red-500 w-10 h-10" />
              <h3 className="text-2xl font-bold">故事的起点</h3>
            </div>
            
            <div className="bg-red-950/20 p-8 rounded-3xl border border-red-900/30 space-y-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Sparkles className="text-amber-500 w-20 h-20" />
               </div>
              <div>
                <p className="text-red-400/60 text-sm mb-1 font-bold">首次动销时间</p>
                <p className="text-3xl font-black text-red-500">{data?.firstCooperationDate}</p>
              </div>
              <div className="h-[1px] bg-red-900/30 w-full" />
              <div>
                <p className="text-red-400/60 text-sm mb-2 font-bold">首个合作产品</p>
                <p className="text-xl font-bold text-white">{data?.firstProduct}</p>
              </div>
            </div>

            <p className="text-red-100/60 leading-relaxed font-medium">
              从那天起，{data?.manufacturerName} 与药师帮开启了跨越山海的连接。
            </p>
          </div>
        </SlideWrapper>

        <SlideWrapper active={currentSlide === 3}>
          <div className="flex-1 flex flex-col space-y-10">
            <div className="space-y-4">
              <TrendingUp className="text-red-500 w-10 h-10" />
              <h3 className="text-2xl font-bold">25年合作规模</h3>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-700 to-rose-900 p-8 rounded-3xl shadow-2xl border border-red-500/30">
                <p className="text-red-100/70 text-sm mb-1 uppercase tracking-widest font-bold">年度合作销售总额</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-amber-400">¥</span>
                  <span className="text-5xl font-black tracking-tight leading-none text-white">
                    {(data?.totalSales2025 || 0).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 bg-red-950/20 border border-red-900/30 p-6 rounded-3xl">
                  <p className="text-red-400/60 text-xs mb-2 font-bold">同比24年增长</p>
                  <p className="text-3xl font-black text-amber-500">+{data?.yoyGrowth}%</p>
                </div>
                <div className="flex-1 bg-red-950/20 border border-red-900/30 p-6 rounded-3xl flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-red-500">
                    <TrendingUp size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">势不可挡</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-red-200/50 italic font-medium">
              每一分数字的增长，都见证了我们在市场浪潮中的共同进退。
            </p>
          </div>
        </SlideWrapper>

        <SlideWrapper active={currentSlide === 4}>
          <div className="flex-1 flex flex-col space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">月度销售轨迹</h3>
              <p className="text-red-400/60 text-sm font-medium">2025年1月 - 12月 销售趋势（元）</p>
            </div>

            <div className="flex-1 min-h-[300px] w-full bg-red-950/10 border border-red-900/20 p-4 rounded-3xl">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.monthlySales}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#450a0a" vertical={false} />
                  <XAxis dataKey="month" stroke="#991b1b" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#450a0a', borderColor: '#7f1d1d', borderRadius: '12px' }}
                    itemStyle={{ color: '#f87171' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#ef4444" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </SlideWrapper>

        <SlideWrapper active={currentSlide === 5}>
          <div className="flex-1 flex flex-col space-y-12">
            <div className="space-y-4">
              <Award className="text-amber-500 w-10 h-10" />
              <h3 className="text-2xl font-bold">2025 年度产品</h3>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-red-600 blur-3xl opacity-20 group-hover:opacity-30 transition-opacity" />
              <div className="relative bg-red-950/30 border border-red-500/20 p-8 rounded-3xl text-center space-y-6 backdrop-blur-sm">
                <div className="w-24 h-24 bg-gradient-to-tr from-red-600 to-amber-600 rounded-full mx-auto flex items-center justify-center shadow-[0_10px_40px_rgba(220,38,38,0.4)] border-4 border-amber-500/20">
                   <Award className="text-white w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-2xl font-black text-white px-2">
                    {data?.topProduct.name}
                  </h4>
                  <p className="text-amber-500 font-bold tracking-widest uppercase text-xs">Annual Star Product</p>
                </div>
                <div className="pt-4 h-[1px] bg-red-900/30" />
                <div className="flex justify-around">
                  <div className="text-center">
                    <p className="text-red-400/60 text-xs mb-1 font-bold">年度单品销额</p>
                    <p className="text-xl font-bold text-white">¥{((data?.topProduct.totalSales || 0) / 10000).toFixed(0)}万+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SlideWrapper>

        <SlideWrapper active={currentSlide === 6}>
          <div className="flex-1 flex flex-col space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Store className="text-red-500 w-6 h-6" />
                <h3 className="text-xl font-bold">单品渠道渗透</h3>
              </div>
              <p className="text-red-400/60 text-sm font-medium">{data?.topProduct.name} - 月度销售金额</p>
            </div>

            <div className="flex-1 min-h-[300px] w-full bg-red-950/10 border border-red-900/20 p-4 rounded-3xl">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data?.topProduct.monthlyStores}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#450a0a" vertical={false} />
                  <XAxis dataKey="month" stroke="#991b1b" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    cursor={{fill: '#450a0a'}}
                    contentStyle={{ backgroundColor: '#450a0a', borderColor: '#7f1d1d', borderRadius: '12px' }}
                    itemStyle={{ color: '#fca5a5' }}
                    labelStyle={{ color: '#f87171' }}
                  />
                  <Bar 
                    dataKey="amount" 
                    fill="#ef4444" 
                    radius={[4, 4, 0, 0]} 
                    barSize={20}
                  >
                    {data?.topProduct.monthlyStores.map((entry, index) => (
                       <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#ef4444' : '#b91c1c'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </SlideWrapper>

        <SlideWrapper active={currentSlide === 7}>
          <div className="flex-1 flex flex-col space-y-12">
            <div className="space-y-4">
              <Sparkles className="text-amber-500 w-10 h-10" />
              <h3 className="text-2xl font-bold">高光时刻</h3>
            </div>

            <div className="bg-red-950/20 border-2 border-amber-500/20 p-8 rounded-[40px] relative overflow-hidden group backdrop-blur-sm">
              <div className="absolute top-0 right-0 p-4">
                <Award className="text-amber-500/10 w-20 h-20 rotate-12" />
              </div>
              
              <div className="space-y-8 relative z-10">
                <div className="space-y-1">
                  <p className="text-amber-500 font-black tracking-widest text-sm italic uppercase">Moment of Glory</p>
                  <h4 className="text-5xl font-black text-white">{data?.topProduct.highlightMoment.month}</h4>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-red-900/20 p-6 rounded-3xl border border-red-500/10">
                    <p className="text-red-400/60 text-xs mb-1 uppercase tracking-wider font-bold">单月最高销额</p>
                    <p className="text-3xl font-black text-amber-500">¥{(data?.topProduct.highlightMoment.amount || 0).toLocaleString()}</p>
                  </div>
                  <div className="bg-red-900/20 p-6 rounded-3xl border border-red-500/10">
                    <p className="text-red-400/60 text-xs mb-1 uppercase tracking-wider font-bold">单月采购店数</p>
                    <p className="text-3xl font-black text-amber-500">{data?.topProduct.highlightMoment.stores.toLocaleString()} 家</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SlideWrapper>

        <SlideWrapper active={currentSlide === 8}>
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-16">
            <div className="space-y-6">
              <div className="text-transparent bg-clip-text bg-gradient-to-b from-white to-red-400 text-4xl font-black leading-snug">
                一路同行，<br/>共赴山海。
              </div>
              <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
            </div>

            <div className="space-y-4">
              <p className="text-red-400/60 text-sm tracking-[0.3em] uppercase font-bold">2025 YSB Annual Review</p>
              <div className="bg-red-900/40 backdrop-blur border border-red-800/40 py-3 px-8 rounded-full inline-block shadow-inner">
                <p className="text-amber-500 font-bold tracking-[0.2em]">药师帮首推项目部 敬上</p>
              </div>
            </div>

            <button
              onClick={reset}
              className="mt-8 text-red-500/60 hover:text-red-400 transition-colors flex items-center gap-2 text-sm font-bold"
            >
              再看一次 <ChevronRight size={14} />
            </button>
          </div>
        </SlideWrapper>
      </main>
    </div>
  );
};

export default App;