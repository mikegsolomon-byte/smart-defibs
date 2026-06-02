import amoulI3 from "@/assets/amoul-i3.jpg";
import amoulI5 from "@/assets/amoul-i5.jpg";
import chestEr from "@/assets/chest-er.jpg";

export type StaticProduct = {
  handle: string;
  title: string;
  subtitle: string;
  brand: string;
  category: string;
  image: string;
  priceFrom: string;
  priceNote: string;
  priceId?: string;
  shortDescription: string;
  longDescription: string;
  badges: string[];
  highlights: { title: string; desc: string }[];
  features: string[];
  flagship?: boolean;
};

export const products: StaticProduct[] = [
  {
    handle: "amoul-i3-aed",
    title: "Amoul® i3 AED",
    subtitle: "Semi-Automatic External Defibrillator",
    brand: "Amoul",
    category: "Defibrillator",
    image: amoulI3,
    priceFrom: "€1,295",
    priceNote: "incl. VAT · includes pads & 5yr battery",
    priceId: "amoul_i3_aed_price",
    shortDescription:
      "Smart ECG analysis with clear voice & visual guidance. Adult & paediatric pads included as standard.",
    longDescription:
      "The Amoul i3 delivers smart ECG analysis with real-time visual and voice guidance for both CPR and defibrillation. Ships with adult and paediatric pads as standard, IP54 rated for Irish conditions, and backed by a 5-year battery and full manufacturer warranty.",
    badges: ["CE Marked", "IP54", "Flagship"],
    flagship: true,
    highlights: [
      { title: "200J adult / 50J paediatric", desc: "Smart escalating biphasic shock" },
      { title: "Adult & paediatric pads", desc: "Both included as standard" },
      { title: "IP54 rated", desc: "Dust & water resistant" },
      { title: "5-year battery life", desc: "Long-life disposable battery" },
      { title: "Optional 4G connectivity", desc: "Remote management & daily self-tests" },
      { title: "EMS-trusted", desc: "Clear multilingual voice & visual prompts" },
    ],
    features: [
      "Semi-automatic operation with one-button shock delivery",
      "Multilingual voice & visual prompts",
      "Suitable for adults and children",
      "Full PHECC-aligned training available",
    ],
  },
  {
    handle: "amoul-i5-aed",
    title: "Amoul® i5 AED",
    subtitle: "Semi-Automatic External Defibrillator with 7\" HD Screen",
    brand: "Amoul",
    category: "Defibrillator",
    image: amoulI5,
    priceFrom: "€1,895",
    priceNote: "incl. VAT · pads, battery & cabinet options included",
    priceId: "amoul_i5_aed_price",
    shortDescription:
      "Premium AED with 7-inch HD LCD, GPS tracking, 4G remote management and storage for up to 1,000 ECG events.",
    longDescription:
      "The Amoul i5 features a 7-inch HD LCD screen for clear, real-time visual guidance alongside voice prompts in up to 16 languages. Built-in GPS and optional 4G enable accurate location tracking and remote daily self-tests through the AED management platform. The device stores up to 1,000 ECG events over 24 hours and delivers up to 200 shocks per battery — making it ideal for high-traffic public-access deployments and EMS use.",
    badges: ["CE Marked", "7\" HD Screen", "GPS + 4G Ready"],
    highlights: [
      { title: "7-inch HD LCD screen", desc: "Clear status, ECG and CPR feedback" },
      { title: "GPS location tracking", desc: "Always know where each unit is" },
      { title: "4G remote management", desc: "Daily self-tests & real-time data upload" },
      { title: "1,000 ECG events stored", desc: "24-hour continuous recording" },
      { title: "Up to 200 shocks", desc: "High-capacity battery, rechargeable option" },
      { title: "16-language guidance", desc: "Visual + voice prompts for any responder" },
    ],
    features: [
      "Quick start with user-friendly interface",
      "Suitable for adults and paediatric patients",
      "Optional wall-mounted AED cabinet available",
      "Ideal for EMS, public-access and large facilities",
    ],
  },
  {
    handle: "chest-er-cpr",
    title: "Chest-ER Automated CPR Device",
    subtitle: "Mechanical Chest Compression System",
    brand: "Progetti Medical",
    category: "CPR Device",
    image: chestEr,
    priceFrom: "€500",
    priceNote: "incl. VAT · full Irish supply & training package",
    priceId: "chest_er_cpr_price",
    shortDescription:
      "Portable automated chest-compression device delivering consistent, guideline-compliant CPR — freeing responders to focus on the patient.",
    longDescription:
      "Chest-ER by Progetti Medical is a lightweight, battery-powered mechanical CPR device that delivers continuous, high-quality chest compressions at guideline rate and depth. Designed for EMS, hospital and pre-hospital teams, it removes responder fatigue, keeps perfusion constant during transport, and frees crews to manage airway, defibrillation and medication. Quickly deployable, easy to position, and fully reusable.",
    badges: ["CE Marked", "Guideline Compliant", "EMS Ready"],
    highlights: [
      { title: "Consistent compressions", desc: "Guideline-compliant rate and depth, every cycle" },
      { title: "Hands-free CPR", desc: "Responders focus on airway, drugs & defibrillation" },
      { title: "Portable & battery powered", desc: "Designed for pre-hospital and transport use" },
      { title: "Quick to deploy", desc: "Fast positioning over the patient's chest" },
      { title: "Reduces responder fatigue", desc: "Maintains quality CPR for extended events" },
      { title: "Hospital & EMS grade", desc: "Trusted by ambulance and emergency teams" },
    ],
    features: [
      "Automated mechanical chest compressions",
      "Battery-powered with mains charging",
      "Compact, transportable design",
      "Full Irish supply, training and servicing through Smart Defibs LTD",
    ],
  },
];

export const getProduct = (handle: string) =>
  products.find((p) => p.handle === handle);
