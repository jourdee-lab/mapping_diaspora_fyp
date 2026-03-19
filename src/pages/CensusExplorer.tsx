import { useState } from 'react';
import { Header } from '@/components/Header';
import { ChoroplethMapContainer } from '@/components/ChoroplethMapContainer';
import { getIndicatorsByYear, getDefaultIndicator } from '@/data/indicators';
import { IndicatorMetadata } from '@/types/data';

export default function CensusExplorer() {
  const [selectedYear, setSelectedYear] = useState<1981 | 1991 | 2001>(1981);
  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorMetadata>(
    getDefaultIndicator(1981)
  );

  const handleYearChange = (year: 1981 | 1991 | 2001) => {
    setSelectedYear(year);
    const defaultIndicator = getDefaultIndicator(year);
    setSelectedIndicator(defaultIndicator);
  };

  const availableIndicators = getIndicatorsByYear(selectedYear);

  const currentIndicator = selectedIndicator.year === selectedYear 
    ? selectedIndicator 
    : getDefaultIndicator(selectedYear);

  return (
    <div className="h-screen w-screen relative">
      {/* Full-screen Map - behind everything */}
      <div className="fixed inset-0 z-0">
        <ChoroplethMapContainer
          year={selectedYear}
          indicator={currentIndicator}
          onIndicatorChange={setSelectedIndicator}
          availableIndicators={availableIndicators}
        />
      </div>

      {/* Header - fixed on top */}
      <div className="fixed top-0 left-0 right-0 z-40">
        <Header />
      </div>

      {/* Floating Left Panel – desktop only */}
      <div className="hidden md:block absolute top-24 left-5 z-20 w-80" onWheel={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
        <div className="bg-card rounded-3xl shadow-float overflow-hidden">
          {/* Panel Header */}
          <div className="px-5 pt-5 pb-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Indicator</p>
            <h2 className="text-lg font-semibold text-foreground leading-snug">
              {currentIndicator.label}
            </h2>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
              {currentIndicator.description}
            </p>
          </div>

          {/* Divider */}
          <div className="mx-5 border-t border-border" />

          {/* Stats Row */}
          <div className="px-5 py-4 flex items-center gap-6">
            <div>
              <p className="text-xs text-muted-foreground">Years</p>
              <p className="text-base font-semibold text-foreground">3</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Indicators</p>
              <p className="text-base font-semibold text-foreground">{availableIndicators.length}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Level</p>
              <p className="text-base font-semibold text-foreground">{selectedYear === 2001 ? 'OAs' : 'EDs'}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-5 border-t border-border" />

          {/* Chips */}
          <div className="px-5 py-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {currentIndicator.category}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              {currentIndicator.unit}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              Manchester
            </span>
          </div>
        </div>
      </div>

      {/* Floating Controls – Unified Top-Centre Group for Mobile, split out for Desktop */}
      <div className="fixed top-[5.5rem] md:top-24 left-3 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-none md:px-5 pointer-events-none z-20 flex flex-col md:flex-row md:justify-center items-center gap-3">
        {/* Year Toggle */}
        <div className="pointer-events-auto relative inline-flex items-center bg-card/90 backdrop-blur-xl rounded-full p-1 shadow-float overflow-hidden" onWheel={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()}>
          <div
            className="absolute top-1 left-1 h-[calc(100%-8px)] w-[calc(33.333%-2.667px)] bg-[#1a73e8] rounded-full transition-transform duration-300 ease-out"
            style={{
              transform:
                selectedYear === 1981
                  ? 'translateX(0)'
                  : selectedYear === 1991
                  ? 'translateX(100%)'
                  : 'translateX(200%)'
            }}
          />
          <button
            onClick={() => handleYearChange(1981)}
            className={`relative z-10 px-3 sm:px-4 md:px-8 py-2 md:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 ${
              selectedYear === 1981
                ? 'text-white'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            1981
          </button>
          <button
            onClick={() => handleYearChange(1991)}
            className={`relative z-10 px-3 sm:px-4 md:px-8 py-2 md:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 ${
              selectedYear === 1991
                ? 'text-white'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            1991
          </button>
          <button
            onClick={() => handleYearChange(2001)}
            className={`relative z-10 px-3 sm:px-4 md:px-8 py-2 md:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors duration-300 ${
              selectedYear === 2001
                ? 'text-white'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            2001
          </button>
        </div>
      </div>
    </div>
  );
}
