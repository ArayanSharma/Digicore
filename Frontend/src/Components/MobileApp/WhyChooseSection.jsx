import { Users, Palette, ShieldCheck, Gauge, Layers, Repeat2, Headphones, Cpu, Star } from "lucide-react";
import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa";
import { SectionKicker } from "./shared";

const ICON_MAP = {
  Users,
  Palette,
  FaAppStoreIos,
  FaGooglePlay,
  ShieldCheck,
  Gauge,
  Layers,
  Repeat2,
  Headphones,
  Cpu,
};

const DEFAULT_REASONS = [
  { icon: "Users", title: "Experienced Mobile Developers", desc: "A senior team that has shipped apps across every major industry." },
  { icon: "Palette", title: "Pixel Perfect UI", desc: "Interfaces crafted to match design specs down to the last pixel." },
  { icon: "FaAppStoreIos", title: "App Store Ready", desc: "Smooth, compliant submissions to Apple's App Store." },
  { icon: "FaGooglePlay", title: "Google Play Ready", desc: "End-to-end Google Play listing, release & rollout management." },
  { icon: "ShieldCheck", title: "Secure Architecture", desc: "Best-practice encryption, auth, and data handling by default." },
  { icon: "Gauge", title: "Fast Performance", desc: "Optimized builds engineered for speed on every device." },
  { icon: "Layers", title: "Scalable Codebase", desc: "Clean, modular architecture built to grow with your business." },
  { icon: "Repeat2", title: "Agile Development", desc: "Transparent sprints and milestones that keep launches on time." },
  { icon: "Headphones", title: "Ongoing Support", desc: "Continuous monitoring, patches, and support after release." },
  { icon: "Cpu", title: "Latest Technologies", desc: "We build on current, battle-tested frameworks — never legacy stacks." },
];

export default function WhyChooseSection({ header, reasons }) {
  const eyebrow = header?.eyebrow || "Why Us";
  const title = header?.title || "Why Choose DigiCore";
  const description = header?.description || "Ten reasons founders and enterprises trust us with their most important mobile products.";

  const items = reasons?.length ? reasons : DEFAULT_REASONS;

  return (
    <section className="container-custom py-24 md:py-28">
      <SectionKicker
        eyebrow={eyebrow}
        title={title}
        description={description}
      />

      <div className="mp-stagger-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {items.map((r, i) => {
          const IconComponent = ICON_MAP[r.icon] || Star;

          return (
            <div
              key={r.id || i}
              className="group relative rounded-2xl p-6 bg-white border border-slate-200 hover:border-[#e31e24]/30 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(227,30,36,0.12)] transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-[#e31e24]/8 text-[#e31e24] flex items-center justify-center mb-4 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:bg-[#e31e24] group-hover:text-white">
                <IconComponent size={20} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{r.title}</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">{r.desc}</p>
              <span className="block h-0.5 w-0 group-hover:w-10 bg-[#e31e24] rounded-full mt-4 transition-all duration-500" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
