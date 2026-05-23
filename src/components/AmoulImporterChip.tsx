import { ShieldCheck } from "lucide-react";
import amoulLogo from "@/assets/amoul-logo.png";

type Props = {
  variant?: "dark" | "light";
  /** "full" = with Amoul® Products suffix, "compact" = "Official Irish Importer" */
  size?: "full" | "compact";
  className?: string;
};

/**
 * Premium importer credential badge.
 * - Red gradient pill on light bg, glassy red pill on dark bg
 * - Amoul logo tile + verified shield + uppercase label
 */
export default function AmoulImporterChip({
  variant = "dark",
  size = "full",
  className = "",
}: Props) {
  const isDark = variant === "dark";

  const wrapper = isDark
    ? "bg-white/10 border-white/20 text-secondary-foreground backdrop-blur-sm"
    : "bg-gradient-to-r from-red-soft via-card to-red-soft border-primary/20 text-foreground shadow-md shadow-primary/10";

  const accent = isDark
    ? "bg-primary/90 text-primary-foreground"
    : "bg-gradient-to-br from-primary to-red-deep text-primary-foreground";

  const labelMuted = isDark ? "opacity-70" : "text-muted-foreground";
  const labelStrong = isDark ? "text-secondary-foreground" : "text-foreground";

  return (
    <span
      className={`group inline-flex items-stretch gap-2 rounded-full border ${wrapper} pl-1 pr-3 py-1 mb-4 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 ${className}`}
    >
      {/* Logo tile */}
      <span className={`flex items-center justify-center rounded-full ${accent} px-2 shadow-sm`}>
        <img
          src={amoulLogo}
          alt="Amoul"
          className="h-3.5 w-auto brightness-0 invert"
        />
      </span>

      {/* Verified icon */}
      <ShieldCheck
        className={`h-3.5 w-3.5 self-center ${isDark ? "text-primary-foreground/90" : "text-primary"}`}
        strokeWidth={2.5}
      />

      {/* Label */}
      <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.14em] leading-none">
        <span className={labelMuted}>Official Irish</span>
        <span className={`${labelStrong} font-extrabold`}>
          Importer{size === "full" ? " of Amoul®" : ""}
        </span>
      </span>
    </span>
  );
}
