import { useState } from 'react';
import type { Unit } from '@/hooks/useConverter';

interface UnitSelectorProps {
  label: string;
  selectedUnit: Unit;
  units: Unit[];
  onUnitChange: (unitId: string) => void;
  isTarget?: boolean;
}

export function UnitSelector({
  label,
  selectedUnit,
  units,
  onUnitChange,
  isTarget = false,
}: UnitSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group">
      <label className="text-[10px] text-zinc-500 uppercase mb-2 block">{label}</label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-[#333536] p-3 flex justify-between items-center cursor-pointer hover:bg-zinc-700 transition-colors ${
          isTarget ? 'border-l-2 border-[#00E5FF]' : ''
        }`}
      >
        <span className={`font-medium ${isTarget ? 'text-[#c3f5ff]' : ''}`}>
          {selectedUnit.name} ({selectedUnit.symbol})
        </span>
        <span className={`material-symbols-outlined text-sm ${isTarget ? 'text-[#c3f5ff]' : ''}`}>
          expand_more
        </span>
      </div>
      
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-[#333536] border border-[#3b494c] shadow-lg max-h-48 overflow-y-auto">
          {units.map((unit) => (
            <button
              key={unit.id}
              onClick={() => {
                onUnitChange(unit.id);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 text-left hover:bg-[#282a2b] transition-colors ${
                selectedUnit.id === unit.id ? 'text-[#00E5FF] bg-[#282a2b]' : 'text-[#e2e2e3]'
              }`}
            >
              {unit.name} ({unit.symbol})
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface UnitSelectorDropdownProps {
  label: string;
  selectedUnit: Unit;
  units: Unit[];
  onUnitChange: (unitId: string) => void;
  isTarget?: boolean;
}

export function UnitSelectorNative({
  label,
  selectedUnit,
  units,
  onUnitChange,
  isTarget = false,
}: UnitSelectorDropdownProps) {
  return (
    <div className="group relative">
      <label className="text-[10px] text-zinc-500 uppercase mb-2 block">{label}</label>
      <select
        value={selectedUnit.id}
        onChange={(e) => onUnitChange(e.target.value)}
        className={`w-full bg-[#333536] p-3 flex justify-between items-center cursor-pointer hover:bg-zinc-700 transition-colors appearance-none border-none text-[#e2e2e3] font-medium ${
          isTarget ? 'border-l-2 border-[#00E5FF] text-[#c3f5ff]' : ''
        }`}
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%239ca3af'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 8px center',
          backgroundSize: '20px'
        }}
      >
        {units.map((unit) => (
          <option key={unit.id} value={unit.id} className="bg-[#333536] text-[#e2e2e3]">
            {unit.name} ({unit.symbol})
          </option>
        ))}
      </select>
    </div>
  );
}
