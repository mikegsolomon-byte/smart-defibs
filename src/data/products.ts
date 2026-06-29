import amoulI3Asset from "@/assets/amoul-i3.png.asset.json";
import amoulI5 from "@/assets/amoul-i5.jpg";
import chestErAsset from "@/assets/chest-er.png.asset.json";
import outdoorCabinetAsset from "@/assets/heated-outdoor-cabinet.png.asset.json";
import indoorCabinet1Asset from "@/assets/indoor-cabinet-1.png.asset.json";
import indoorCabinet2Asset from "@/assets/indoor-cabinet-2.png.asset.json";
import batteryAsset from "@/assets/amoul-battery.png.asset.json";
import electrodePadsAsset from "@/assets/amoul-electrode-pads.png.asset.json";
import cprResponseKitAsset from "@/assets/cpr-response-kit.png.asset.json";

const amoulI3 = amoulI3Asset.url;
const chestEr = chestErAsset.url;
const outdoorCabinet = outdoorCabinetAsset.url;
const indoorCabinet1 = indoorCabinet1Asset.url;
const indoorCabinet2 = indoorCabinet2Asset.url;
const battery = batteryAsset.url;
const electrodePads = electrodePadsAsset.url;
const cprResponseKit = cprResponseKitAsset.url;

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
  galleryImages?: string[];
};

