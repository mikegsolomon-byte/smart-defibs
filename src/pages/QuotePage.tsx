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
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl mb-4">Get a Free Quote</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Select your sector and we'll send you a tailored proposal. We respond within 4 business hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              {submitted ? (
                <div className="bg-primary/5 border border-primary/20 rounded-xl p-12 text-center">
                  <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl mb-2">Thank you!</h2>
                  <p className="text-muted-foreground">Your quote request has been received. We'll be in touch within 4 business hours with a tailored proposal for your sector.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-8 space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><Label htmlFor="name">Name *</Label><Input id="name" required placeholder="Your name" /></div>
                    <div><Label htmlFor="org">Organisation *</Label><Input id="org" required placeholder="Organisation name" /></div>
                  </div>

                  <div>
                    <Label htmlFor="sector">Sector *</Label>
                    <Select required>
                      <SelectTrigger><SelectValue placeholder="Select your sector" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="schools">Schools / Crèche</SelectItem>
                        <SelectItem value="nursing">Nursing Home</SelectItem>
                        <SelectItem value="workplace">Workplace</SelectItem>
                        <SelectItem value="community">Community / CFR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><Label htmlFor="qty">Number of AEDs needed</Label><Input id="qty" type="number" min={1} placeholder="1" /></div>
                    <div>
                      <Label htmlFor="training">Training required?</Label>
                      <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="service">Service plan?</Label>
                      <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div><Label htmlFor="budget">Budget range (optional)</Label><Input id="budget" placeholder="e.g. €1,000 – €2,000" /></div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div><Label htmlFor="email">Email *</Label><Input id="email" type="email" required placeholder="you@example.ie" /></div>
                    <div><Label htmlFor="phone">Phone *</Label><Input id="phone" type="tel" required placeholder="01 234 5678" /></div>
                  </div>

                  <div><Label htmlFor="message">Message / Notes</Label><Textarea id="message" placeholder="Any additional details..." rows={3} /></div>

                  <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-teal-light text-base">
                    Submit — We Respond Within 4 Hours
                  </Button>
                </form>
              )}
            </motion.div>

            <div className="space-y-6">
              {[
                { icon: Clock, label: "4-hour response", desc: "We respond to every quote within 4 business hours" },
                { icon: Phone, label: "01 234 5678", desc: "Call us for immediate assistance" },
                { icon: Mail, label: "info@aedireland.ie", desc: "Email us any time" },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="p-2.5 rounded-lg bg-primary/10">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}

              <div className="bg-muted rounded-xl p-6 mt-8">
                <h3 className="font-heading font-semibold mb-3">What happens next?</h3>
                <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                  <li>We review your requirements</li>
                  <li>You receive a tailored sector quote</li>
                  <li>We schedule installation & training</li>
                  <li>Your AED goes live — we monitor it</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
