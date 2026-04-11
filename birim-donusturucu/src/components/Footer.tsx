export function Footer() {
  return (
    <section className="lg:col-span-12 h-32 relative overflow-hidden bg-[#0c0e0f] flex items-center px-8 border-t border-[#00E5FF]/10">
      <div className="absolute inset-0 opacity-20">
        <div 
          className="w-full h-full"
          style={{
            background: 'linear-gradient(90deg, #00E5FF 0%, transparent 50%, #00E5FF 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s infinite'
          }}
        />
      </div>
      <div className="relative z-10 flex gap-12 items-center w-full">
        <div className="flex flex-col">
          <span className="text-[10px] text-[#c3f5ff] uppercase font-bold tracking-widest">Sistem Durumu</span>
          <span className="text-lg font-mono">CALIBRATED_NOMINAL</span>
        </div>
        <div className="h-8 w-px bg-[#3b494c]/30"></div>
        <div className="flex-1 hidden md:block">
          <div className="w-full h-1 bg-[#333536] overflow-hidden">
            <div className="h-full bg-[#00E5FF] w-2/3"></div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[9px] text-zinc-600">CPU: 12%</span>
            <span className="text-[9px] text-zinc-600">MEM: 4.2GB</span>
          </div>
        </div>
        <div className="text-right ml-auto">
          <span className="text-2xl font-black text-[#e2e2e3]/20 italic tracking-tighter uppercase">
            Laboratuvar Modu v4.0
          </span>
        </div>
      </div>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
