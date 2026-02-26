import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

export const Header = () => {
  const location = useLocation();
  const links = [{
    path: '/',
    label: 'Census Explorer'
  }, {
    path: '/about',
    label: 'About'
  }, {
    path: '/methodology',
    label: 'Methodology'
  }, {
    path: '/findings',
    label: 'Findings'
  }];
  return <div className="relative z-40 mx-5 mt-4 mb-2">
      <div className="bg-white/90 backdrop-blur-xl rounded-full shadow-float px-6 py-3 flex items-center justify-between">
        <h1 className="text-base font-semibold text-[#202124] tracking-tight">
          Mapping the Diaspora
        </h1>
        <nav className="flex items-center gap-1">
          {links.map(link => <Link key={link.path} to={link.path} className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            location.pathname === link.path 
              ? "bg-[#e8f0fe] text-[#1a73e8]" 
              : "text-[#5f6368] hover:bg-[#f1f3f4] hover:text-[#202124]"
          )}>
              {link.label}
            </Link>)}
        </nav>
      </div>
    </div>;
};