export const products: StaticProduct[] = [
  {
    handle: "amoul-i3-aed-4g",
    title: "Amoul® i3 AED 4G",
    subtitle: "Semi-Automatic External Defibrillator",
    brand: "Amoul",
    category: "Defibrillator",
    image: amoulI3,
    priceFrom: "€1,299",
    priceNote: "incl. VAT · includes pads & 5-year battery",
    priceId: "aed_i3_4g_price",
    shortDescription:
      "Connected AED with illuminated rescue diagrams, clear voice prompts and 4G remote monitoring. Adult & paediatric pads included.",
    longDescription:
      "The Amoul i3 4G delivers clear, guided rescue support with illuminated diagrams and voice prompts, while 4G connectivity enables remote monitoring and automatic self-tests. Backed by an 8-year manufacturer warranty, a long-life 5-year battery and IP55 dust & water protection — ready for indoor and outdoor deployment across Ireland.",
    badges: ["CE Marked", "IP55", "4G Connected"],
    flagship: true,
    highlights: [
      { title: "4G remote monitoring", desc: "Automatic daily, weekly & monthly self-tests" },
      { title: "Illuminated rescue diagrams", desc: "Clear visual & voice prompts" },
      { title: "Universal pads", desc: "Adult & paediatric pads included" },
      { title: "5-year battery", desc: "Long-life standby battery" },
      { title: "8-year warranty", desc: "Full manufacturer cover" },
      { title: "IP55 rated", desc: "Dust & water protection" },
    ],
    features: [
      "Illuminated Rescue Diagrams & Clear Voice Prompts",
      "4G Connectivity for Remote Monitoring",
      "8-Year Manufacturer Warranty",
      "Universal Adult & Paediatric Pads",
      "Long-Life 5-Year Battery",
      "IP55 Dust & Water Protection",
      "Automatic Daily, Weekly & Monthly Self-Tests",
    ],
  },
  {
    handle: "amoul-i5-view-aed-4g",
    title: "Amoul® i5 View AED 4G",
    subtitle: "Semi-Automatic AED with 7\" HD Colour Display",
    brand: "Amoul",
    category: "Defibrillator",
    image: amoulI5,
    priceFrom: "€1,399",
    priceNote: "incl. VAT · pads & 5-year battery included",
    priceId: "aed_i5_view_4g_price",
    shortDescription:
      "Premium AED with a 7-inch HD colour display, real-time ECG and 4G remote monitoring for clear, confident rescues.",
    longDescription:
      "The Amoul i5 View 4G adds a 7-inch HD colour display and real-time ECG to clear voice prompts, giving responders full visual guidance during a rescue. 4G connectivity enables remote monitoring and automatic self-tests, while an 8-year warranty, 5-year battery and IP55 protection make it ideal for high-traffic public-access deployments.",
    badges: ["CE Marked", "7\" HD Display", "4G Connected"],
    highlights: [
      { title: "7\" HD colour display", desc: "Clear visual guidance & voice prompts" },
      { title: "Real-time ECG display", desc: "Live rhythm feedback" },
      { title: "4G remote monitoring", desc: "Automatic self-tests & alerts" },
      { title: "Universal pads", desc: "Adult & paediatric pads included" },
      { title: "5-year battery", desc: "Long-life standby battery" },
      { title: "8-year warranty", desc: "Full manufacturer cover" },
    ],
    features: [
      "7\" HD Colour Display & Clear Voice Prompts",
      "Real-Time ECG Display",
      "4G Connectivity for Remote Monitoring",
      "8-Year Manufacturer Warranty",
      "Universal Adult & Paediatric Pads",
      "Long-Life 5-Year Battery",
      "IP55 Dust & Water Protection",
      "Automatic Daily, Weekly & Monthly Self-Tests",
    ],
  },
  {
    handle: "amoul-i5-view-cpr-aed-4g",
    title: "Amoul® i5 View CPR AED 4G",
    subtitle: "AED with Integrated Real-Time CPR Feedback",
    brand: "Amoul",
    category: "Defibrillator",
    image: amoulI5,
    priceFrom: "€1,649",
    priceNote: "incl. VAT · pads & 5-year battery included",
    priceId: "aed_i5_view_cpr_4g_price",
    shortDescription:
      "Our most advanced AED — integrated real-time CPR feedback, 7-inch HD display, real-time ECG and 4G remote monitoring.",
    longDescription:
      "The Amoul i5 View CPR 4G combines integrated real-time CPR feedback with a 7-inch HD colour display and real-time ECG, coaching responders to deliver high-quality compressions while guiding defibrillation. 4G connectivity enables remote monitoring and automatic self-tests, backed by an 8-year warranty, 5-year battery and IP55 protection.",
    badges: ["CE Marked", "CPR Feedback", "7\" HD Display"],
    highlights: [
      { title: "Integrated CPR feedback", desc: "Real-time compression coaching" },
      { title: "7\" HD colour display", desc: "Clear visual guidance & voice prompts" },
      { title: "Real-time ECG display", desc: "Live rhythm feedback" },
      { title: "4G remote monitoring", desc: "Automatic self-tests & alerts" },
      { title: "Universal pads", desc: "Adult & paediatric pads included" },
      { title: "8-year warranty", desc: "Full manufacturer cover" },
    ],
    features: [
      "Integrated Real-Time CPR Feedback",
      "7\" HD Colour Display & Clear Voice Prompts",
      "Real-Time ECG Display",
      "4G Connectivity for Remote Monitoring",
      "8-Year Manufacturer Warranty",
      "Universal Adult & Paediatric Pads",
      "Long-Life 5-Year Battery",
      "IP55 Dust & Water Protection",
      "Automatic Daily, Weekly & Monthly Self-Tests",
    ],
  },
  {
    handle: "chest-er-cpr-feedback",
    title: "Chest-eR® CPR Feedback Device",
    subtitle: "Real-Time Compression Feedback",
    brand: "Progetti Medical",
    category: "CPR Device",
    image: chestEr,
    priceFrom: "€349",
    priceNote: "incl. VAT · for training & real emergencies",
    priceId: "chest_er_device_price",
    shortDescription:
      "Compact device delivering real-time compression rate and depth feedback to improve CPR quality in training and real emergencies.",
    longDescription:
      "Chest-eR by Progetti Medical provides real-time feedback on chest compression rate and depth, helping responders deliver consistently high-quality CPR. Its patented three-layer protective design is simple and intuitive to use, lightweight, and suitable for both training and real emergencies, with a hygienic disposable patient cover.",
    badges: ["CE Marked", "Real-Time Feedback", "Training & Rescue"],
    highlights: [
      { title: "Rate & depth feedback", desc: "Real-time compression guidance" },
      { title: "Improves CPR quality", desc: "Coaches consistent compressions" },
      { title: "Compact & lightweight", desc: "Easy to carry and deploy" },
      { title: "Hygienic cover", desc: "Disposable single-use patient cover" },
      { title: "Simple to use", desc: "Intuitive for any responder" },
      { title: "2-year warranty", desc: "Standard AA battery powered" },
    ],
    features: [
      "Real-Time Compression Rate & Depth Feedback",
      "Helps Improve CPR Quality",
      "Suitable for CPR Training & Real Emergencies",
      "Patented Protective Three-Layer Design",
      "Simple & Intuitive to Use",
      "Compact & Lightweight",
      "Hygienic Disposable Patient Cover",
      "2-Year Manufacturer Warranty",
      "Standard AA Battery Powered",
    ],
  },
  {
    handle: "heated-outdoor-cabinet",
    title: "Heated Outdoor AED Cabinet",
    subtitle: "Galvanised Steel · Heated · Lockable",
    brand: "Smart Defibs",
    category: "Cabinet",
    image: outdoorCabinet,
    priceFrom: "€399",
    priceNote: "incl. VAT · 230V mains powered",
    shortDescription:
      "Heated, weatherproof outdoor cabinet keeping your AED at the right temperature for 24/7 public access.",
    longDescription:
      "A galvanised steel outdoor cabinet with an integrated heating system and digital thermostat to keep your AED within its operating temperature range year-round. Features an external temperature display, frosted UV-protected viewing window, lockable door and high-visibility ambulance-yellow finish with ILCOR AED signage.",
    badges: ["Heated", "Weatherproof", "Lockable"],
    highlights: [
      { title: "Integrated heating", desc: "Digital thermostat control" },
      { title: "Galvanised steel", desc: "Durable weatherproof build" },
      { title: "Temperature display", desc: "External readout" },
      { title: "High-visibility finish", desc: "Ambulance yellow with ILCOR signage" },
    ],
    features: [
      "Galvanised Steel Construction",
      "Integrated Heating System",
      "Digital Thermostat",
      "External Temperature Display",
      "230V Mains Powered",
      "Frosted UV-Protected Viewing Window",
      "Lockable Door",
      "High-Visibility Ambulance Yellow Finish",
      "ILCOR AED Signage",
    ],
  },
  {
    handle: "indoor-cabinet",
    title: "Indoor AED Cabinet",
    subtitle: "High-Visibility · Alarmed",
    brand: "Smart Defibs",
    category: "Cabinet",
    image: indoorCabinet1,
    galleryImages: [indoorCabinet1, indoorCabinet2],
    priceFrom: "€40",
    priceNote: "incl. VAT · easy wall installation",
    shortDescription:
      "High-visibility indoor cabinet with audible alarm and clear viewing window, protecting your AED while keeping it quick to access.",
    longDescription:
      "A high-visibility indoor AED cabinet with ILCOR signage, a clear viewing window and an integrated audible alarm. Protects against dust and everyday damage while keeping the AED quick and easy to access. Simple wall installation and compatible with all Amoul® AEDs.",
    badges: ["Alarmed", "High-Visibility", "Indoor"],
    highlights: [
      { title: "Audible alarm", desc: "Alerts when opened" },
      { title: "Clear window", desc: "AED visible at a glance" },
      { title: "Quick access", desc: "Fast AED retrieval" },
      { title: "Easy install", desc: "Simple wall mounting" },
    ],
    features: [
      "High-Visibility Design",
      "ILCOR AED Signage",
      "Clear Viewing Window",
      "Integrated Audible Alarm",
      "Protects Against Dust & Everyday Damage",
      "Quick & Easy AED Access",
      "Easy Wall Installation",
      "Compatible with All Amoul® AEDs",
    ],
  },
  {
    handle: "amoul-aed-battery",
    title: "Amoul® AED Battery",
    subtitle: "Long-Life Replacement Battery",
    brand: "Amoul",
    category: "Consumable",
    image: battery,
    priceFrom: "€160",
    priceNote: "incl. VAT · model-dependent capacity",
    shortDescription:
      "Genuine maintenance-free replacement battery with up to 5-year standby life and support for automatic self-testing.",
    longDescription:
      "Genuine Amoul® replacement battery offering up to 5-year standby life, a minimum of 200 shocks at 200 J, and up to 4 hours of continuous ECG monitoring. Lithium manganese dioxide chemistry (4.2 Ah or 4.5 Ah, model dependent), maintenance-free and non-rechargeable, with support for automatic self-testing and battery status monitoring.",
    badges: ["Genuine", "5-Year Standby", "Self-Test Ready"],
    highlights: [
      { title: "Up to 5-year standby", desc: "Long shelf life" },
      { title: "200+ shocks", desc: "Minimum at 200 J" },
      { title: "Maintenance-free", desc: "Non-rechargeable, easy swap" },
      { title: "Self-test support", desc: "Battery status monitoring" },
    ],
    features: [
      "Up to 5-Year Standby Life",
      "Minimum 200 Shocks at 200 J",
      "Up to 4 Hours Continuous ECG Monitoring",
      "Lithium Manganese Dioxide (Li-MnO₂)",
      "4.2 Ah or 4.5 Ah (Model Dependent)",
      "Maintenance-Free, Non-Rechargeable",
      "Easy Replacement",
      "Supports Automatic Self-Testing",
      "Supports Battery Status Monitoring",
    ],
  },
  {
    handle: "amoul-electrode-pads",
    title: "Amoul® Universal Electrode Pads",
    subtitle: "Adult & Paediatric Pads",
    brand: "Amoul",
    category: "Consumable",
    image: electrodePads,
    priceFrom: "€65",
    priceNote: "incl. VAT · 3–5 year shelf life (model dependent)",
    shortDescription:
      "Genuine universal adult & paediatric electrode pads with clear placement diagrams and high-conductivity gel.",
    longDescription:
      "Genuine Amoul® universal electrode pads suitable for both adults and children, with a 3-year or 5-year shelf life depending on model. Sterile and single-use, with clear placement diagrams, high-conductivity gel and connection-testing compatibility (model dependent). Compatible with all Amoul® AED models.",
    badges: ["Genuine", "Adult & Paediatric", "Single-Use"],
    highlights: [
      { title: "Universal pads", desc: "Adult & paediatric in one" },
      { title: "Clear diagrams", desc: "Guided placement" },
      { title: "High-conductivity gel", desc: "Reliable contact" },
      { title: "Easy replacement", desc: "Compatible with all Amoul® AEDs" },
    ],
    features: [
      "Universal Adult & Paediatric Pads",
      "3-Year or 5-Year Shelf Life (Model Dependent)",
      "Easy Replacement",
      "Clear Placement Diagrams",
      "High-Conductivity Gel",
      "Sterile, Single-Use",
      "Connection Testing Compatible (Model Dependent)",
      "Compatible with All Amoul® AED Models",
    ],
  },
  {
    handle: "aed-cpr-response-kit",
    title: "AED / CPR Response Kit",
    subtitle: "Essential Rescue Accessories",
    brand: "Smart Defibs",
    category: "Accessory",
    image: cprResponseKit,
    priceFrom: "€5",
    priceNote: "incl. VAT · single-use rescue essentials",
    shortDescription:
      "Compact kit with the essentials to support a rescue — shears, razor, face shield, gloves and more.",
    longDescription:
      "A compact AED / CPR response kit containing the single-use essentials needed to support a rescue: trauma shears, a disposable razor, a CPR face shield, nitrile gloves (M & XL), an absorbent cloth, an antiseptic wipe and a clinical waste bag.",
    badges: ["Rescue Kit", "Single-Use"],
    highlights: [
      { title: "Trauma shears", desc: "Cut clothing fast" },
      { title: "CPR face shield", desc: "Hygienic rescue breaths" },
      { title: "Nitrile gloves", desc: "Sizes M & XL included" },
      { title: "Prep essentials", desc: "Razor, wipe & waste bag" },
    ],
    features: [
      "Trauma Shears",
      "Disposable Razor",
      "CPR Face Shield",
      "Nitrile Gloves (M & XL)",
      "Absorbent Cloth",
      "Antiseptic Wipe",
      "Clinical Waste Bag",
    ],
  },
];

export const getProduct = (handle: string) =>
  products.find((p) => p.handle === handle);
