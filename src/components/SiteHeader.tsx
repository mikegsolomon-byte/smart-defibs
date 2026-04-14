import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import aedLogo from "@/assets/aed-logo.png";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Sectors", href: "/sectors" },
  { label: "Training", href: "/training" },
  { label: "Servicing", href: "/servicing" },
  { label: "Why an AED?", href: "/why-aed" },
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-secondary border-b border-secondary/80 backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <img src={aedLogo} alt="AED Ireland" className="h-9 w-9" />
          <span className="font-heading font-bold text-lg text-secondary-foreground">
            AED Ireland
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-secondary-foreground/80 hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:01234567"
            className="flex items-center gap-1.5 text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
          >
            <Phone className="h-4 w-4" />
            01 234 5678
          </a>
          <Button asChild className="bg-primary text-primary-foreground hover:bg-teal-light">
            <Link to="/quote">Get a Quote</Link>
          </Button>
        </div>

        <button
          className="lg:hidden text-secondary-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-secondary border-t border-secondary/60 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-6 py-3 text-secondary-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="px-6 pt-2">
            <Button asChild className="w-full bg-primary text-primary-foreground">
              <Link to="/quote" onClick={() => setMobileOpen(false)}>Get a Quote</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
