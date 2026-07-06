import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";

import Index from "./pages/Index.tsx";
import SectorsPage from "./pages/SectorsPage.tsx";
import QuotePage from "./pages/QuotePage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import ProductDetailPage from "./pages/ProductDetailPage.tsx";
import TrainingPage from "./pages/TrainingPage.tsx";
import ServicingPage from "./pages/ServicingPage.tsx";
import CheckoutReturn from "./pages/CheckoutReturn.tsx";
import AdminLogin from "./pages/AdminLogin.tsx";
import AdminOrders from "./pages/AdminOrders.tsx";

import AboutPage from "./pages/AboutPage.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import PrivacyPage from "./pages/PrivacyPage.tsx";
import UnsubscribePage from "./pages/UnsubscribePage.tsx";
import NotFound from "./pages/NotFound.tsx";
import MobileCtaBar from "@/components/MobileCtaBar";

import { AuthProvider } from "@/hooks/useAuth";
import { RequireAdmin } from "@/components/RequireAdmin";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";


const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);
  return (
    <div className="pb-20 lg:pb-0">
      <AnimatePresence mode="wait">


      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/sectors" element={<PageTransition><SectorsPage /></PageTransition>} />
        <Route path="/quote" element={<PageTransition><QuotePage /></PageTransition>} />
        <Route path="/products" element={<PageTransition><ProductsPage /></PageTransition>} />
        <Route path="/product/:handle" element={<PageTransition><ProductDetailPage /></PageTransition>} />
        <Route path="/training" element={<PageTransition><TrainingPage /></PageTransition>} />
        <Route path="/servicing" element={<PageTransition><ServicingPage /></PageTransition>} />
        <Route path="/checkout/return" element={<PageTransition><CheckoutReturn /></PageTransition>} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/orders" element={<RequireAdmin><AdminOrders /></RequireAdmin>} />

        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/pricing" element={<PageTransition><PricingPage /></PageTransition>} />
        <Route path="/privacy" element={<PageTransition><PrivacyPage /></PageTransition>} />
        <Route path="/unsubscribe" element={<PageTransition><UnsubscribePage /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
      </AnimatePresence>
      <MobileCtaBar />
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <AuthProvider>
            <GoogleAnalytics />
            <AnimatedRoutes />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
