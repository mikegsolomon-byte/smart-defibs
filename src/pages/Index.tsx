import SEO from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import SectorCards from "@/components/SectorCards";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTABanner from "@/components/CTABanner";

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <SEO
      title="Smart Defibs Ltd — AEDs, Training & Servicing in Ireland"
      description="Ireland's exclusive Amoul AED partner. CE-marked defibrillators, PHECC-aligned training, and nationwide maintenance for schools, workplaces and community groups."
      path="/"
    />
    <SiteHeader />
    <main className="flex-1">
      <HeroSection />
      <TrustBar />
      <SectorCards />
      <StatsSection />
      <TestimonialsSection />
      <CTABanner />
    </main>
    <SiteFooter />
  </div>
);

export default Index;
