import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import SectorsPage from "./pages/SectorsPage.tsx";
import QuotePage from "./pages/QuotePage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import TrainingPage from "./pages/TrainingPage.tsx";
import ServicingPage from "./pages/ServicingPage.tsx";
import WhyAEDPage from "./pages/WhyAEDPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sectors" element={<SectorsPage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/servicing" element={<ServicingPage />} />
          <Route path="/why-aed" element={<WhyAEDPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
