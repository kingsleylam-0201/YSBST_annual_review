
import React from 'react';

interface SlideWrapperProps {
  children: React.ReactNode;
  active: boolean;
}

const SlideWrapper: React.FC<SlideWrapperProps> = ({ children, active }) => {
  if (!active) return null;

  // 生成一些随机位置的星光粒子
  const sparkles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 4 + 2}px`,
    delay: `${Math.random() * 10}s`,
    duration: `${Math.random() * 10 + 10}s`,
  }));

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden gradient-bg slide-enter slide-enter-active">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Red Glow - 核心红韵 */}
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-red-600/20 rounded-full blur-[120px]" />
        {/* Gold Glow - 财富金光 */}
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px]" />
        
        {/* 动态星光粒子 - 对应 index.html 中的 sparkle 动画 */}
        {/* Added index 'i' to map callback to fix "Cannot find name 'i'" errors */}
        {sparkles.map((s, i) => (
          <div
            key={s.id}
            className="sparkle"
            style={{
              left: s.left,
              bottom: '-20px', // 从底部升起
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              animationDuration: s.duration,
              backgroundColor: i % 2 === 0 ? '#fbbf24' : '#ffffff', // 金色与白色交替
              boxShadow: `0 0 10px ${i % 2 === 0 ? '#fbbf24' : '#ffffff'}`
            }}
          />
        ))}

        {/* 固定装饰点缀 */}
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-amber-400 rounded-full blur-[1px] opacity-40 animate-pulse" />
        <div className="absolute top-1/2 right-12 w-3 h-3 bg-red-400 rounded-full blur-[2px] opacity-30 animate-ping" />
      </div>
      
      <div className="z-10 w-full max-w-lg h-full flex flex-col py-12">
        {children}
      </div>
    </div>
  );
};

export default SlideWrapper;
