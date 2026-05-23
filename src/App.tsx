import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index.tsx";
import SectorsPage from "./pages/SectorsPage.tsx";
import QuotePage from "./pages/QuotePage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import ProductDetailPage from "./pages/ProductDetailPage.tsx";
import TrainingPage from "./pages/TrainingPage.tsx";
import ServicingPage from "./pages/ServicingPage.tsx";
import WhyAEDPage from "./pages/WhyAEDPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  useCartSync();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/sectors" element={<PageTransition><SectorsPage /></PageTransition>} />
        <Route path="/quote" element={<PageTransition><QuotePage /></PageTransition>} />
        <Route path="/products" element={<PageTransition><ProductsPage /></PageTransition>} />
        <Route path="/product/:handle" element={<PageTransition><ProductDetailPage /></PageTransition>} />
        <Route path="/training" element={<PageTransition><TrainingPage /></PageTransition>} />
        <Route path="/servicing" element={<PageTransition><ServicingPage /></PageTransition>} />
        <Route path="/why-aed" element={<PageTransition><WhyAEDPage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
