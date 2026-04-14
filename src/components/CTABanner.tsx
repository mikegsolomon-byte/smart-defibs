import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function CTABanner() {
  return (
    <section className="bg-primary section-padding">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl text-primary-foreground mb-4">
          Ready to protect your community?
        </h2>
        <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
          Get a free, no-obligation quote tailored to your sector. We respond within 4 business hours.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-navy-light text-base px-8">
            <Link to="/quote">Get a Free Quote</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-base px-8">
            <a href="tel:01234567">
              <Phone className="mr-2 h-4 w-4" /> Call Us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
