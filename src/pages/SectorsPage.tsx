import SEO from "@/components/SEO";
import { useState } from "react";
import AmoulImporterChip from "@/components/AmoulImporterChip";
import { useSearchParams } from "react-router-dom";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CTABanner from "@/components/CTABanner";
import { motion } from "framer-motion";
import {
  School,
  Users,
  Stethoscope,
  Shield,
  CheckCircle,
  HeartPulse,
  Clock,
  GraduationCap,
  Activity,
  Package as PackageIcon,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const sectorData = {
  schools: {
    icon: School,
    title: "AEDs for Schools & Crèches",
    subtitle: "Protect your students with grant-eligible AED programmes",
    color: "text-sector-schools",
    bgColor: "bg-sector-schools/10",
    compliance: "Funding routes: CLÁR, LEADER, HSE National Lottery Grants & FAI Heart Care",
    packageItems: [
      "AED device (semi-automatic, paediatric-capable)",
      "Lockable wall cabinet with alarm",
      "Signage & emergency action poster",
      "On-site PHECC-aligned staff training (up to 12)",
    ],
    packageHighlight: "Grant-eligible — we help schools identify and apply for funding",
    pricing: "From €1,295 incl. VAT — grant offset may be available",
    steps: ["Get a free quote", "We install & train your staff", "We monitor & maintain it"],
    whyNeeded: {
      intro:
        "Sudden cardiac arrest doesn't discriminate by age. Each year in Ireland, children, teachers and visitors collapse on school grounds — and survival depends on what happens in the next few minutes. An on-site AED, combined with trained staff, turns a tragedy into a survivable event.",
      points: [
        {
          icon: Clock,
          title: "Minutes matter",
          desc: "Survival drops by up to 10% for every minute without defibrillation. The national average response for life-threatening calls was 26 minutes in 2022 (NAS).",
        },
        {
          icon: HeartPulse,
          title: "1 in 300 teenagers",
          desc: "screened in Ireland had a previously undiagnosed cardiac condition (Dillon Quirke Foundation, 2024). AEDs are safe for use on children aged 1+ with paediatric pads.",
        },
        {
          icon: GraduationCap,
          title: "A duty of care",
          desc: "Schools and crèches are expected to have emergency response plans. An AED demonstrates active safeguarding.",
        },
        {
          icon: Activity,
          title: "Used by the whole community",
          desc: "School AEDs serve sports clubs, parents, staff and weekend events — multiplying their lifesaving impact.",
        },
      ],
    },
    caseStudy: {
      quote:
        "Smart Defibs LTD walked us through the funding options, handled installation and trained our staff — it was completely turn-key.",
      name: "Sarah Walsh",
      role: "Principal, St. Mary's NS",
    },
    faqs: [
      { q: "Is there grant funding available?", a: "There is no dedicated ROI Department of Education AED grant, but funding may be available via CLÁR, LEADER, HSE National Lottery Grants or the FAI Heart Care programme. We help schools identify and apply for the best fit." },
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
    compliance: "HIQA National Standards — emergency response expectations",
    packageItems: [
      "Clinical-grade AED with ECG display",
      "Accessory pack: spare pads, battery, rescue kit",
      "Full annual service & compliance plan",
      "On-site staff training + online refresher access",
      "HIQA-ready compliance documentation",
    ],
    packageHighlight: "Everything HIQA inspectors look for — in one bundle",
    pricing: "From €1,495 incl. VAT — maintenance contract available",
    steps: ["Request a sector quote", "We assess & install", "Ongoing training & monitoring"],
    whyNeeded: {
      intro:
        "Residents in nursing homes are among the highest-risk groups for cardiac events. HIQA inspectors expect rapid, competent emergency response — and that's only possible with an on-site AED and confident, trained staff.",
      points: [
        { icon: HeartPulse, title: "High-risk population", desc: "The median OHCA patient age in Ireland is 68 (OHCAR 2024) — older residents are the highest-risk group." },
        { icon: Clock, title: "Response before paramedics", desc: "Rural and suburban nursing homes often face response times well above the 19-minute HIQA rural target." },
        { icon: Shield, title: "HIQA emergency expectations", desc: "Inspectors expect documented, practised emergency response — an on-site AED with trained staff is the visible proof." },
        { icon: GraduationCap, title: "Confident rotating staff", desc: "Our refresher modules keep agency and night staff certified between visits." },
      ],
    },
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
    packageItems: [
      "CE-certified AEDs (semi or fully automatic)",
      "Multi-site rollout & installation coordination",
      "Managed maintenance with priority response",
      "HSA-aligned compliance documentation pack",
      "On-site CPR/AED awareness training",
    ],
    packageHighlight: "Volume discounts and a single account manager across sites",
    pricing: "Multi-site pricing on application — volume discounts available",
    steps: ["Request multi-site proposal", "Site assessments & install", "Account-managed maintenance"],
    whyNeeded: {
      intro:
        "Many cardiac arrests happen at work or in public — but only a minority of workplaces are equipped to respond. The Safety, Health & Welfare at Work Act 2005 puts a clear duty of care on employers, and a single saved life pays back the investment many times over.",
      points: [
        { icon: HeartPulse, title: "~2,900 OHCA per year", desc: "Out-of-hospital cardiac arrests attended in Ireland (OHCAR 2024) — many occur during working hours." },
        { icon: Clock, title: "3–5 minute window", desc: "In witnessed shockable cases with bystander CPR, defibrillation within 3–5 minutes has produced survival rates above 50%." },
        { icon: Shield, title: "Employer duty", desc: "The 2005 Act requires adequate first-aid and emergency arrangements; HSA guidance (Section 1.10) recommends AEDs wherever an occupational first-aider is in place." },
        { icon: Activity, title: "Visible safety culture", desc: "On-display AEDs reinforce a proactive H&S culture for staff and visitors." },
      ],
    },
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
    packageItems: [
      "Community-grade AED with rugged carry case",
      "Heated outdoor cabinet (24/7 public access)",
      "Responder bag with rescue essentials",
      "PHECC CFR-level training course",
    ],
    packageHighlight: "Group order discounts for clubs and CFR schemes",
    pricing: "From €1,195 incl. VAT — group order discounts available",
    steps: ["Contact us for group pricing", "We deliver & install", "CFR training for your team"],
    whyNeeded: {
      intro:
        "Community First Responders are often first on the scene, minutes ahead of an ambulance. A publicly accessible AED in your village, club or community centre is the single biggest intervention you can make to improve local cardiac arrest survival.",
      points: [
        { icon: Clock, title: "Beat the ambulance", desc: "The national average response for life-threatening calls was 26 minutes in 2022 (NAS) — rural areas typically exceed this." },
        { icon: HeartPulse, title: "Bystander CPR + AED", desc: "Doubles or triples survival vs CPR alone (NEJM PAD Trial 2004; Hallstrom et al., Circulation 2003)." },
        { icon: Users, title: "Whole-village asset", desc: "An outdoor cabinet AED is available 24/7 to anyone — runners, drivers, neighbours, visitors." },
        { icon: GraduationCap, title: "Trained CFR team", desc: "PHECC Cardiac First Response certification builds local capability that lasts for years." },
      ],
    },
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
      <SEO title="AED Sectors — Schools, Workplace, Nursing & Community" description="Tailored AED packages for schools and crèches, nursing homes, workplaces and community CFR groups across Ireland. Compliant, supported, life-saving." path="/sectors" />
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
        <section className="relative overflow-hidden bg-secondary section-padding-hero">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(var(--primary)/0.18),_transparent_60%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_transparent,_hsl(var(--secondary)))] pointer-events-none" />
          <div className="relative container mx-auto">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <AmoulImporterChip />
              <div className={`inline-flex p-3 sm:p-4 rounded-2xl ${data.bgColor} mb-6`}>
                <Icon className={`h-8 w-8 sm:h-10 sm:w-10 ${data.color}`} />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-5xl text-secondary-foreground mb-3 sm:mb-4">{data.title}</h1>
              <p className="text-base sm:text-lg text-secondary-foreground/70 mb-6 sm:mb-8 max-w-2xl">{data.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-red-deep">
                  <Link to="/quote">Get a Sector Quote</Link>
                </Button>
                <Button size="lg" className="bg-background text-secondary hover:bg-background/90 border-2 border-background btn-micro shadow-md">
                  Download Info Pack
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why AEDs matter */}
        <section className="section-padding bg-background relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_hsl(var(--primary)/0.05),_transparent_50%)] pointer-events-none" />
          <div className="relative container mx-auto max-w-5xl">
            <motion.div
              key={activeTab + "-why"}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <div className="max-w-2xl mb-12">
                <span className="inline-flex items-center gap-2 bg-red-soft text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4 border border-primary/15">
                  <HeartPulse className="h-3.5 w-3.5" />
                  Why it matters
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                  Why AEDs are essential here
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">{data.whyNeeded.intro}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {data.whyNeeded.points.map((p, i) => {
                  const PIcon = p.icon;
                  return (
                    <motion.div
                      key={p.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.4 }}
                      className="clinical-card p-6 flex gap-4 hover:border-primary/30 transition-colors"
                    >
                      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-red-soft flex items-center justify-center">
                        <PIcon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-foreground mb-1">{p.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Compliance + Recommended Package */}
        <section className="section-padding bg-muted/40">
          <div className="container mx-auto max-w-5xl">
            <motion.div key={activeTab + "-content"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="grid lg:grid-cols-5 gap-6 mb-16">
                {/* Regulatory */}
                <div className="lg:col-span-2 clinical-card p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="h-4 w-4 text-secondary" />
                    <span className="text-xs font-bold uppercase tracking-wider text-secondary">Regulatory Context</span>
                  </div>
                  <p className="text-foreground font-medium leading-relaxed">{data.compliance}</p>
                </div>

                {/* Recommended Package — featured */}
                <div className="lg:col-span-3 relative rounded-2xl p-[1.5px] bg-gradient-to-br from-primary via-primary/40 to-primary/10 shadow-xl shadow-primary/10">
                  <div className="relative rounded-2xl bg-card p-7 overflow-hidden">
                    <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-md shadow-primary/30">
                            <PackageIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-primary">Recommended Package</span>
                            <h3 className="font-heading text-xl font-extrabold text-foreground">Everything you need, bundled</h3>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 bg-red-soft text-primary text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-primary/20">
                          <Sparkles className="h-3 w-3" />
                          Most popular
                        </span>
                      </div>

                      <ul className="space-y-2.5 mb-5">
                        {data.packageItems.map((item) => (
                          <li key={item} className="flex items-start gap-3 text-foreground/90">
                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-[15px] leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="border-t border-border pt-4 flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-foreground/80">{data.packageHighlight}</p>
                        <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-red-deep">
                          <Link to="/quote">Get this package →</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-8 mb-16 text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_hsl(var(--primary)/0.15),_transparent_60%)] pointer-events-none" />
                <div className="relative">
                  <h3 className="text-lg font-heading font-bold text-primary mb-1 uppercase tracking-wider text-sm">Transparent Pricing</h3>
                  <p className="text-foreground text-xl font-heading font-extrabold">{data.pricing}</p>
                </div>
              </div>

              {/* Steps */}
              <div className="mb-16">
                <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-center mb-10">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {data.steps.map((step, i) => (
                    <div key={i} className="clinical-card p-6 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-heading font-bold text-lg mb-4 shadow-md shadow-primary/20">
                        {i + 1}
                      </div>
                      <p className="font-medium text-foreground">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Case study */}
              <div className="relative bg-secondary text-secondary-foreground rounded-2xl p-8 md:p-10 mb-16 overflow-hidden">
                <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
                <div className="relative">
                  <span className="text-xs font-bold uppercase tracking-wider text-primary mb-3 inline-block">Case Study</span>
                  <blockquote className="text-secondary-foreground italic text-xl md:text-2xl font-heading mb-5 leading-relaxed">
                    "{data.caseStudy.quote}"
                  </blockquote>
                  <p className="font-heading font-bold">{data.caseStudy.name}</p>
                  <p className="text-sm text-secondary-foreground/70">{data.caseStudy.role}</p>
                </div>
              </div>

              {/* FAQs */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-heading font-extrabold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-3">
                  {data.faqs.map((faq) => (
                    <details key={faq.q} className="group clinical-card">
                      <summary className="cursor-pointer p-5 font-semibold text-foreground flex justify-between items-center">
                        {faq.q}
                        <span className="text-primary group-open:rotate-45 transition-transform text-2xl leading-none">+</span>
                      </summary>
                      <p className="px-5 pb-5 text-muted-foreground leading-relaxed">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Trust signals */}
        <section className="bg-background section-padding py-12 border-t border-border">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {["CE marked device", "PHECC certified training", "HSE/HIQA aligned", "Irish-based support team", "Compliance docs included"].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
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
