export function Header() {
  return (
    <header className="bg-[#121415] text-[#00E5FF] font-['Space_Grotesk'] uppercase tracking-[0.05em] text-xs docked full-width top-0 border-b-0 flex justify-between items-center w-full px-6 py-4 fixed z-50">
      <div className="text-xl font-bold tracking-tighter text-[#00E5FF]">NEON CONVERT</div>
      <nav className="hidden md:flex gap-8 items-center">
        <a className="text-[#00E5FF] border-b-2 border-[#00E5FF] pb-1 cursor-pointer active:opacity-70 transition-colors" href="#">
          Dönüştürücü
        </a>
        <a className="text-zinc-500 hover:text-cyan-300 transition-colors cursor-pointer active:opacity-70" href="#">
          Geçmiş
        </a>
        <a className="text-zinc-500 hover:text-cyan-300 transition-colors cursor-pointer active:opacity-70" href="#">
          Ayarlar
        </a>
      </nav>
      <div className="flex items-center gap-4">
        <span className="material-symbols-outlined cursor-pointer active:opacity-70 text-2xl">account_circle</span>
      </div>
    </header>
  );
}
