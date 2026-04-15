import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
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
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 16);
      setVisible(y < lastY || y < 64);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  useEffect(() => setMobileOpen(false), [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${
        scrolled
          ? "bg-secondary/80 backdrop-blur-xl border-b border-border/30 shadow-sm"
          : "bg-secondary border-b border-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 focus-ring rounded-lg">
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
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors focus-ring ${
                location.pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-secondary-foreground/80 hover:text-primary hover:bg-primary/5"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <a
            href="tel:01234567"
            className="flex items-center gap-1.5 text-sm text-secondary-foreground/70 hover:text-primary transition-colors px-3 py-2"
          >
            <Phone className="h-4 w-4" />
            01 234 5678
          </a>
          <ThemeToggle />
          <Button asChild className="bg-primary text-primary-foreground hover:bg-teal-light btn-micro">
            <Link to="/quote">Get a Quote</Link>
          </Button>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            className="text-secondary-foreground p-2 focus-ring rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-secondary/95 backdrop-blur-xl border-t border-border/20"
          >
            <nav className="py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-6 py-3 min-h-[44px] flex items-center text-secondary-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors focus-ring"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="px-6 pt-4">
                <Button asChild className="w-full bg-primary text-primary-foreground btn-micro">
                  <Link to="/quote" onClick={() => setMobileOpen(false)}>Get a Quote</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
