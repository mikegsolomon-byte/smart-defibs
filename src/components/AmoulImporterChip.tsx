import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import amoulLogoAsset from "@/assets/amoul-logo.png.asset.json";

const amoulLogo = amoulLogoAsset.url;

// Split-tone credential badge — white "Amoul" side + green "Exclusive Partner"
// side, with a floating verification check. Parent section must be `relative`
// (and ideally `overflow-hidden`) for correct positioning.
export default function AmoulImporterChip({ variant }: { variant?: "dark" | "light" }) {
  void variant; // kept for backwards compatibility
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
      className="block w-fit mb-5 sm:mb-0 sm:absolute sm:top-5 sm:right-6 lg:top-6 lg:right-10 z-20"
    >
      <div className="relative group">
        {/* Soft presence glow */}
        <div className="absolute -inset-1 bg-gradient-to-r from-primary/25 to-transparent blur-xl opacity-60 pointer-events-none" />

        <div className="relative flex items-stretch shadow-2xl shadow-primary/20 rounded-md overflow-hidden ring-1 ring-primary/30">
          {/* Brand side */}
          <div className="bg-white flex items-center justify-center px-3 py-2 sm:px-5 sm:py-3">
            <img
              src={amoulLogo}
              alt="Amoul"
              className="h-5 sm:h-7 w-auto object-contain"
            />
          </div>


          {/* Status side */}
          <div className="relative bg-primary text-primary-foreground flex flex-col justify-center px-3 py-2 sm:px-5 sm:py-3 overflow-hidden">
            {/* diagonal texture */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg, transparent 0, transparent 10px, white 10px, white 11px)",
              }}
            />
            <div className="relative z-10">
              <div className="flex items-center gap-1.5 mb-0.5 sm:mb-1">
                <div className="h-px w-2 sm:w-3 bg-primary-foreground/50" />
                <span className="text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-bold text-primary-foreground/90 leading-none">
                  Exclusive
                </span>
              </div>
              <span className="block text-[10px] sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.18em] font-extrabold leading-none whitespace-nowrap">
                Partner
              </span>
            </div>
          </div>
        </div>

        {/* Floating verification seal */}
        <div className="absolute -top-2 -right-2 sm:-top-2.5 sm:-right-2.5 w-6 h-6 sm:w-7 sm:h-7 bg-white rounded-full border-[3px] border-background flex items-center justify-center shadow-lg">
          <ShieldCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" strokeWidth={3} />
        </div>
      </div>
    </motion.div>
  );
}
