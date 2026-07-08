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
      title="Defibrillators from €39/Month | Smart Defibs Ireland"
      description="Get a defibrillator for your premises from €39/month — cabinet, pads and remote monitoring included, with no large upfront cost. Smart Defibs Ireland."
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
