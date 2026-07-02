import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, FileText } from "lucide-react";

/**
 * Persistent bottom action bar for mobile/tablet viewports.
 * Keeps the two primary conversion actions — Call and Get a Quote —
 * always within thumb reach. Hidden on desktop (lg) and on admin routes.
 */
export default function MobileCtaBar() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/admin")) return null;

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, delay: 0.3, ease: [0, 0, 0.2, 1] }}
      className="lg:hidden fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-[0_-4px_20px_-8px_hsl(var(--foreground)/0.25)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        <a
          href="tel:0906641050"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-primary/40 bg-transparent px-4 py-3 text-sm font-semibold text-primary transition-colors active:bg-primary/10"
        >
          <Phone className="h-4 w-4" />
          Call
        </a>
        <Link
          to="/quote"
          className="flex flex-[1.4] items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-sm transition-colors active:bg-primary/90"
        >
          <FileText className="h-4 w-4" />
          Get a Quote
        </Link>
      </div>
    </motion.div>
  );
}
