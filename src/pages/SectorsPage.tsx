import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CTABanner from "@/components/CTABanner";
import { motion } from "framer-motion";
import { School, Users, Stethoscope, Shield, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sectorData = {
  schools: {
    icon: School,
    title: "AEDs for Schools & Crèches",
    subtitle: "Protect your students with grant-eligible AED programmes",
    color: "text-sector-schools",
    bgColor: "bg-sector-schools/10",
    compliance: "Dept of Education / AED for Schools Programme",
    package: "AED device + wall cabinet + signage + staff training session",
    pricing: "From €1,295 incl. VAT — grant offset available",
    steps: ["Get a free quote", "We install & train your staff", "We monitor & maintain it"],
    caseStudy: {
      quote: "The AED for Schools programme made it affordable. Smart Defibs LTD handled everything from the grant application to installation.",
      name: "Sarah Walsh",
      role: "Principal, St. Mary's NS",
    },
    faqs: [
      { q: "Is there grant funding available?", a: "Yes — the AED for Schools programme provides grants to eligible schools. We handle the application process for you." },
      { q: "Do staff need certification?", a: "We provide PHECC-aligned CPR/AED training on-site for up to 12 staff members." },
      { q: "What about maintenance?", a: "Our basic annual service plan ensures your AED is always rescue-ready." },
    ],
  },
  nursing: {
    icon: Stethoscope,
    title: "AEDs for Nursing Homes",
    subtitle: "HIQA-compliant AED solutions with full training & maintenance",
    color: "text-sector-nursing",
    bgColor: "bg-sector-nursing/10",
    compliance: "HIQA Standard 2.7 — Emergency Planning",
    package: "AED + accessories + full service plan + staff training + compliance docs",
    pricing: "From €1,495 incl. VAT — maintenance contract available",
    steps: ["Request a sector quote", "We assess & install", "Ongoing training & monitoring"],
    caseStudy: {
      quote: "The HIQA compliance documentation alone was worth it. Staff training was thorough and professional.",
      name: "Niall Murphy",
      role: "Manager, Elm Lodge Nursing Home",
    },
    faqs: [
      { q: "Does this meet HIQA requirements?", a: "Yes — our packages include all compliance documentation needed for HIQA inspections." },
      { q: "Can you train rotating staff?", a: "Our online refresher module is perfect for high-turnover settings with certificate downloads." },
      { q: "What service plans do you offer?", a: "Full service plans include annual inspection, pads & battery replacement, and priority support." },
    ],
  },
  workplace: {
    icon: Shield,
    title: "AEDs for Workplaces",
    subtitle: "H&S compliance for single and multi-site organisations",
    color: "text-sector-workplace",
    bgColor: "bg-sector-workplace/10",
    compliance: "HSA / Safety, Health & Welfare at Work Act",
    package: "Certified AEDs + multi-site deployment + managed maintenance + compliance pack",
    pricing: "Multi-site pricing on application — volume discounts available",
    steps: ["Request multi-site proposal", "Site assessments & install", "Account-managed maintenance"],
    caseStudy: {
      quote: "We equipped all five sites in under a week. The compliance documentation pack is comprehensive.",
      name: "Sam Kelly",
      role: "H&S Manager, TechCorp Ireland",
    },
    faqs: [
      { q: "Can you handle multiple locations?", a: "Yes — our multi-site managed plan includes a dedicated account manager covering all your sites." },
      { q: "What compliance docs are included?", a: "CE/ISO compliance pack, inspection certificates, and HSA-aligned documentation." },
      { q: "Do you offer staff training?", a: "On-site CPR/AED awareness sessions for up to 12 staff plus online refresher access." },
    ],
  },
  community: {
    icon: Users,
    title: "AEDs for Community & CFR Groups",
    subtitle: "Equip your community first responders and save lives locally",
    color: "text-sector-community",
    bgColor: "bg-sector-community/10",
    compliance: "NAS / PHECC Community First Responder Framework",
    package: "Community AED + outdoor cabinet + responder bag + CFR training",
    pricing: "From €1,195 incl. VAT — group order discounts available",
    steps: ["Contact us for group pricing", "We deliver & install", "CFR training for your team"],
    caseStudy: {
      quote: "Our GAA club now has two AEDs and twelve trained responders. Smart Defibs LTD made it happen.",
      name: "Ciara Brennan",
      role: "CFR Coordinator, Ballycastle GAA",
    },
    faqs: [
      { q: "Do you offer group discounts?", a: "Yes — community groups and CFR schemes get preferential pricing on AED bundles." },
      { q: "What training is available?", a: "Full PHECC CFR certification courses, perfect for volunteer groups." },
      { q: "Indoor or outdoor cabinets?", a: "We supply both — outdoor heated cabinets are ideal for GAA clubs and community centres." },
    ],
  },
};

type SectorKey = keyof typeof sectorData;

export default function SectorsPage() {
  const [searchParams] = useSearchParams();
  const initialTab = (searchParams.get("tab") as SectorKey) || "schools";
  const [activeTab, setActiveTab] = useState<SectorKey>(initialTab);
  const data = sectorData[activeTab];
  const Icon = data.icon;

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Tab navigation */}
        <div className="bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex overflow-x-auto gap-1 py-2">
              {(Object.keys(sectorData) as SectorKey[]).map((key) => {
                const s = sectorData[key];
                const TabIcon = s.icon;
                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === key
                        ? "bg-primary text-primary-foreground"
                        : "text-secondary-foreground/70 hover:text-primary"
                    }`}
                  >
                    <TabIcon className="h-4 w-4" />
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-secondary section-padding pb-12">
          <div className="container mx-auto">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <div className={`inline-flex p-4 rounded-2xl ${data.bgColor} mb-6`}>
                <Icon className={`h-10 w-10 ${data.color}`} />
              </div>
              <h1 className="text-3xl md:text-5xl text-secondary-foreground mb-4">{data.title}</h1>
              <p className="text-lg text-secondary-foreground/70 mb-8 max-w-2xl">{data.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-teal-light">
                  <Link to="/quote">Get a Sector Quote</Link>
                </Button>
                <Button size="lg" className="bg-background text-secondary hover:bg-background/90 border-2 border-background btn-micro shadow-md">
                  Download Info Pack
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Compliance */}
        <section className="section-padding bg-background">
          <div className="container mx-auto max-w-4xl">
            <motion.div key={activeTab + "-content"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div>
                  <h2 className="text-2xl mb-4">Regulatory Context</h2>
                  <p className="text-muted-foreground bg-muted/50 p-4 rounded-lg border border-border">{data.compliance}</p>
                </div>
                <div>
                  <h2 className="text-2xl mb-4">Recommended Package</h2>
                  <p className="text-muted-foreground bg-muted/50 p-4 rounded-lg border border-border">{data.package}</p>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-16 text-center">
                <h3 className="text-lg font-heading font-semibold text-primary mb-1">Transparent Pricing</h3>
                <p className="text-foreground font-medium">{data.pricing}</p>
              </div>

              {/* Steps */}
              <div className="mb-16">
                <h2 className="text-2xl text-center mb-8">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {data.steps.map((step, i) => (
                    <div key={i} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-heading font-bold text-lg mb-4">
                        {i + 1}
                      </div>
                      <p className="font-medium text-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Case study */}
              <div className="bg-card border border-border rounded-xl p-8 mb-16">
                <h2 className="text-2xl mb-4">Case Study</h2>
                <blockquote className="text-foreground/80 italic text-lg mb-4">"{data.caseStudy.quote}"</blockquote>
                <p className="font-heading font-semibold">{data.caseStudy.name}</p>
                <p className="text-sm text-muted-foreground">{data.caseStudy.role}</p>
              </div>

              {/* FAQs */}
              <div className="mb-8">
                <h2 className="text-2xl mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {data.faqs.map((faq) => (
                    <details key={faq.q} className="group bg-card border border-border rounded-lg">
                      <summary className="cursor-pointer p-4 font-medium text-foreground flex justify-between items-center">
                        {faq.q}
                        <span className="text-primary group-open:rotate-45 transition-transform text-xl">+</span>
                      </summary>
                      <p className="px-4 pb-4 text-muted-foreground">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust signals */}
        <section className="bg-muted section-padding py-12">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-6">
              {["CE marked device", "PHECC certified training", "HSE/HIQA aligned", "Irish-based support team", "Compliance docs included"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTABanner />
      </main>
      <SiteFooter />
    </div>
  );
}
