import { UNIT_CATEGORIES, type UnitCategory } from '@/hooks/useConverter';

interface CategoryNavProps {
  activeCategory: UnitCategory;
  onCategoryChange: (category: UnitCategory) => void;
}

export function CategoryNav({ activeCategory, onCategoryChange }: CategoryNavProps) {
  return (
    <aside className="bg-[#1a1c1d] font-['Space_Grotesk'] font-medium text-sm h-full w-64 fixed left-0 top-16 border-r border-zinc-800/15 pt-8 hidden md:flex flex-col z-40">
      <div className="px-6 mb-8">
        <h2 className="text-[#00E5FF] font-black uppercase tracking-widest text-xs">Kategoriler</h2>
        <p className="text-zinc-500 text-[10px] mt-1 uppercase">Laboratuvar Modu</p>
      </div>
      <nav className="flex flex-col gap-1">
        {UNIT_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`px-6 py-4 flex items-center gap-4 duration-200 ease-in-out transition-all text-left ${
              activeCategory === cat.id
                ? 'bg-[#282a2b] text-[#00E5FF] border-l-4 border-[#00E5FF]'
                : 'text-zinc-400 hover:bg-[#333536] hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined">{cat.icon}</span>
            {cat.name}
          </button>
        ))}
      </nav>
      <div className="mt-auto p-6">
        <div className="bg-[#333536] p-4 border-l-2 border-[#00E5FF]">
          <p className="text-[10px] text-[#bac9cc] mb-1">DURUM</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse"></div>
            <span className="text-xs font-bold text-[#c3f5ff]">AKTİF SİSTEM</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

interface MobileNavProps {
  activeCategory: UnitCategory;
  onCategoryChange: (category: UnitCategory) => void;
}

export function MobileNav({ activeCategory, onCategoryChange }: MobileNavProps) {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1a1c1d] border-t border-zinc-800/30 flex justify-around py-3 z-50">
      {UNIT_CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`flex flex-col items-center gap-1 ${
            activeCategory === cat.id ? 'text-[#00E5FF]' : 'text-zinc-500'
          }`}
        >
          <span className="material-symbols-outlined">{cat.icon}</span>
          <span className="text-[10px] uppercase">{cat.name}</span>
        </button>
      ))}
    </nav>
  );
}
