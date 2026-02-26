import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const Header = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { path: '/', label: 'Explorer' },
    { path: '/about', label: 'About' },
    { path: '/methodology', label: 'Methodology' },
    { path: '/findings', label: 'Findings' },
  ];

  return (
    <div className="relative z-40 mx-3 md:mx-5 mt-4 mb-2">
      {/* Main pill bar */}
      <div className="bg-white/90 backdrop-blur-xl rounded-full shadow-float px-4 md:px-6 py-3 flex items-center justify-between">
        <h1 className="text-sm md:text-base font-semibold text-[#202124] tracking-tight whitespace-nowrap">
          Mapping the Diaspora
        </h1>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                location.pathname === link.path
                  ? 'bg-[#e8f0fe] text-[#1a73e8]'
                  : 'text-[#5f6368] hover:bg-[#f1f3f4] hover:text-[#202124]'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-full hover:bg-[#f1f3f4] transition-colors gap-1.5"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={cn('block w-5 h-0.5 bg-[#5f6368] transition-all duration-200 origin-center', menuOpen && 'rotate-45 translate-y-2')} />
          <span className={cn('block w-5 h-0.5 bg-[#5f6368] transition-all duration-200', menuOpen && 'opacity-0')} />
          <span className={cn('block w-5 h-0.5 bg-[#5f6368] transition-all duration-200 origin-center', menuOpen && '-rotate-45 -translate-y-2')} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-3xl shadow-float overflow-hidden">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={cn(
                'block px-5 py-3.5 text-sm font-medium transition-colors',
                location.pathname === link.path
                  ? 'bg-[#e8f0fe] text-[#1a73e8]'
                  : 'text-[#5f6368] hover:bg-[#f1f3f4] hover:text-[#202124]'
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};