import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import aedLogo from "@/assets/aed-logo.png";

export default function SiteFooter() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-8 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={aedLogo} alt="Smart Defibs LTD" className="h-10 w-10 bg-background rounded-lg p-1" />
              <span className="font-heading font-extrabold text-lg tracking-tight">Smart Defibs LTD</span>
            </div>
            <p className="text-secondary-foreground/80 text-sm leading-relaxed max-w-xs">
              Ireland's trusted defibrillator supplier. Prepared communities save lives.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-6 text-red-bright text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm text-secondary-foreground/85">
              {[
                { label: "Products", to: "/products" },
                { label: "Sector Solutions", to: "/sectors" },
                { label: "Training", to: "/training" },
                { label: "Servicing", to: "/servicing" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-red-bright transition-colors inline-block story-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-6 text-red-bright text-sm uppercase tracking-wider">Sectors</h4>
            <ul className="space-y-3 text-sm text-secondary-foreground/85">
              {["Schools", "Nursing Homes", "Workplaces", "Community & CFR"].map((s) => (
                <li key={s}>
                  <Link to="/sectors" className="hover:text-red-bright transition-colors inline-block story-link">{s}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-6 text-red-bright text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-sm text-secondary-foreground/85">
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-red-bright flex-shrink-0" /> +353 89 499 2903</li>
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-red-bright flex-shrink-0" /> info@smartdefibs.ie</li>
              <li className="flex items-start gap-3"><MapPin className="h-4 w-4 text-red-bright flex-shrink-0 mt-0.5" /> <span>Unit 18, The Cube FlexiSpace,<br />Lanesborough Road,<br />Co. Roscommon F42 DX61, Ireland</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-secondary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6 text-xs text-secondary-foreground/75">
            <span>✓ CE Marked</span>
            <span>✓ PHECC Certified</span>
            <span>✓ HSE Recommended</span>
            <span>✓ Irish Heart Foundation</span>
          </div>
          <p className="text-xs text-secondary-foreground/65">
            © {new Date().getFullYear()} Smart Defibs LTD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
