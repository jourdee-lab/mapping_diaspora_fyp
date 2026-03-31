import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[], offset: number = 100) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

  useEffect(() => {
    const handleScroll = () => {
      // Find the first section that is above the middle of the viewport
      const scrollPosition = window.scrollY + offset;
      
      let currentSection = sectionIds[0];
      
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { top } = element.getBoundingClientRect();
          // absolute top position relative to document
          const absoluteTop = top + window.scrollY;
          
          if (scrollPosition >= absoluteTop - 50) {
            currentSection = sectionId;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset]);

  return activeSection;
}
