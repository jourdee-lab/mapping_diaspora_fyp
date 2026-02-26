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

      {/* Header - floating on top */}
      <Header />

      {/* Floating Left Panel – desktop only */}
      <div className="hidden md:block absolute top-24 left-5 z-20 w-80">
        <div className="bg-white rounded-3xl shadow-float overflow-hidden">
          {/* Panel Header */}
          <div className="px-5 pt-5 pb-3">
            <p className="text-xs font-medium text-[#5f6368] uppercase tracking-wider mb-1">Indicator</p>
            <h2 className="text-lg font-semibold text-[#202124] leading-snug">
              {currentIndicator.label}
            </h2>
            <p className="text-sm text-[#5f6368] mt-1.5 leading-relaxed">
              {currentIndicator.description}
            </p>
          </div>

          {/* Divider */}
          <div className="mx-5 border-t border-[#e8eaed]" />

          {/* Stats Row */}
          <div className="px-5 py-4 flex items-center gap-6">
            <div>
              <p className="text-xs text-[#5f6368]">Years</p>
              <p className="text-base font-semibold text-[#202124]">3</p>
            </div>
            <div>
              <p className="text-xs text-[#5f6368]">Indicators</p>
              <p className="text-base font-semibold text-[#202124]">{availableIndicators.length}</p>
            </div>
            <div>
              <p className="text-xs text-[#5f6368]">Level</p>
              <p className="text-base font-semibold text-[#202124]">{selectedYear === 2001 ? 'OAs' : 'EDs'}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="mx-5 border-t border-[#e8eaed]" />

          {/* Chips */}
          <div className="px-5 py-4 flex flex-wrap gap-2">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#e8f0fe] text-[#1a73e8]">
              {currentIndicator.category}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#f1f3f4] text-[#5f6368]">
              {currentIndicator.unit}
            </span>
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-[#f1f3f4] text-[#5f6368]">
              Manchester
            </span>
          </div>
        </div>
      </div>

      {/* Floating Year Toggle – left on mobile, top-centre on desktop */}
      <div className="absolute top-24 left-2 md:left-1/2 md:-translate-x-1/2 z-20">
        <div className="relative inline-flex items-center bg-white rounded-full p-1 shadow-float">
          <div
            className="absolute h-[calc(100%-8px)] w-[calc(33.333%-2.667px)] bg-[#1a73e8] rounded-full transition-transform duration-300 ease-out"
            style={{
              transform:
                selectedYear === 1981
                  ? 'translateX(4px)'
                  : selectedYear === 1991
                  ? 'translateX(calc(100% + 4px))'
                  : 'translateX(calc(200% + 4px))'
            }}
          />
          <button
            onClick={() => handleYearChange(1981)}
            className={`relative z-10 px-5 md:px-8 py-2 md:py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
              selectedYear === 1981
                ? 'text-white'
                : 'text-[#5f6368] hover:text-[#202124]'
            }`}
          >
            1981
          </button>
          <button
            onClick={() => handleYearChange(1991)}
            className={`relative z-10 px-5 md:px-8 py-2 md:py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
              selectedYear === 1991
                ? 'text-white'
                : 'text-[#5f6368] hover:text-[#202124]'
            }`}
          >
            1991
          </button>
          <button
            onClick={() => handleYearChange(2001)}
            className={`relative z-10 px-5 md:px-8 py-2 md:py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
              selectedYear === 2001
                ? 'text-white'
                : 'text-[#5f6368] hover:text-[#202124]'
            }`}
          >
            2001
          </button>
        </div>
      </div>
    </div>
  );
}
