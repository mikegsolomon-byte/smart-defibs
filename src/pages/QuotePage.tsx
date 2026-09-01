import SEO from "@/components/SEO";
import { useState } from "react";
import AmoulImporterChip from "@/components/AmoulImporterChip";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Phone, Mail, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function QuotePage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    organisation: "",
    sector: "",
    email: "",
    phone: "",
    message: "",
    company_website: "", // honeypot — must stay empty
  });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.sector) {
      toast({ title: "Please select a sector", variant: "destructive" });
      return;
    }
    setSubmitting(true);

    const { error } = await supabase.functions.invoke("send-quote-notification", {
      body: {
        name: form.name,
        organisation: form.organisation,
        sector: form.sector,
        email: form.email,
        phone: form.phone,
        message: form.message || null,
        company_website: form.company_website,
      },
    });

    if (error) {
      console.error("Quote submission failed", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or call us directly.",
        variant: "destructive",
      });
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
    toast({ title: "Thanks — we've got your request!", description: "Our team will be in touch with your tailored quote shortly." });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO title="Contact Smart Defibs — Request a Quote or Ask a Question" description="Get in touch with Smart Defibs Ireland. Request a free AED quote, ask a question, or tell us about your site for tailored guidance." path="/quote" />
      <SiteHeader />
      <main className="flex-1 pb-16 md:pb-24 pt-8 md:pt-12 bg-background">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-2xl sm:text-3xl md:text-5xl mb-3 sm:mb-4">Contact us or request a free quote</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Ask a question, request a tailored proposal, or tell us about your site — we'll guide you to the right AED package for your sector.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-2"
            >
              {submitted ? (
                <div className="glass-card p-12 text-center">
                  <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl mb-2">Thank you!</h2>
                  <p className="text-muted-foreground">Your message has been received. We'll be in touch shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" required placeholder="Your name" className="focus-ring" value={form.name} onChange={update("name")} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="org">Organisation *</Label>
                      <Input id="org" required placeholder="Organisation name" className="focus-ring" value={form.organisation} onChange={update("organisation")} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sector">Sector *</Label>
                    <Select required value={form.sector} onValueChange={(v) => setForm((f) => ({ ...f, sector: v }))}>
                      <SelectTrigger className="focus-ring"><SelectValue placeholder="Select your sector" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="schools">Schools / Crèche</SelectItem>
                        <SelectItem value="nursing">Nursing Home</SelectItem>
                        <SelectItem value="workplace">Workplace</SelectItem>
                        <SelectItem value="gyms">Gym / Fitness Facility</SelectItem>
                        <SelectItem value="community">Community / CFR</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required placeholder="you@example.ie" className="focus-ring" value={form.email} onChange={update("email")} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" type="tel" required placeholder="+353 89 499 2903" className="focus-ring" value={form.phone} onChange={update("phone")} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">How can we help?</Label>
                    <Textarea id="message" placeholder="Ask a question, describe your site, or tell us what you need..." rows={3} className="focus-ring" value={form.message} onChange={update("message")} />
                  </div>

                  {/* Honeypot field — hidden from real users, traps bots */}
                  <div className="absolute left-[-9999px] top-[-9999px]" aria-hidden="true">
                    <label htmlFor="company_website">Company website (leave blank)</label>
                    <input
                      id="company_website"
                      name="company_website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.company_website}
                      onChange={update("company_website")}
                    />
                  </div>

                  <Button type="submit" size="lg" disabled={submitting} className="w-full bg-primary text-primary-foreground hover:bg-teal-light text-base btn-micro">
                    {submitting ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...</>) : "Send Enquiry"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    By submitting this form you agree to our{" "}
                    <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>.
                    We'll only use your details to respond to your enquiry.
                  </p>
                </form>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              {[
                { icon: Phone, label: "090 664 1050", desc: "Call us for immediate assistance" },
                { icon: Mail, label: "sales@smartdefibs.com", desc: "Email us any time" },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}

              <div className="glass-card p-8">
                <h3 className="font-heading font-semibold mb-4">What happens next?</h3>
                <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                  <li>We review your enquiry</li>
                  <li>We get back with guidance or a tailored quote</li>
                  <li>We schedule installation & training if you go ahead</li>
                  <li>Your AED goes live — we monitor it</li>
                </ol>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
