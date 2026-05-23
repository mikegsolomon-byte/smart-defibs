import amoulLogo from "@/assets/amoul-logo.png";

export default function AmoulImporterChip({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const base =
    variant === "dark"
      ? "bg-white/10 text-secondary-foreground border-white/20"
      : "bg-card text-foreground border-border shadow-sm";
  return (
    <span className={`inline-flex items-center gap-2 ${base} text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border mb-4`}>
      <img src={amoulLogo} alt="Amoul" className="h-4 w-auto bg-white rounded-sm px-1" />
      Official Irish Importer of Amoul® Products
    </span>
  );
}
