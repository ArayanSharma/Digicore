import {
  Bell,
  MessageCircle,
  MapPin,
  Fingerprint,
  CreditCard,
  WifiOff,
  RefreshCw,
  QrCode,
  BarChart3,
  Languages,
  Moon,
  BrainCircuit,
} from "lucide-react";
import { SectionKicker } from "./shared";

const ICON_MAP = {
  Bell,
  MessageCircle,
  MapPin,
  Fingerprint,
  CreditCard,
  WifiOff,
  RefreshCw,
  QrCode,
  BarChart3,
  Languages,
  Moon,
  BrainCircuit,
};

const DEFAULT_FEATURES = [
  { icon: "Bell", title: "Push Notifications", desc: "Real-time alerts that bring users back into the experience.", span: "lg:col-span-2 lg:row-span-1" },
  { icon: "MessageCircle", title: "Live Chat", desc: "In-app real-time messaging built for speed and scale." },
  { icon: "MapPin", title: "GPS Tracking", desc: "Precise location for delivery, ride-hailing, and geo apps." },
  { icon: "Fingerprint", title: "Secure Authentication", desc: "Biometric login, 2FA, and rock-solid session security." },
  { icon: "CreditCard", title: "Payment Gateway", desc: "Seamless in-app payments with providers users trust." },
  { icon: "BrainCircuit", title: "AI Integration", desc: "Smart recommendations, chat assistants, and on-device ML baked in.", span: "lg:col-span-2 lg:row-span-1" },
  { icon: "WifiOff", title: "Offline Mode", desc: "Apps that keep working smoothly without a live connection." },
  { icon: "RefreshCw", title: "Cloud Sync", desc: "Seamless data sync across every device your users own." },
  { icon: "QrCode", title: "QR Scanner", desc: "Native scanning for check-ins, payments, and quick actions." },
  { icon: "BarChart3", title: "Analytics", desc: "In-depth behavioral analytics baked into every build." },
  { icon: "Languages", title: "Multi-language", desc: "Full localization support for global audiences." },
  { icon: "Moon", title: "Dark Mode", desc: "Beautiful, accessible dark themes out of the box." },
];

export default function FeaturesBento({ header, features }) {
  const eyebrow = header?.eyebrow || "App Features";
  const title = header?.title || "Capabilities Your App Can Ship With";
  const description = header?.description || "Production-ready features we wire into every build, on demand.";

  const items = features?.length ? features : DEFAULT_FEATURES;

  return (
    <section className="container-custom py-24 md:py-28">
      <SectionKicker
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <div className="mp-stagger-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[160px] gap-5">
        {items.map((f, i) => {
          const IconComponent = ICON_MAP[f.icon] || BrainCircuit;

          return (
            <div
              key={f.id || i}
              className={`group relative rounded-3xl p-6 bg-gradient-to-br from-slate-50 to-white border border-slate-200 overflow-hidden hover:-translate-y-1 hover:border-[#e31e24]/30 transition-all duration-300 flex flex-col justify-between ${f.span || ""}`}
            >
              <div className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full bg-[#e31e24]/0 group-hover:bg-[#e31e24]/8 blur-2xl transition-all duration-500" />
              <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#e31e24] to-[#c4151a] text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <IconComponent size={20} />
              </div>
              <div className="relative">
                <h3 className="font-bold text-slate-900 text-sm">{f.title}</h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
