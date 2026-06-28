import { motion } from "framer-motion";
import { MapPin, Handshake, ShieldCheck, Globe2, Cpu, Factory } from "lucide-react";
import amoulLogo from "@/assets/amoul-logo.png";
import amoulI3 from "@/assets/amoul-i3.jpg";

export default function AboutPartnership() {
  return (
    <section className="section-padding bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Amoul partnership */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="clinical-card overflow-hidden mb-20 lg:mb-28"
        >
          <div className="grid lg:grid-cols-2">
            <div className="relative bg-muted flex items-center justify-center p-8 lg:p-12">
              <img
                src={amoulI3}
                alt="Amoul i3 AED defibrillator"
                className="max-h-80 w-auto object-contain"
                loading="lazy"
              />
              <span className="absolute top-4 left-4 inline-flex items-center gap-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md">
                Exclusive Partnership
              </span>
            </div>

            <div className="p-8 lg:p-12">
              <div className="flex items-center gap-3 mb-5">
                <img src={amoulLogo} alt="Amoul" className="h-9 w-auto bg-white rounded-md px-2 py-1 border border-border" />
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Exclusive Amoul® Partner</span>
              </div>

              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground mb-4">
                Exclusive Irish partner of Amoul®
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Smart Defibs LTD is the exclusive Irish importer and representative for
                Amoul® — the global emergency care brand of Ambulanc (Shenzhen) Tech. Co., Ltd.
                Every Amoul device sold in Ireland comes through us, with full warranty,
                genuine consumables and Irish-based service support.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Founded in 2001 by a team of emergency care specialists, Amoul designs and
                manufactures life support, CPR, anaesthesia and critical care devices used
                in hospitals and public spaces in over 100 countries.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                  { icon: Factory, k: "Since 2001", v: "Established" },
                  { icon: Globe2, k: "100+", v: "Countries" },
                  { icon: Cpu, k: "1,000+", v: "Patents" },
                ].map(({ icon: Icon, k, v }) => (
                  <div key={v} className="bg-muted/60 border border-border rounded-lg p-3 text-center">
                    <Icon className="h-4 w-4 text-primary mx-auto mb-1.5" />
                    <div className="font-heading font-extrabold text-sm text-foreground">{k}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">{v}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {["ISO 13485", "CE Marked", "FDA (EUA)", "700+ Staff"].map((b) => (
                  <span key={b} className="text-xs bg-primary/10 text-primary font-semibold px-3 py-1.5 rounded-full">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* About Smart Defibs */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center"
        >
          <div className="lg:col-span-3">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
              <MapPin className="h-3.5 w-3.5" /> Proudly Irish
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-5">
              A dedicated Irish company protecting Irish communities.
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4">
              Smart Defibs LTD is an Irish-owned and operated business based in Co. Roscommon.
              We work hand-in-hand with schools, nursing homes, sports clubs, workplaces and
              community first responder groups right across the country — from Donegal to West Cork.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Every quote, training session and service visit is handled locally by our Irish team.
              No call centres, no overseas resellers — just straight answers, fast response times,
              and full HIQA & HSA compliance documentation included as standard.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { k: "100%", v: "Irish owned" },
                { k: "32", v: "Counties served" },
              ].map((s) => (
                <div key={s.v} className="clinical-card p-4 text-center">
                  <div className="font-heading font-extrabold text-2xl text-primary">{s.k}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="clinical-card p-8 bg-secondary text-secondary-foreground">
              <Handshake className="h-10 w-10 text-red-bright mb-4" />
              <h3 className="font-heading font-extrabold text-xl mb-3">Local hands, lifesaving outcomes</h3>
              <ul className="space-y-3 text-sm text-secondary-foreground/85">
                <li className="flex gap-3"><ShieldCheck className="h-4 w-4 text-red-bright flex-shrink-0 mt-0.5" /> PHECC-aligned training delivered nationwide</li>
                <li className="flex gap-3"><ShieldCheck className="h-4 w-4 text-red-bright flex-shrink-0 mt-0.5" /> Genuine pads & batteries shipped from Ireland</li>
                <li className="flex gap-3"><ShieldCheck className="h-4 w-4 text-red-bright flex-shrink-0 mt-0.5" /> Full HIQA & HSA compliance documentation</li>
                <li className="flex gap-3"><ShieldCheck className="h-4 w-4 text-red-bright flex-shrink-0 mt-0.5" /> Direct phone line to a real person, every time</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
