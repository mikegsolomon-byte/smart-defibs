import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-8 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Heart className="h-6 w-6 text-primary fill-primary" />
              <span className="font-heading font-bold text-lg">AED Ireland</span>
            </div>
            <p className="text-secondary-foreground/60 text-sm leading-relaxed max-w-xs">
              Ireland's trusted AED supplier. Prepared communities save lives.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-6 text-primary text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm text-secondary-foreground/60">
              {[
                { label: "Products", to: "/products" },
                { label: "Sector Solutions", to: "/sectors" },
                { label: "Training", to: "/training" },
                { label: "Servicing", to: "/servicing" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-primary transition-colors inline-block story-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-6 text-primary text-sm uppercase tracking-wider">Sectors</h4>
            <ul className="space-y-3 text-sm text-secondary-foreground/60">
              {["Schools", "Nursing Homes", "Workplaces", "Community & CFR"].map((s) => (
                <li key={s}>
                  <Link to="/sectors" className="hover:text-primary transition-colors inline-block story-link">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-6 text-primary text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-sm text-secondary-foreground/60">
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary flex-shrink-0" /> 01 234 5678</li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary flex-shrink-0" /> info@aedireland.ie</li>
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary flex-shrink-0" /> Dublin, Ireland</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-secondary-foreground/40">
            <span>✓ CE Marked</span>
            <span>✓ PHECC Certified</span>
            <span>✓ HSE Recommended</span>
            <span>✓ Irish Heart Foundation</span>
          </div>
          <p className="text-xs text-secondary-foreground/30">
            © {new Date().getFullYear()} AED Ireland. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
