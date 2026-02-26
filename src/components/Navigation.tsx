import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const Navigation = () => {
  const location = useLocation();
  
  const links = [
    { path: '/', label: 'Interactive Map' },
    { path: '/census-explorer', label: 'Census Explorer' },
    { path: '/about', label: 'About' },
    { path: '/methodology', label: 'Methodology' },
    { path: '/findings', label: 'Findings' },
  ];
  
  return (
    <nav className="border-b bg-card shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-8">
        <div className="flex items-center gap-8 h-14">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative py-4",
                location.pathname === link.path
                  ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                  : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
