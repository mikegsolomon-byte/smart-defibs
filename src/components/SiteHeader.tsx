import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

import aedLogo from "@/assets/aed-logo.png";

const navLinks = [
  { label: "Products", href: "/products" },
  { label: "Sectors", href: "/sectors" },
  { label: "Training", href: "/training" },
  { label: "Servicing", href: "/servicing" },
  
  { label: "About", href: "/about" },
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
          ? "bg-background/90 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-background border-b border-border/60"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-14 lg:h-20 px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2 lg:gap-3 focus-ring rounded-lg">
          <img src={aedLogo} alt="Smart Defibs LTD logo" className="h-10 lg:h-14 w-auto" />
          <div className="leading-tight">
            <span className="block font-heading font-extrabold text-sm lg:text-lg text-foreground tracking-tight">
              Smart Defibs LTD
            </span>
            <span className="hidden sm:block text-[10px] lg:text-[11px] uppercase tracking-[0.18em] text-muted-foreground font-semibold">
              Saving lives, every second
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors focus-ring ${
                location.pathname === link.href
                  ? "text-primary"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button asChild variant="outline">
            <Link to="/products">View Products</Link>
          </Button>
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 btn-micro shadow-sm font-bold">
            <Link to="/quote">Get a Quote</Link>
          </Button>
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <button
            className="text-foreground p-2 focus-ring rounded-lg"
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
            className="lg:hidden overflow-hidden bg-background border-t border-border"
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
                    className="block px-6 py-3 min-h-[44px] flex items-center text-foreground/80 hover:text-primary hover:bg-muted transition-colors focus-ring font-semibold"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="px-6 pt-4">
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-red-deep btn-micro">
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
