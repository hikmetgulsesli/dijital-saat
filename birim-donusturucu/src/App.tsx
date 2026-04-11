import { useConverter } from './hooks/useConverter';
import { Header } from './components/Header';
import { CategoryNav, MobileNav } from './components/CategoryNav';
import { ConversionPanel } from './components/ConversionPanel';
import { ControlPanel } from './components/ControlPanel';
import { SettingsPanel } from './components/SettingsPanel';
import { Footer } from './components/Footer';
import './App.css';

function App() {
  const {
    category,
    categoryData,
    fromUnit,
    toUnit,
    inputValue,
    precision,
    autoCopy,
    formattedResult,
    setFromUnitId,
    setToUnitId,
    setInputValue,
    setPrecision,
    setAutoCopy,
    swapUnits,
    copyResult,
    handleCategoryChange,
  } = useConverter();

  return (
    <div className="bg-[#121415] text-[#e2e2e3] min-h-screen flex flex-col font-['Space_Grotesk']">
      {/* Google Fonts */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" 
        rel="stylesheet" 
      />
      <link 
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
        rel="stylesheet" 
      />
      
      {/* TopAppBar */}
      <Header />
      
      {/* SideNavBar */}
      <CategoryNav 
        activeCategory={category} 
        onCategoryChange={handleCategoryChange} 
      />
      
      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 pt-24 px-6 pb-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Hero Conversion Module */}
          <ConversionPanel
            categoryName={categoryData.name}
            fromUnit={fromUnit}
            toUnit={toUnit}
            inputValue={inputValue}
            formattedResult={formattedResult}
            precision={precision}
            onInputChange={setInputValue}
            onCopyResult={copyResult}
          />
          
          {/* Control Panel */}
          <section className="lg:col-span-4 space-y-6">
            <ControlPanel
              fromUnit={fromUnit}
              toUnit={toUnit}
              units={categoryData.units}
              onFromUnitChange={setFromUnitId}
              onToUnitChange={setToUnitId}
              onSwapUnits={swapUnits}
            />
            
            <SettingsPanel
              precision={precision}
              onPrecisionChange={setPrecision}
              autoCopy={autoCopy}
              onAutoCopyChange={setAutoCopy}
            />
          </section>
          
          {/* Footer Section */}
          <Footer />
        </div>
      </main>
      
      {/* Bottom Navigation (Mobile Only) */}
      <MobileNav 
        activeCategory={category} 
        onCategoryChange={handleCategoryChange} 
      />
    </div>
  );
}

export default App;
