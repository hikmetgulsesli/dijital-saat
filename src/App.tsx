import { useState, useEffect, useCallback } from 'react'

// Types
interface HistoryItem {
  id: string
  value: number
  action: 'increment' | 'decrement' | 'reset'
  amount?: number
  timestamp: number
}

// Storage keys
const STORAGE_KEY = 'sayac-value'
const HISTORY_KEY = 'sayac-history'
const THEME_KEY = 'sayac-theme'

function App() {
  const [count, setCount] = useState<number>(0)
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isDark, setIsDark] = useState<boolean>(true)
  const [showHistory, setShowHistory] = useState<boolean>(false)
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedCount = localStorage.getItem(STORAGE_KEY)
    const savedHistory = localStorage.getItem(HISTORY_KEY)
    const savedTheme = localStorage.getItem(THEME_KEY)
    
    if (savedCount) {
      setCount(parseInt(savedCount, 10) || 0)
    }
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory)
        setHistory(parsed.slice(0, 5))
      } catch {
        setHistory([])
      }
    }
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    }
  }, [])

  // Save to localStorage when count changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, count.toString())
  }, [count])

  // Save history when it changes
  useEffect(() => {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  }, [history])

  // Save theme when it changes
  useEffect(() => {
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  const addToHistory = useCallback((action: HistoryItem['action'], amount?: number) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      value: count + (amount || 0),
      action,
      amount,
      timestamp: Date.now()
    }
    setHistory(prev => [newItem, ...prev].slice(0, 5))
  }, [count])

  const increment = useCallback(() => {
    setCount(c => c + 1)
    addToHistory('increment', 1)
  }, [addToHistory])

  const decrement = useCallback(() => {
    setCount(c => c - 1)
    addToHistory('decrement', -1)
  }, [addToHistory])

  const addFive = useCallback(() => {
    setCount(c => c + 5)
    addToHistory('increment', 5)
  }, [addToHistory])

  const addTen = useCallback(() => {
    setCount(c => c + 10)
    addToHistory('increment', 10)
  }, [addToHistory])

  const reset = useCallback(() => {
    setCount(0)
    addToHistory('reset')
    setShowResetConfirm(false)
  }, [addToHistory])

  const clearHistory = useCallback(() => {
    setHistory([])
    localStorage.removeItem(HISTORY_KEY)
  }, [])

  const toggleTheme = useCallback(() => {
    setIsDark(d => !d)
  }, [])

  const formatNumber = (num: number): string => {
    return num.toLocaleString('tr-TR')
  }

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body overflow-hidden flex flex-col md:flex-row relative">
      {/* Mobile TopAppBar */}
      <header className="bg-surface-container-high flex justify-between items-center px-6 py-4 w-full z-50 md:hidden absolute top-0">
        <div className="text-2xl font-bold text-primary tracking-tighter font-headline">Sayaç</div>
        <div className="flex gap-4 items-center">
          <button
            onClick={toggleTheme}
            className="material-symbols-outlined hover:bg-surface-container-highest transition-colors cursor-pointer p-2 rounded-full active:scale-95 duration-150"
            aria-label={isDark ? 'Açık temaya geç' : 'Koyu temaya geç'}
          >
            {isDark ? 'light_mode' : 'dark_mode'}
          </button>
          <button
            onClick={() => setShowHistory(true)}
            className="material-symbols-outlined hover:bg-surface-container-highest transition-colors cursor-pointer p-2 rounded-full active:scale-95 duration-150"
            aria-label="Geçmişi göster"
          >
            history
          </button>
        </div>
      </header>

      {/* Desktop SideNavBar */}
      <nav className="hidden md:flex bg-surface-container-high/80 backdrop-blur-xl rounded-l-[3rem] right-0 h-full w-80 fixed shadow-[0_0_64px_rgba(226,224,252,0.06)] flex-col p-8 z-40">
        <div className="mb-12 text-primary font-bold text-3xl tracking-tighter font-headline">Sayaç</div>
        <div className="flex flex-col gap-6 flex-grow mt-8">
          <a
            href="#"
            className="flex items-center gap-4 bg-primary text-on-primary rounded-full px-4 py-2 font-bold hover:bg-primary-container hover:text-on-primary-container active:scale-95 duration-150"
          >
            <span className="material-symbols-outlined">home</span>
            Ana Sayfa
          </a>
          <button
            onClick={() => setShowHistory(true)}
            className="flex items-center gap-4 text-on-surface-variant hover:text-on-surface px-4 py-2 hover:bg-surface-container-highest rounded-full transition-colors active:scale-95 duration-150 text-left"
          >
            <span className="material-symbols-outlined">history</span>
            Geçmiş
          </button>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-4 text-on-surface-variant hover:text-on-surface px-4 py-2 hover:bg-surface-container-highest rounded-full transition-colors active:scale-95 duration-150 text-left"
          >
            <span className="material-symbols-outlined">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
            {isDark ? 'Açık Tema' : 'Koyu Tema'}
          </button>
        </div>
        <div className="mt-auto bg-surface-container-high rounded-3xl p-6 relative overflow-hidden group hover:bg-surface-container-highest transition-colors">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary-container">history</span>
            </div>
            <div>
              <div className="font-headline font-bold text-on-surface text-base">Geçmiş</div>
              <div className="text-on-surface-variant text-xs">{history.length} işlem</div>
            </div>
          </div>
          <button
            onClick={clearHistory}
            disabled={history.length === 0}
            className="w-full text-center py-3 bg-surface-container rounded-full text-primary font-headline text-sm hover:bg-primary-container hover:text-on-primary-container transition-colors mt-2 active:scale-95 spring-transition border border-outline-variant/15 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verileri Temizle
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center pt-20 md:pt-0 pb-24 md:pr-80 relative w-full px-6">
        {/* Ambient Decorative Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-container rounded-full mix-blend-screen filter blur-[120px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-surface-tint rounded-full mix-blend-screen filter blur-[150px] opacity-10 pointer-events-none"></div>

        {/* The Hero Counter */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-lg mb-16">
          {/* Quick Interaction Chips */}
          <div className="flex gap-4 mb-12">
            <button
              onClick={decrement}
              className="bg-surface-container-high text-on-surface-variant font-headline font-bold px-6 py-3 rounded-full hover:bg-surface-container-highest hover:text-primary active:scale-95 spring-transition shadow-[0_0_64px_rgba(226,224,252,0.06)]"
              aria-label="Bir azalt"
            >
              -1
            </button>
            <button
              onClick={addFive}
              className="bg-surface-container-high text-on-surface-variant font-headline font-bold px-6 py-3 rounded-full hover:bg-surface-container-highest hover:text-primary active:scale-95 spring-transition shadow-[0_0_64px_rgba(226,224,252,0.06)]"
              aria-label="Beş ekle"
            >
              +5
            </button>
            <button
              onClick={addTen}
              className="bg-surface-container-high text-on-surface-variant font-headline font-bold px-6 py-3 rounded-full hover:bg-surface-container-highest hover:text-primary active:scale-95 spring-transition shadow-[0_0_64px_rgba(226,224,252,0.06)]"
              aria-label="On ekle"
            >
              +10
            </button>
          </div>

          {/* Main Counter Value Container */}
          <div className="bg-surface-container-highest rounded-[4rem] p-16 w-full flex items-center justify-center shadow-[0_0_64px_rgba(226,224,252,0.06)] border border-outline-variant/15 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-surface-variant/20 to-transparent pointer-events-none"></div>
            <h1 className="font-headline font-bold text-7xl md:text-9xl tracking-tighter text-on-surface leading-none select-none spring-transition">
              {formatNumber(count)}
            </h1>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={increment}
            className="mt-12 bg-gradient-to-br from-primary to-primary-container text-on-primary-container font-headline font-bold text-2xl px-16 py-8 rounded-[3rem] w-full max-w-sm hover:brightness-110 active:scale-95 spring-transition shadow-[0_0_64px_rgba(252,83,109,0.2)] flex items-center justify-center gap-4 group"
            aria-label="Sayacı arttır"
          >
            <span className="material-symbols-outlined text-4xl group-hover:rotate-180 transition-transform duration-500 ease-in-out">add</span>
            Arttır
          </button>

          {/* Reset Button */}
          <button
            onClick={() => setShowResetConfirm(true)}
            className="mt-4 text-on-surface-variant hover:text-error text-sm font-medium transition-colors"
          >
            Sıfırla
          </button>
        </div>
      </main>

      {/* History Panel (Mobile & Desktop) */}
      {showHistory && (
        <>
          <div
            className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-50"
            onClick={() => setShowHistory(false)}
          />
          <aside className="fixed right-0 top-0 h-full w-full md:w-[400px] z-[60] bg-surface-container-high flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/20">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">history</span>
                <h2 className="text-lg font-bold text-on-surface font-headline">İşlem Geçmişi</h2>
              </div>
              <div className="flex items-center gap-2">
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className="px-3 py-1.5 text-xs font-bold text-error uppercase tracking-wider hover:bg-error/10 rounded transition-colors"
                  >
                    Temizle
                  </button>
                )}
                <button
                  onClick={() => setShowHistory(false)}
                  className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-surface-container-low flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-4xl text-outline-variant">history</span>
                  </div>
                  <h3 className="text-lg font-bold text-on-surface mb-2 font-headline">Henüz işlem yok</h3>
                  <p className="text-sm text-on-surface-variant">
                    Sayacı kullandıkça işlemler burada görünecek
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 bg-surface-container rounded-xl border border-outline-variant/10"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-mono text-sm text-on-surface font-bold">
                          {item.action === 'reset' ? 'Sıfırlandı' : 
                           item.action === 'increment' ? `+${item.amount}` : 
                           `${item.amount}`}
                        </span>
                        <span className="text-[10px] text-on-surface-variant">{formatTime(item.timestamp)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-on-surface-variant">
                          Değer: {formatNumber(item.value)}
                        </span>
                        <span className={`
                          text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded
                          ${item.action === 'increment' ? 'bg-tertiary-container text-on-tertiary-container' : 
                            item.action === 'decrement' ? 'bg-error-container text-on-error-container' :
                            'bg-surface-container-highest text-on-surface-variant'}
                        `}>
                          {item.action === 'increment' ? 'Arttırma' : 
                           item.action === 'decrement' ? 'Azaltma' : 'Sıfırlama'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <>
          <div
            className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-50"
            onClick={() => setShowResetConfirm(false)}
          />
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-surface-container-high rounded-3xl p-8 shadow-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-error-container">warning</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-on-surface font-headline">Sıfırlama Onayı</h3>
                  <p className="text-sm text-on-surface-variant">Bu işlem geri alınamaz</p>
                </div>
              </div>
              <p className="text-on-surface mb-8">
                Sayacı sıfırlamak istediğinize emin misiniz? Mevcut değer ({formatNumber(count)}) kaybolacak ve geçmişe eklenecek.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-3 rounded-full bg-surface-container text-on-surface font-bold hover:bg-surface-container-highest transition-colors active:scale-95"
                >
                  İptal
                </button>
                <button
                  onClick={reset}
                  className="flex-1 py-3 rounded-full bg-error text-on-error font-bold hover:bg-error-container hover:text-on-error-container transition-colors active:scale-95"
                >
                  Sıfırla
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
