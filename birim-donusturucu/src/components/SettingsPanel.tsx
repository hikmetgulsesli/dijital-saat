interface PrecisionSelectorProps {
  precision: number;
  onPrecisionChange: (precision: number) => void;
}

export function PrecisionSelector({ precision, onPrecisionChange }: PrecisionSelectorProps) {
  const precisions = [2, 4, 8, 12];

  return (
    <div>
      <label className="text-[10px] text-zinc-500 uppercase mb-3 block">Hassasiyet Kademesi</label>
      <div className="grid grid-cols-4 gap-1">
        {precisions.map((p) => (
          <button
            key={p}
            onClick={() => onPrecisionChange(p)}
            className={`py-2 text-xs font-mono transition-colors ${
              precision === p
                ? 'bg-[#11505a] text-[#c3f5ff]'
                : 'bg-[#333536] text-[#e2e2e3] hover:bg-[#3b494c]'
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`w-8 h-4 relative cursor-pointer transition-colors ${
          checked ? 'bg-[#00E5FF]/20' : 'bg-[#3b494c]'
        }`}
        role="switch"
        aria-checked={checked}
      >
        <div
          className={`absolute top-1 w-2 h-2 transition-all ${
            checked ? 'right-1 bg-[#00E5FF]' : 'left-1 bg-zinc-400'
          }`}
        />
      </button>
    </div>
  );
}

interface SettingsPanelProps {
  precision: number;
  onPrecisionChange: (precision: number) => void;
  autoCopy: boolean;
  onAutoCopyChange: (autoCopy: boolean) => void;
}

export function SettingsPanel({
  precision,
  onPrecisionChange,
  autoCopy,
  onAutoCopyChange,
}: SettingsPanelProps) {
  return (
    <div className="bg-[#1a1c1d] p-6">
      <h3 className="text-xs font-bold uppercase tracking-widest text-[#bac9cc] mb-4">Ayarlar</h3>
      <div className="space-y-6">
        <PrecisionSelector precision={precision} onPrecisionChange={onPrecisionChange} />
        <div className="bg-[#333536]/30 p-4 border border-[#3b494c]/10 space-y-3">
          <Toggle
            label="Bilimsel Gösterim"
            checked={false}
            onChange={() => {}}
          />
          <Toggle
            label="Otomatik Kopyala"
            checked={autoCopy}
            onChange={onAutoCopyChange}
          />
        </div>
      </div>
    </div>
  );
}
