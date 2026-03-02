import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { PageDirectionContext } from "@/hooks/usePageDirection";
import { ORDERED_ROUTES } from "@/data/routes";

/** Scrolls to top whenever the route changes */
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

/** Full-screen spinner shown while lazy chunks load */
const PageLoader = () => (
  <div className="h-screen w-screen bg-[#f8f9fa] flex items-center justify-center">
    <div className="animate-spin rounded-full h-10 w-10 border-2 border-[#e8eaed] border-t-[#1a73e8]" />
  </div>
);

const CensusExplorer = lazy(() => import("./pages/CensusExplorer"));
const About = lazy(() => import("./pages/About"));
const Methodology = lazy(() => import("./pages/Methodology"));
const Findings = lazy(() => import("./pages/Findings"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const getRouteIndex = (path: string) => {
  const idx = ORDERED_ROUTES.findIndex((r) => r.path === path);
  return idx === -1 ? 0 : idx;
};

/**
 * AppRoutes never unmounts between navigations, so its refs are stable.
 * Direction is computed here and shared via context so PageTransition
 * (which remounts on every route change) always reads the correct value.
 */
const AppRoutes = () => {
  const location = useLocation();
  const prevPathRef = useRef<string>(location.pathname);
  const directionRef = useRef<number>(1);

  if (prevPathRef.current !== location.pathname) {
    const prevIdx = getRouteIndex(prevPathRef.current);
    const nextIdx = getRouteIndex(location.pathname);
    directionRef.current = nextIdx >= prevIdx ? 1 : -1;
    prevPathRef.current = location.pathname;
  }

  return (
    <PageDirectionContext.Provider value={directionRef.current}>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><CensusExplorer /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/methodology" element={<PageTransition><Methodology /></PageTransition>} />
            <Route path="/findings" element={<PageTransition><Findings /></PageTransition>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Suspense>
    </PageDirectionContext.Provider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
