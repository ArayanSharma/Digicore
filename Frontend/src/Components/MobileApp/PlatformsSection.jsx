import { FaAndroid, FaApple } from "react-icons/fa";
import { Repeat, Check, Layers } from "lucide-react";
import { SectionKicker } from "./shared";

const ICON_MAP = {
  FaAndroid,
  FaApple,
  Repeat,
  Layers,
};

const DEFAULT_PLATFORMS = [
  {
    id: "android",
    icon: "FaAndroid",
    color: "#3DDC84",
    title: "Native Android",
    description: "High-performance apps built directly for the world's largest mobile ecosystem.",
    chips: ["Kotlin", "Java", "Material Design"],
    benefits: ["Deep hardware & OS integration", "Optimized for diverse device ranges", "Distributed via Google Play"],
  },
  {
    id: "ios",
    icon: "FaApple",
    color: "#0f172a",
    title: "Native iOS",
    description: "Polished, premium apps engineered for Apple's tightly controlled, high-performing ecosystem.",
    chips: ["Swift", "SwiftUI", "UIKit"],
    benefits: ["Buttery-smooth, consistent performance", "Pixel-perfect Apple HIG compliance", "Distributed via the App Store"],
  },
  {
    id: "cross",
    icon: "Repeat",
    color: "#3B82F6",
    title: "Cross Platform",
    description: "One codebase, two platforms — ship faster without compromising on native feel.",
    chips: ["Flutter", "React Native", "Expo"],
    benefits: ["Single codebase, faster delivery", "Native-grade UI & performance", "Lower long-term maintenance cost"],
  },
];

export default function PlatformsSection({ header, platforms }) {
  const eyebrow = header?.eyebrow || "Mobile Platforms We Build";
  const title = header?.title || "Every Platform. One Standard of Excellence.";
  const description = header?.description || "Whether your users live on Android, iOS, or both — we engineer apps native to how each platform actually works.";

  const items = platforms?.length ? platforms : DEFAULT_PLATFORMS;

  const parseStringOrArray = (val) => {
    if (Array.isArray(val)) return val;
    if (typeof val === "string") return val.split(",").map(s => s.trim()).filter(Boolean);
    return [];
  };

  return (
    <section className="relative bg-slate-50 py-24 md:py-28 overflow-hidden">
      <div className="container-custom">
        <SectionKicker
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <div className="mp-stagger-group grid grid-cols-1 md:grid-cols-3 gap-7">
          {items.map((p) => {
            const IconComponent = ICON_MAP[p.icon] || Repeat;
            const chipsArr = parseStringOrArray(p.chips);
            const benefitsArr = parseStringOrArray(p.benefits);

            return (
              <div
                key={p.id || p.title}
                className="group relative rounded-3xl bg-white border border-slate-200 p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(227,30,36,0.14)] hover:border-[#e31e24]/20"
              >
                <div
                  className="absolute inset-x-0 top-0 h-1 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                  style={{ background: `linear-gradient(90deg, ${p.color || '#3B82F6'}, #e31e24)` }}
                />
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                  style={{ background: `${p.color || '#3B82F6'}14` }}
                >
                  <IconComponent size={30} color={p.color || '#3B82F6'} />
                </div>

                <h3 className="text-xl font-bold text-slate-900">{p.title}</h3>
                <p className="text-sm text-slate-500 mt-3 leading-relaxed">{p.description}</p>

                {chipsArr.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {chipsArr.map((chip) => (
                      <span key={chip} className="text-xs font-semibold text-[#e31e24] bg-[#e31e24]/8 border border-[#e31e24]/15 px-3 py-1 rounded-full">
                        {chip}
                      </span>
                    ))}
                  </div>
                )}

                {benefitsArr.length > 0 && (
                  <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-5">
                    {benefitsArr.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <Check size={16} className="text-[#e31e24] shrink-0 mt-0.5" /> {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
