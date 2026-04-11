import { UnitSelectorNative } from './UnitSelector';
import type { Unit } from '@/hooks/useConverter';

interface ControlPanelProps {
  fromUnit: Unit;
  toUnit: Unit;
  units: Unit[];
  onFromUnitChange: (unitId: string) => void;
  onToUnitChange: (unitId: string) => void;
  onSwapUnits: () => void;
}

export function ControlPanel({
  fromUnit,
  toUnit,
  units,
  onFromUnitChange,
  onToUnitChange,
  onSwapUnits,
}: ControlPanelProps) {
  return (
    <div className="bg-[#282a2b] p-6 flex flex-col gap-6">
      <h3 className="text-xs font-bold uppercase tracking-widest text-[#bac9cc] border-b border-[#3b494c]/30 pb-3">
        Birim Seçimi
      </h3>
      <div className="space-y-4">
        <UnitSelectorNative
          label="Kaynak"
          selectedUnit={fromUnit}
          units={units}
          onUnitChange={onFromUnitChange}
        />
        
        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={onSwapUnits}
            className="bg-[#00E5FF] text-[#00363d] w-10 h-10 flex items-center justify-center hover:rotate-180 transition-transform duration-500 shadow-lg shadow-black/50"
            aria-label="Birimleri Değiştir"
          >
            <span className="material-symbols-outlined">swap_vert</span>
          </button>
        </div>
        
        <UnitSelectorNative
          label="Hedef"
          selectedUnit={toUnit}
          units={units}
          onUnitChange={onToUnitChange}
          isTarget
        />
      </div>
    </div>
  );
}
