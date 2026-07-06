import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

const ServiceCard = ({ service }) => {
  const { title, shortDescription, image, icon, features = [], ctaText, ctaLink } = service;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col h-full overflow-hidden rounded-[22px] bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_20px_45px_rgba(227,30,36,0.14)]"
    >
      {/* animated gradient border glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-[22px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 [background:linear-gradient(135deg,rgba(227,30,36,0.25),transparent_40%)] [mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] p-[1.5px]" />

      {/* background pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(rgba(227,30,36,0.9) 1px, transparent 1px)", backgroundSize: "16px 16px" }}
      />

      {image && (
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
        </div>
      )}

      <div className="relative flex flex-col flex-1 p-7">
        {icon && (
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            className="w-14 h-14 rounded-2xl bg-[#fee2e2] flex items-center justify-center mb-5 shadow-sm"
          >
            <img src={icon} alt="" className="w-7 h-7 object-contain" />
          </motion.div>
        )}

        <h3 className="text-[19px] font-heading font-bold text-[#1c1c1e] mb-2 leading-snug">{title}</h3>

        {shortDescription && (
          <p className="text-[14.5px] leading-relaxed text-[#4b5563] mb-5">{shortDescription}</p>
        )}

        {features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {features.slice(0, 6).map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-[13.5px] text-[#4b5563]">
                <Check size={15} className="text-[#e31e24] mt-[2px] shrink-0" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-2">
          <a
            href={ctaLink || "/contact"}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#e31e24] group/link"
          >
            {ctaText || "Learn More"}
            <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-1" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
