import SEO from "@/components/SEO";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HeroSection from "@/components/HeroSection";
import TrustBar from "@/components/TrustBar";
import SectorCards from "@/components/SectorCards";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTABanner from "@/components/CTABanner";
import { subscriptionPricing, formatSubscriptionNet } from "@/lib/subscriptionPricing";

const Index = () => (
  <div className="min-h-screen flex flex-col">
    <SEO
      title={`Defibrillators from ${formatSubscriptionNet(subscriptionPricing.indoor.monthlyGrossCents)}/Month excl. VAT | Smart Defibs Ireland`}
      description={`Get a defibrillator from ${formatSubscriptionNet(subscriptionPricing.indoor.monthlyGrossCents)}/month excluding 23% VAT (€39 including VAT), with cabinet, pads and remote monitoring included. Smart Defibs Ireland.`}
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
