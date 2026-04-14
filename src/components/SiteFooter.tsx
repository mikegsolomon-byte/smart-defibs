import { Link } from "react-router-dom";
import { Heart, Phone, Mail, MapPin } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="h-6 w-6 text-primary fill-primary" />
              <span className="font-heading font-bold text-lg">AED Ireland</span>
            </div>
            <p className="text-secondary-foreground/70 text-sm leading-relaxed">
              Ireland's trusted AED supplier. Prepared communities save lives.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              {[
                { label: "Products", to: "/products" },
                { label: "Sector Solutions", to: "/sectors" },
                { label: "Training", to: "/training" },
                { label: "Servicing", to: "/servicing" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-primary transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-primary">Sectors</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground/70">
              {["Schools", "Nursing Homes", "Workplaces", "Community & CFR"].map((s) => (
                <li key={s}>
                  <Link to="/sectors" className="hover:text-primary transition-colors">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4 text-primary">Contact</h4>
            <ul className="space-y-3 text-sm text-secondary-foreground/70">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> 01 234 5678</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> info@aedireland.ie</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Dublin, Ireland</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-secondary-foreground/50">
            <span>✓ CE Marked</span>
            <span>✓ PHECC Certified</span>
            <span>✓ HSE Recommended</span>
            <span>✓ Irish Heart Foundation</span>
          </div>
          <p className="text-xs text-secondary-foreground/40">
            © {new Date().getFullYear()} AED Ireland. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
