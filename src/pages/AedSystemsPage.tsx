import { Link } from "react-router-dom";
import { ArrowRight, Phone, ShieldCheck, Radio, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";
import SiteFooter from "@/components/SiteFooter";
import { products } from "@/data/products";
import logo from "@/assets/aed-logo.png";
import heroImage from "@/assets/hero-aed-wall.jpg";

export default function AedSystemsPage() {
  const defibrillators = products.filter((product) => product.category === "Defibrillator");
  const equipment = products.filter((product) => product.category === "Cabinet" || product.category === "CPR Device");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO title="AED Systems Ireland | By Smart Defibs Ltd" description="Explore connected defibrillators, AED cabinets and CPR equipment with AED Systems. Product advice, ordering and support from Smart Defibs Ltd in Ireland." path="/aed-systems" />
      <header className="border-b border-border bg-background">
        <div className="container mx-auto flex min-h-20 items-center justify-between gap-4 px-4 py-4 sm:px-8">
          <Link to="/aed-systems" className="flex items-center gap-3 rounded-md focus-ring">
            <img src={logo} alt="" className="h-12 w-auto" />
            <div>
              <span className="block font-heading text-xl font-extrabold sm:text-2xl">AED Systems<span className="text-primary">.</span></span>
              <span className="block text-xs text-muted-foreground">By Smart Defibs Ltd</span>
            </div>
          </Link>
          <Button asChild variant="outline" className="hidden sm:inline-flex">
            <Link to="/">Visit Smart Defibs <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="sm:hidden">
            <a href="tel:0906641050" aria-label="Call Smart Defibs"><Phone className="h-5 w-5" /></a>
          </Button>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden bg-surface-soft">
          <img src={heroImage} alt="Defibrillator cabinet installed on an exterior wall" className="absolute inset-0 -z-20 h-full w-full object-cover object-right" fetchPriority="high" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/95 to-background/30" />
          <div className="container mx-auto px-4 py-12 sm:px-8 sm:py-16 lg:py-20">
            <div className="max-w-xl">
              <p className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary"><span className="h-2 w-2 rounded-full bg-primary" /> Defibrillators & lifesaving equipment · Ireland</p>
              <h1 className="font-heading text-5xl font-extrabold leading-tight tracking-normal sm:text-6xl">AED Systems<span className="text-primary">.</span></h1>
              <p className="mt-4 text-xl font-semibold text-primary sm:text-2xl">Every AED ready. Every day. Every time.</p>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">Connected defibrillators, cabinets and CPR equipment for your workplace or community — supplied and supported by Smart Defibs Ltd.</p>
              <Button asChild size="lg" className="mt-8 h-12 px-6 font-semibold">
                <a href="#defibrillators">Explore defibrillators <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <p className="mt-5 text-sm text-muted-foreground">Already know what you need? <Link to="/quote" className="font-semibold text-primary underline underline-offset-4 focus-ring">Contact Smart Defibs</Link></p>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-background">
          <div className="container mx-auto grid gap-6 px-4 py-6 sm:px-8 md:grid-cols-3">
            {[
              { icon: ShieldCheck, title: "Supplied by Smart Defibs Ltd", text: "One team for your order and ongoing support." },
              { icon: Radio, title: "Connected AED monitoring", text: "Readiness support for your organisation." },
              { icon: HeartPulse, title: "Training & lifecycle support", text: "Equipment, training and care across Ireland." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-3">
                <Icon className="mt-1 h-5 w-5 shrink-0 text-primary" />
                <div><p className="text-sm font-bold">{title}</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">{text}</p></div>
              </div>
            ))}
          </div>
        </section>

        <section id="defibrillators" className="scroll-mt-8 px-4 py-12 sm:px-8 lg:py-16">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div><p className="mb-2 text-xs font-bold uppercase text-primary">Connected defibrillators</p><h2 className="text-3xl font-extrabold tracking-normal sm:text-4xl">Find your AED.</h2></div>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Explore the range. Get full specifications, buy online or request a quote on Smart Defibs.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {defibrillators.map((product) => (
                <article key={product.handle} className="clinical-card flex flex-col overflow-hidden !rounded-lg">
                  <Link to={`/product/${product.handle}`} aria-label={`More information about ${product.title}`} className="relative flex aspect-[4/3] items-center justify-center bg-surface-soft p-8 focus-ring">
                    {product.flagship && <span className="absolute left-4 top-4 rounded-sm bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">CPR feedback</span>}
                    <img src={product.image} alt={product.title} loading="lazy" className="h-full w-full object-contain" />
                  </Link>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="mb-3 text-xs font-semibold text-primary">4G connected · Remotely monitored</p>
                    <h3 className="text-xl font-extrabold tracking-normal">{product.title}</h3>
                    <p className="mb-6 mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{product.shortDescription}</p>
                    <Button asChild className="h-12 w-full"><Link to={`/product/${product.handle}`}>Get more info <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                    <p className="mt-3 text-center text-xs text-muted-foreground">Details & ordering on Smart Defibs</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-surface-soft px-4 py-12 sm:px-8 lg:py-16">
          <div className="container mx-auto max-w-6xl">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4"><h2 className="text-2xl font-extrabold tracking-normal sm:text-3xl">Cabinets & CPR equipment</h2><Button asChild variant="outline"><Link to="/products">View the full range <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
            <div className="grid gap-6 md:grid-cols-3">
              {equipment.map((product) => (
                <Link key={product.handle} to={`/product/${product.handle}`} className="clinical-card flex flex-col rounded-lg p-6 focus-ring">
                  <img src={product.image} alt={product.title} loading="lazy" className="mb-6 h-44 w-full object-contain" />
                  <h3 className="text-lg font-bold tracking-normal">{product.title}</h3>
                  <span className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">Get more info <ArrowRight className="h-4 w-4" /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary px-4 py-12 text-secondary-foreground sm:px-8">
          <div className="container mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-xl"><p className="mb-3 text-sm font-semibold text-accent">AED Systems · By Smart Defibs Ltd</p><h2 className="text-3xl font-extrabold tracking-normal">The same team. From advice to aftercare.</h2><p className="mt-4 leading-relaxed text-secondary-foreground/80">Your purchase, invoice and ongoing support are all handled by Smart Defibs Ltd. Talk to us about the right equipment for your premises.</p></div>
            <div className="flex shrink-0 flex-col gap-4"><Button asChild size="lg" className="bg-accent font-bold text-accent-foreground hover:bg-accent/90"><Link to="/quote">Contact Smart Defibs <ArrowRight className="ml-2 h-4 w-4" /></Link></Button><a href="tel:0906641050" className="flex items-center justify-center gap-2 text-sm focus-ring"><Phone className="h-4 w-4" />090 664 1050</a></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}