import { useState } from 'react';
import type { Unit } from '@/hooks/useConverter';

interface ConversionPanelProps {
  categoryName: string;
  fromUnit: Unit;
  toUnit: Unit;
  inputValue: string;
  formattedResult: string;
  precision: number;
  onInputChange: (value: string) => void;
  onCopyResult: () => Promise<boolean>;
}

export function ConversionPanel({
  categoryName,
  fromUnit,
  toUnit,
  inputValue,
  formattedResult,
  precision,
  onInputChange,
  onCopyResult,
}: ConversionPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await onCopyResult();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="lg:col-span-8 bg-[#1a1c1d] p-8 shadow-[0_0_24px_rgba(0,229,255,0.1)] flex flex-col justify-between min-h-[400px]">
      <div>
        <header className="flex justify-between items-start mb-12">
          <div>
            <span className="text-[#00E5FF] text-[10px] tracking-[0.2em] font-bold uppercase block mb-2">
              Giriş Parametresi
            </span>
            <h1 className="text-4xl font-bold tracking-tighter text-[#e2e2e3] uppercase">
              {categoryName} Analizi
            </h1>
          </div>
          <div className="text-right">
            <span className="text-zinc-500 text-[10px] uppercase">Algoritma V2.4</span>
            <p className="text-xs font-mono text-[#849396]">HASH: 8A2F9</p>
          </div>
        </header>

        <div className="space-y-12">
          {/* Input Probe Section */}
          <div className="relative">
            <label className="text-[10px] text-[#bac9cc] uppercase tracking-widest absolute -top-4 left-0">
              Değer Girin
            </label>
            <div className="flex items-end gap-4 border-b-2 border-[#3b494c] focus-within:border-[#00E5FF] transition-colors pb-2">
              <input
                type="text"
                inputMode="decimal"
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-6xl font-bold text-[#e2e2e3] w-full p-0 placeholder-zinc-800 outline-none"
                placeholder="0"
                spellCheck={false}
              />
              <span className="text-2xl font-light text-[#c3f5ff] mb-2">{fromUnit.name}</span>
            </div>
          </div>

          {/* Result Readout */}
          <div className="bg-[#282a2b] p-6 border-l-4 border-[#00E5FF] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2">
              <span className="material-symbols-outlined text-[#00E5FF]/20 text-6xl rotate-12">
                analytics
              </span>
            </div>
            <label className="text-[10px] text-[#c3f5ff] uppercase tracking-widest block mb-1">
              Hesaplanan Sonuç
            </label>
            <div className="flex items-baseline gap-3">
              <span className="text-7xl font-bold text-[#00E5FF] tracking-tighter">
                {formattedResult}
              </span>
              <span className="text-2xl font-medium text-[#c3f5ff]">{toUnit.name}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Footer */}
      <footer className="mt-12 pt-6 border-t border-[#3b494c]/20 flex flex-wrap justify-between items-center gap-4">
        <div className="flex gap-8">
          <div>
            <span className="block text-[10px] text-zinc-500 uppercase">Hassasiyet</span>
            <span className="text-sm font-mono">{precision} Ondalık Basamak</span>
          </div>
          <div>
            <span className="block text-[10px] text-zinc-500 uppercase">Gecikme</span>
            <span className="text-sm font-mono text-[#00E5FF]">0.002ms</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="bg-[#00E5FF] text-[#00363d] px-6 py-2 font-bold text-xs uppercase hover:bg-[#00daf3] transition-colors active:bg-[#001f24]"
          >
            {copied ? 'Kopyalandı!' : 'Veriyi Kopyala'}
          </button>
        </div>
      </footer>
    </section>
  );
}
