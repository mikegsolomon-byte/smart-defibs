import { motion } from "framer-motion";
import amoulLogo from "@/assets/amoul-logo.png";

// Bookmark ribbon — matches the home page hero. Parent section must be
// `relative` (and ideally `overflow-hidden`) for correct positioning.
export default function AmoulImporterChip({ variant }: { variant?: "dark" | "light" }) {
  // `variant` kept for backwards compatibility; ribbon styling is unified.
  void variant;
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
      className="absolute top-0 right-2 sm:right-8 lg:right-16 z-20"
    >
      <div
        className="relative bg-gradient-to-b from-primary to-red-deep text-primary-foreground shadow-2xl shadow-primary/30 pl-2 pr-2.5 sm:pl-4 sm:pr-5 pt-2 pb-4 sm:pt-3 sm:pb-7"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 10px), 0 100%)" }}
      >
        <div className="flex items-center gap-1.5 sm:gap-3 relative z-10">
          <div className="bg-white rounded p-0.5 sm:p-1 shadow-sm shrink-0">
            <img src={amoulLogo} alt="Amoul" className="h-4 sm:h-6 w-auto" />
          </div>
          <div className="leading-tight">
            <div className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] opacity-90">
              Official Irish
            </div>
            <div className="text-[10px] sm:text-sm font-extrabold uppercase tracking-wide sm:tracking-wider">
              Importer
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
