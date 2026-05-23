import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import AmoulImporterChip from "@/components/AmoulImporterChip";
import AboutPartnership from "@/components/AboutPartnership";
import CTABanner from "@/components/CTABanner";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-secondary section-padding-hero">
          <div className="container mx-auto">
            <AmoulImporterChip />
            <h1 className="text-2xl sm:text-3xl md:text-5xl text-secondary-foreground mb-3 sm:mb-4">
              About Smart Defibs LTD
            </h1>
            <p className="text-base sm:text-lg text-secondary-foreground/70 max-w-2xl">
              A dedicated Irish company and the exclusive Irish partner of Amoul® — protecting
              communities across all 32 counties.
            </p>
          </div>
        </section>

        <AboutPartnership />
        <CTABanner />
      </main>
      <SiteFooter />
    </div>
  );
}
