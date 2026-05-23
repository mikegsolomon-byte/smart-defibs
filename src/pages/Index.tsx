import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import SectorCards from "@/components/SectorCards";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTABanner from "@/components/CTABanner";
import AboutPartnership from "@/components/AboutPartnership";

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <SiteHeader />
    <main className="flex-1">
      <HeroSection />
      <TrustBar />
      <SectorCards />
      <AboutPartnership />
      <StatsSection />
      <TestimonialsSection />
      <CTABanner />
    </main>
    <SiteFooter />
  </div>
);

export default Index;
