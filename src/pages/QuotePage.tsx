import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Phone, Mail, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function QuotePage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({ title: "Quote request sent!", description: "We'll respond within 4 business hours." });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 section-padding bg-background">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl mb-4">Get a Free Quote</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Select your sector and we'll send you a tailored proposal. We respond within 4 business hours.
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
                  <p className="text-muted-foreground">Your quote request has been received. We'll be in touch within 4 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input id="name" required placeholder="Your name" className="focus-ring" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="org">Organisation *</Label>
                      <Input id="org" required placeholder="Organisation name" className="focus-ring" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sector">Sector *</Label>
                    <Select required>
                      <SelectTrigger className="focus-ring"><SelectValue placeholder="Select your sector" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="schools">Schools / Crèche</SelectItem>
                        <SelectItem value="nursing">Nursing Home</SelectItem>
                        <SelectItem value="workplace">Workplace</SelectItem>
                        <SelectItem value="community">Community / CFR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required placeholder="you@example.ie" className="focus-ring" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input id="phone" type="tel" required placeholder="+353 89 499 2903" className="focus-ring" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message / Notes</Label>
                    <Textarea id="message" placeholder="Any additional details..." rows={3} className="focus-ring" />
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-teal-light text-base btn-micro">
                    Submit — We Respond Within 4 Hours
                  </Button>
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
                { icon: Clock, label: "4-hour response", desc: "We respond to every quote within 4 business hours" },
                { icon: Phone, label: "+353 89 499 2903", desc: "Call us for immediate assistance" },
                { icon: Mail, label: "info@smartdefibs.ie", desc: "Email us any time" },
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
                  <li>We review your requirements</li>
                  <li>You receive a tailored sector quote</li>
                  <li>We schedule installation & training</li>
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
