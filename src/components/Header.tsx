import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  // Dark mode — single source of truth for all non-map pages; dispatches a
  // custom event so ChoroplethMapContainer can sync its tile layer.
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('theme') === 'dark';
  });

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    window.dispatchEvent(new CustomEvent('themechange', { detail: { dark: next } }));
  };

  // Close mobile menu when clicking outside the header
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const links = [
    { path: '/', label: 'Explorer' },
    { path: '/about', label: 'About' },
    { path: '/methodology', label: 'Methodology' },
    { path: '/findings', label: 'Findings' },
  ];

  return (
    <div ref={headerRef} className="relative z-40 mx-3 md:mx-5 mt-4 mb-2">
      {/* Main pill bar */}
      <div className={cn(
        "bg-card/90 backdrop-blur-xl px-4 md:px-6 py-3 flex items-center gap-2 transition-all duration-200",
        menuOpen ? "rounded-t-3xl rounded-b-none border-b-transparent shadow-none" : "rounded-full shadow-float"
      )}>
        <button
          onClick={handleLogoClick}
          className={cn(
            'text-sm md:text-base font-semibold text-foreground tracking-tight whitespace-nowrap bg-transparent border-none p-0 mr-2',
            location.pathname !== '/' && 'cursor-pointer hover:text-primary transition-colors duration-200'
          )}
          aria-label="Go to Explorer"
        >
          Mapping the Diaspora
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Desktop nav – right-aligned */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                location.pathname === link.path
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Dark mode toggle — visible on all pages */}
        <button
          onClick={toggleDark}
          className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-full hover:bg-muted transition-colors gap-1.5"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={cn('block w-5 h-0.5 bg-muted-foreground transition-all duration-200 origin-center', menuOpen && 'rotate-45 translate-y-2')} />
          <span className={cn('block w-5 h-0.5 bg-muted-foreground transition-all duration-200', menuOpen && 'opacity-0')} />
          <span className={cn('block w-5 h-0.5 bg-muted-foreground transition-all duration-200 origin-center', menuOpen && '-rotate-45 -translate-y-2')} />
        </button>
      </div>

      {/* Mobile dropdown – animated */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-card/95 backdrop-blur-xl rounded-b-3xl shadow-float overflow-hidden border-t border-border/10 origin-top"
          >
            {links.map(link => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'block px-5 py-3.5 text-sm font-medium transition-colors',
                  location.pathname === link.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};