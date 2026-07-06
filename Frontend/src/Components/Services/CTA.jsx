import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTA = ({ data }) => {
  if (!data || (!data.heading && !data.buttonText)) return null;

  return (
    <section
      className="relative overflow-hidden w-full py-24 px-5 bg-gradient-to-br from-[#1c1c1e] to-slate-900 text-center border-t border-b border-[#2b2b2e]"
      style={
        data.backgroundImage
          ? {
              backgroundImage: `linear-gradient(to bottom, rgba(28,28,30,0.92), rgba(15,23,42,0.92)), url("${data.backgroundImage}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-[#e31e24]/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[350px] h-[350px] bg-[#f5a623]/10 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-[850px] mx-auto relative z-10 space-y-7"
      >
        {data.heading && (
          <h2 className="text-[38px] max-[769px]:text-[28px] font-heading font-extrabold text-white leading-tight">
            {data.heading}
          </h2>
        )}
        {data.description && (
          <p className="text-base lg:text-lg text-white/75 leading-relaxed max-w-[650px] mx-auto">
            {data.description}
          </p>
        )}
        {data.buttonText && (
          <a href={data.buttonLink || "/contact"} className="inline-block no-underline">
            <button className="inline-flex items-center gap-2 px-9 py-4 text-[15px] font-bold rounded-lg border-0 bg-[#e31e24] text-white shadow-[0_6px_20px_rgba(227,30,36,0.35)] transition-all duration-300 hover:bg-[#c4151a] hover:scale-[1.03] hover:shadow-[0_12px_25px_rgba(227,30,36,0.45)] cursor-pointer">
              {data.buttonText}
              <ArrowRight size={18} />
            </button>
          </a>
        )}
      </motion.div>
    </section>
  );
};

export default CTA;
